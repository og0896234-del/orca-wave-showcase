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
    const fit = () => setCols(window.innerWidth < 768 ? Math.min(3, arrange.columns) : arrange.columns);
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
          base: el.dataset.base ?? "",
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
