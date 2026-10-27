/* ─────────────────────────────────────────────────────────────────────────────
   File: SixWaysSection.tsx
   Description:  Stand‑alone “Six Ways We Hunt” section with full scroll‑driven
                 animation (dial, dots, numbers, cylindrical text panel,
                 entry/exit delays, reverse scrolling, and progress pills).

   Dependencies:
     • react
     • framer-motion
   No external CSS required – all styling is inline.
   --------------------------------------------------------------------------- */

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

/* ────────────────────────────────  DATA  ─────────────────────────────────── */
const sixWays = [
  {
    num: "01",
    title: "Interview",
    desc: "Tight cuts, color‑matched talking heads that hold attention from frame one.",
    meta: "Long‑form",
  },
  {
    num: "02",
    title: "Presenter",
    desc: "Clean b‑roll, smooth transitions and graphics that elevate delivery.",
    meta: "Long‑form",
  },
  {
    num: "03",
    title: "Screencast",
    desc: "Tutorial‑ready screen recordings with call‑outs and clean audio.",
    meta: "Long‑form",
  },
  {
    num: "04",
    title: "Showcase",
    desc: "Product or portfolio films cut for maximum visual impact.",
    meta: "Brand",
  },
  {
    num: "05",
    title: "Shorts",
    desc: "Vertical‑first edits optimised for the first three seconds.",
    meta: "Short‑form",
  },
  {
    num: "06",
    title: "Thumbnails",
    desc: "Click‑tested designs that lift CTR across every niche.",
    meta: "Thumbnails",
  },
];

/* ──────────────────────  DESIGN TOKENS / CONSTANTS  ─────────────────────── */
const BG = "#0A1324";
const BLUE = "#007FFF";
const GREY = "#8FA3BB";
const ARC_CLR = "rgba(90,140,210,0.38)"; // crisp arc line
const ARC_GLOW = "rgba(0,127,255,0.18)"; // subtle halo
const ANGLE_STEP = 24; // degrees between stations
const N = sixWays.length; // 6 stations
const ARC_HALF = 80; // ±80° visible semicircle

