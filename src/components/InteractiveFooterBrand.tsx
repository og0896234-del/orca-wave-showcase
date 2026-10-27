import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function InteractiveFooterBrand() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 28, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 2);
      containerRef.current.style.setProperty("--glow-x", `${rect.width / 2}px`);
      containerRef.current.style.setProperty("--glow-y", `${rect.height / 2}px`);
    }
  }, [mouseX, mouseY]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);
      containerRef.current.style.setProperty("--glow-x", `${x}px`);
      containerRef.current.style.setProperty("--glow-y", `${y}px`);
    },
    [mouseX, mouseY],
  );

  const ambientHalo = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(460px circle at ${x}px ${y}px, rgba(0,127,255,0.42) 0%, rgba(30,144,255,0.22) 35%, rgba(0,53,107,0.08) 60%, transparent 85%)`,
  );

  const electricMid = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(240px circle at ${x}px ${y}px, rgba(56,189,248,0.55) 0%, rgba(0,127,255,0.3) 45%, transparent 75%)`,
  );

  const whiteCore = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(110px circle at ${x}px ${y}px, rgba(255,255,255,0.95) 0%, rgba(186,230,253,0.7) 35%, rgba(0,127,255,0.3) 70%, transparent 100%)`,
  );

  const [hoverPos, setHoverPos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const unsub = smoothX.on("change", () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setHoverPos({
        x: smoothX.get() / rect.width,
        y: smoothY.get() / rect.height,
      });
    });
    return unsub;
  }, [smoothX, smoothY]);

  const SVG_TEXT_PROPS = {
    x: "50%" as const,
    y: "82%" as const,
    textAnchor: "middle" as const,
    dominantBaseline: "auto" as const,
    fontFamily: "'Gilroy', 'Gilroy-Bold', 'Gilroy-Heavy', sans-serif",
    fontWeight: "800",
    fontSize: "275",
    letterSpacing: "18",
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className="group relative my-6 select-none overflow-hidden cursor-crosshair rounded-3xl"
      style={{ touchAction: "none", height: "347px" }}
    >
      {/* Ambient Halo */}
      <motion.div
        className="pointer-events-none absolute inset-0 blur-3xl"
        style={{ background: ambientHalo, opacity: isHovered ? 1 : 0, transition: "opacity 0.7s ease-out" }}
        aria-hidden
      />

      {/* Electric Cyan Mid-Glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 mix-blend-screen blur-xl"
        style={{ background: electricMid, opacity: isHovered ? 0.9 : 0, transition: "opacity 0.5s ease-out" }}
        aria-hidden
      />

      {/* White-Hot Core Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 mix-blend-screen blur-md"
        style={{ background: whiteCore, opacity: isHovered ? 0.95 : 0, transition: "opacity 0.3s ease-out" }}
        aria-hidden
      />

      {/*
        Base text — Figma spec:
        font-weight 800 · font-size 275 · letter-spacing 18
        fill rgba(200,200,200,0.09) · stroke 1px rgba(200,200,200,0.4)
        NO fill-rule / paint-order — prevents counter artifacts inside A, V, etc.
        geometricPrecision eliminates pixelation at large scale.
      */}
      <svg
        viewBox="0 0 1359 347"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 z-10 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <text
          {...SVG_TEXT_PROPS}
          fill="rgba(200,200,200,0.09)"
          stroke="rgba(200,200,200,0.4)"
          strokeWidth="1"
          textRendering="geometricPrecision"
          style={{ fontOpticalSizing: "auto" } as React.CSSProperties}
        >
          ORCAVX
        </text>
      </svg>

      {/* Hover glow overlay — cursor-following blue gradient */}
      <svg
        viewBox="0 0 1359 347"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-0 z-20 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.35s ease-out",
          filter:
            "drop-shadow(0 0 24px rgba(0,127,255,0.9)) drop-shadow(0 0 48px rgba(0,127,255,0.5))",
        }}
      >
        <defs>
          <radialGradient
            id="orcavxCursorGrad"
            cx={hoverPos.x}
            cy={hoverPos.y}
            r="0.45"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%"  stopColor="#ffffff" />
            <stop offset="18%" stopColor="#bae6fd" />
            <stop offset="38%" stopColor="#38bdf8" />
            <stop offset="62%" stopColor="#007FFF" />
            <stop offset="80%" stopColor="rgba(0,127,255,0.2)" />
            <stop offset="92%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <text
          {...SVG_TEXT_PROPS}
          fill="url(#orcavxCursorGrad)"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1"
          textRendering="geometricPrecision"
        >
          ORCAVX
        </text>
      </svg>

      {/* Horizon beam */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[2px] w-4/5 -translate-x-1/2 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at var(--glow-x, 50%) 50%, #ffffff 0%, #38bdf8 30%, #007FFF 60%, transparent 95%)",
          opacity: isHovered ? 0.9 : 0.25,
        }}
        aria-hidden
      />
    </div>
  );
}
