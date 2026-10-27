import { useEffect, useRef, useState, type ReactNode } from "react";

/* Minimal re-implementation of the appol-style arrangement API:
   <Gallery arrange={grid({ columns: 6, fill: "offset", rotateX: 20, bulge: 120 })} /> */

export type GridArrange = {
  kind: "grid";
  columns: number;
  fill: "fill" | "offset";
  rotateX: number;
  bulge: number;
  gap: number;
};

export function grid({
  columns = 6,
  fill = "fill",
  rotateX = 0,
  bulge = 0,
  gap = 20,
}: Partial<GridArrange> = {}): GridArrange {
  return { kind: "grid", columns, fill, rotateX, bulge, gap };
}

export type HelixArrange = {
  kind: "helix";
  radius: number;
  itemsPerTurn: number;
  pitch: number;
};

export function helix({
  radius = 500,
  itemsPerTurn = 12,
  pitch = 48,
}: Partial<HelixArrange> = {}): HelixArrange {
  return { kind: "helix", radius, itemsPerTurn, pitch };
}

/* 3D spiral gallery: plates wind around a vertical cylinder.
   Scrolling rotates the helix and the spiral climbs; a slow idle
   drift keeps it alive when the page is still. */
export function HelixGallery({
  arrange,
  children,
  className = "",
}: {
  arrange: HelixArrange;
  children: ReactNode;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const items = Array.isArray(children) ? children : [children];
  const n = items.length;
  const step = 360 / arrange.itemsPerTurn;
  const total = n * arrange.pitch;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const cells = Array.from(wrap.querySelectorAll<HTMLElement>("[data-helix]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let rot = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;

      // Scroll-driven spin: section progress maps to two full turns.
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      const target = progress * 720;
      rot += (target - rot) * 0.08;
      const spin = reduce ? 0 : rot + now * 0.004; // idle drift

      for (let i = 0; i < cells.length; i++) {
        const el = cells[i];
        if (!el) continue;
        const angle = i * step + spin;
        const rad = (angle * Math.PI) / 180;
        // Spiral climbs as it turns; wrap vertically.
        let y = (i * arrange.pitch - (spin / 360) * arrange.itemsPerTurn * arrange.pitch) % total;
        if (y < -total / 2) y += total;
        if (y > total / 2) y -= total;
        const depth = (Math.cos(rad) + 1) / 2; // 1 = front, 0 = back
        el.style.transform = `translate(-50%, -50%) translateY(${y.toFixed(1)}px) rotateY(${angle.toFixed(2)}deg) translateZ(${arrange.radius}px)`;
        el.style.opacity = (0.15 + depth * 0.85).toFixed(3);
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.filter = `brightness(${(0.5 + depth * 0.6).toFixed(2)})`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [arrange.radius, arrange.itemsPerTurn, arrange.pitch, n, step, total]);

  return (
    <div ref={wrapRef} className={className} style={{ perspective: "2200px" }}>
      <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
        {items.map((child, i) => (
          <div
            key={i}
            data-helix
            className="absolute left-1/2 top-[42%] w-40 will-change-transform md:w-52"
            style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Gallery({
  arrange,
  children,
  className = "",
}: {
  arrange: GridArrange;
  children: ReactNode;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(arrange.columns);

  // Fewer columns on small screens, same arrangement otherwise.
  useEffect(() => {
    const fit = () =>
      setCols(window.innerWidth < 768 ? Math.min(3, arrange.columns) : arrange.columns);
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [arrange.columns]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    let cells: { el: HTMLElement; x: number; y: number; base: string }[] = [];

    const measure = () => {
      const wr = wrap.getBoundingClientRect();
      cells = Array.from(inner.querySelectorAll<HTMLElement>("[data-cell]")).map((el) => {
        const prev = el.style.transform;
        el.style.transform = "";
        const r = el.getBoundingClientRect();
        el.style.transform = prev;
        return {
          el,
          x: r.left - wr.left + r.width / 2,
          y: r.top - wr.top + r.height / 2,
          base: el.dataset["base"] ?? "",
        };
      });
    };

    // Fisheye bulge: plates swell toward the viewer around the pointer.
    const SIGMA = 240;
    const apply = (px: number, py: number) => {
      for (const c of cells) {
        const d2 = (px - c.x) ** 2 + (py - c.y) ** 2;
        const f = Math.exp(-d2 / (2 * SIGMA * SIGMA));
        const z = arrange.bulge * f;
        const s = 1 + (arrange.bulge / 420) * f;
        c.el.style.transform = `${c.base} translateZ(${z.toFixed(1)}px) scale(${s.toFixed(3)})`;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const wr = wrap.getBoundingClientRect();
      apply(e.clientX - wr.left, e.clientY - wr.top);
    };
    const onLeave = () => {
      const wr = wrap.getBoundingClientRect();
      apply(wr.width / 2, wr.height * 0.45);
    };

    measure();
    onLeave();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [arrange.bulge, cols]);

  return (
    <div ref={wrapRef} className={className} style={{ perspective: "1400px" }}>
      <div
        ref={innerRef}
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gap: arrange.gap,
          transform: `rotateX(${arrange.rotateX}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {Array.isArray(children)
          ? children.map((child, i) => {
              const col = i % cols;
              const base = arrange.fill === "offset" && col % 2 === 1 ? "translateY(30%)" : "";
              return (
                <div
                  key={i}
                  data-cell
                  data-base={base}
                  className="will-change-transform"
                  style={{
                    transform: base,
                    transformStyle: "preserve-3d",
                    transition: "transform .35s cubic-bezier(.22,1,.36,1)",
                  }}
                >
                  {child}
                </div>
              );
            })
          : children}
      </div>
    </div>
  );
}