/* Utility helpers */
const rad = (d: number) => (d * Math.PI) / 180;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/* ───────────────────────────────  COMPONENT  ─────────────────────────────── */
export default function SixWaysSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  // Viewport size (updates on resize)
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1440);
  const [vh, setVh] = useState(typeof window !== "undefined" ? window.innerHeight : 900);
  const [reduced, setReduced] = useState(false);
  const [liveIdx, setLiveIdx] = useState(0); // smooth motion value (float)

  // -------------------------------------------------------------------------
  //  Resize / reduced‑motion handling & mount sync
  // -------------------------------------------------------------------------
  useEffect(() => {
    setMounted(true);
    const upd = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    upd();
    window.addEventListener("resize", upd, { passive: true });
    return () => window.removeEventListener("resize", upd);
  }, []);

  // -------------------------------------------------------------------------
  //  Scroll → station index mapping (with entry/exit buffers)
  // -------------------------------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map progress → raw index:
  //   0   → 0.12 : hold on station 01 (entry buffer)
  // 0.12 → 0.88 : smooth travel 01 → 06
  // 0.88 → 1.0  : hold on station 06 (exit buffer)
  const rawIdx = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 0, N - 1, N - 1]);

  const springIdx = useSpring(rawIdx, {
    stiffness: 100,
    damping: 26,
    mass: 0.45,
  });

  // Keep the live index in component state for easy use in rendering
  useMotionValueEvent(springIdx, "change", (v) =>
    setLiveIdx(clamp(typeof v === "number" ? v : Number(v), 0, N - 1)),
  );

  // -------------------------------------------------------------------------
  //  Geometry (responsive)
  // -------------------------------------------------------------------------
  const mobile = vw < 768;
  const tablet = vw >= 768 && vw < 1024;

  // Radius of the semicircle
  const R = mobile ? Math.round(vw * 0.52) : Math.min(460, Math.round(vh * 0.44));

  // X‑coordinate where the active number (the “apex”) lands (3 o’clock)
  const apexX = mobile
    ? Math.round(vw * 0.32)
    : tablet
      ? Math.round(vw * 0.22)
      : Math.min(390, Math.max(280, Math.round(vw * 0.24)));

  const CX = apexX - R; // centre of the arc circle
  const CY = vh / 2; // vertical centre

  // SVG arc path (continuous bearing track from top -90° to bottom +90°)
  // Using two explicit quadrant arcs ensures 100% mathematical alignment with dotX/dotY
  const apexPtX = CX + R;
  const apexPtY = CY;
  const topPtX = CX;
  const topPtY = CY - R;
  const btmPtX = CX;
  const btmPtY = CY + R;
  const arcD = `M ${topPtX} ${topPtY} A ${R} ${R} 0 0 1 ${apexPtX} ${apexPtY} A ${R} ${R} 0 0 1 ${btmPtX} ${btmPtY}`;

  // Layout for the text panel (gap from the active number)
  const TEXT_GAP = mobile ? 72 : tablet ? 165 : 195;
  const textLeft = mobile ? 24 : apexX + TEXT_GAP;
  const textWidth = mobile ? vw - 48 : Math.min(480, vw - textLeft - 48);

  // Height of a single “drum‑slot” – controls how fast the text rises/falls
  const SLOT = mobile ? 160 : 200;

  // -------------------------------------------------------------------------
  //  Helper: jump to a specific station (used by numbers, dots & pills)
  // -------------------------------------------------------------------------
  const jumpTo = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    const range = containerRef.current.offsetHeight - window.innerHeight;
    const t = 0.12 + (idx / (N - 1)) * 0.76; // progress where station i starts
    window.scrollTo({ top: absoluteTop + t * range, behavior: "smooth" });
  };

  // -------------------------------------------------------------------------
  //  Main animated render
  // -------------------------------------------------------------------------
  return (
    <section
      ref={containerRef}
      id="craft"
      style={{
        height: "400vh", // tall enough for entry/exit buffers
        background: BG,
        position: "relative",
      }}
    >
      <span id="six-ways" style={{ position: "absolute", top: 0 }} />
      {/* ── Sticky viewport – stays fixed while we scroll inside it ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          background: BG,
        }}
      >
        {/* ── Center‑aligned heading ── */}
        <div
          style={{
            position: "absolute",
            top: mobile ? 56 : 88, // positioned well below the 70px fixed navbar
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 30,
            width: "100%",
            maxWidth: 720,
            padding: "0 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              color: "#fff",
              margin: 0,
              fontSize: "clamp(26px, 3.4vw, 46px)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            Six ways we <span style={{ color: "rgba(255,255,255,0.22)" }}>hunt.</span>
          </h2>
        </div>

        {/* ── SVG: arc + dots placed *on* the arc line ── */}
        <svg
          key={`track-svg-${mounted ? "m" : "s"}-${CX}-${CY}-${R}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {/* Subtle glow halo */}
          <path
            key={`glow-${CX}-${CY}-${R}`}
            d={arcD}
            fill="none"
            stroke={ARC_GLOW}
            strokeWidth={7}
            strokeLinecap="round"
          />
          {/* Crisp visible arc */}
          <path
            key={`crisp-${CX}-${CY}-${R}`}
            d={arcD}
            fill="none"
            stroke={ARC_CLR}
            strokeWidth={1.5}
            strokeLinecap="round"
          />

          {/* Station dots – rendered directly on the arc */}
          {sixWays.map((item, i) => {
            const diff = i - liveIdx;
            const angleDeg = diff * ANGLE_STEP;
            if (Math.abs(angleDeg) > ARC_HALF + 5) return null; // outside view

            const angleRad = rad(angleDeg);
            const dotX = CX + R * Math.cos(angleRad);
            const dotY = CY + R * Math.sin(angleRad);
            const isCur = Math.abs(diff) < 0.45;
            const opacity = clamp(1 - Math.abs(diff) * 0.3, 0.05, 1);

            return (
              <g key={item.num} opacity={opacity}>
                {isCur && (
                  <circle
                    cx={dotX}
                    cy={dotY}
                    r={9}
                    fill="none"
                    stroke={BLUE}
                    strokeWidth={1.5}
                    opacity={0.6}
                  />
                )}
                <circle
                  cx={dotX}
                  cy={dotY}
                  r={isCur ? 5.5 : 3.5}
                  fill={isCur ? BLUE : "rgba(255,255,255,0.88)"}
                  style={{
                    filter: isCur ? `drop-shadow(0 0 9px ${BLUE})` : "none",
                    cursor: "pointer",
                    pointerEvents: "auto",
                    transition: "fill 0.2s ease, r 0.2s ease",
                  }}
                  onClick={() => jumpTo(i)}
                />
              </g>
            );
          })}
        </svg>

        {/* ── Rotating number labels ── */}
        {sixWays.map((item, i) => {
          const diff = i - liveIdx;
          const angleDeg = diff * ANGLE_STEP;
          if (Math.abs(angleDeg) > ARC_HALF + 10) return null; // hide far away

          const isCur = Math.abs(diff) < 0.45;
          const angleRad = rad(angleDeg);

          // Clear gap of at least 16px-24px between dot and number:
          const numR = R + (mobile ? (isCur ? 56 : 38) : (isCur ? 78 : 52));
          const numX = CX + numR * Math.cos(angleRad);
          const numY = CY + numR * Math.sin(angleRad);

          // Numbers follow the tangent when far from the apex, then flatten to 0°
          const rotBlend = clamp(Math.abs(diff) / 0.75, 0, 1);
          const rotation = angleDeg * rotBlend;

          const opacity = clamp(1 - Math.abs(diff) * 0.28, 0.04, 1);
          const color = isCur ? BLUE : "rgba(255,255,255,0.6)";
          const fontSize = mobile ? (isCur ? 40 : 18) : isCur ? 72 : 24;

          return (
            <div
              key={item.num}
              onClick={() => jumpTo(i)}
              style={{
                position: "absolute",
                left: `${numX}px`,
                top: `${numY}px`,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                transformOrigin: "center center",
                opacity,
                color,
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: `${fontSize}px`,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                userSelect: "none",
                cursor: "pointer",
                zIndex: isCur ? 25 : 15,
                willChange: "transform, opacity",
                transition: "color 0.18s ease",
              }}
            >
              {item.num}
            </div>
          );
        })}

        {/* ── Cylindrical “drum” text panel ──
           All six panels are stacked vertically. The active panel is centered,
           the others are translated up/down and given a slight rotateX so they
           appear to roll in/out of the aperture. No AnimatePresence is needed –
           the motion is entirely driven by scroll position.
        */}
        <div
          style={{
            position: "absolute",
            zIndex: 20,
            overflow: "hidden",
            perspective: "650px",
            perspectiveOrigin: "50% 50%",
            ...(mobile
              ? {
                bottom: 76,
                left: textLeft,
                right: 24,
                height: SLOT,
              }
              : {
                top: "50%",
                marginTop: `-${SLOT / 2}px`,
                left: textLeft,
                width: textWidth,
                height: SLOT,
              }),
          }}
        >
          {sixWays.map((item, i) => {
            const diff = i - liveIdx; // negative = past apex, positive = upcoming

            // Vertical offset for the “drum” effect
            const yPx = diff * SLOT;

            // RotateX proportional to distance; clamp to avoid flipping
            const rotX = clamp(-diff * 34, -55, 55);

            // Fade out quickly once a panel moves away from centre
            const opacity = clamp(1 - Math.abs(diff) * 1.65, 0, 1);
            if (opacity <= 0) return null; // skip for performance

            const blur = clamp(Math.abs(diff) * 6, 0, 8);

            return (
              <div
                key={item.num}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: SLOT,
                  transform: `translateY(${yPx}px) rotateX(${rotX}deg)`,
                  transformOrigin: "50% 50%",
                  opacity,
                  filter: blur > 0.3 ? `blur(${blur}px)` : "none",
                  willChange: "transform, opacity, filter",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  pointerEvents: opacity < 0.05 ? "none" : "auto",
                }}
              >
                {/* Meta badge (optional) */}
                {item.meta && (
                  <span
                    style={{
                      display: "block",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: BLUE,
                      marginBottom: 10,
                    }}
                  >
                    {item.meta}
                  </span>
                )}

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800,
                    color: "#fff",
                    margin: 0,
                    fontSize: mobile ? "28px" : "clamp(30px, 3.2vw, 46px)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.025em",
                    marginBottom: 12,
                  }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: mobile ? 14 : 15,
                    color: GREY,
                    lineHeight: 1.65,
                    margin: 0,
                    maxWidth: 420,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Bottom progress pills (clickable) ── */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 8,
            alignItems: "center",
            zIndex: 30,
          }}
        >
          {sixWays.map((_, i) => {
            const active = i === Math.round(clamp(liveIdx, 0, N - 1));
            return (
              <button
                key={i}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  height: 5,
                  borderRadius: 3,
                  width: active ? 26 : 6,
                  background: active ? BLUE : "rgba(255,255,255,0.2)",
                  boxShadow: active ? `0 0 10px ${BLUE}` : "none",
                  transition: "all 0.3s ease",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
