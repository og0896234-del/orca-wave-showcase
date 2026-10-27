import { useState } from "react";

interface StepItem {
  num: string;
  title: string;
  desc: string;
  rotation: number;
  hoverRotation: number;
  glowColor: string;
  borderColor: string;
}

// Light blue matching the CTA button (#007FFF)
const CTA_LIGHT_BLUE = "#007FFF";

const stepsData: [StepItem, StepItem, StepItem, StepItem] = [
  {
    num: "01",
    title: "Drop",
    desc: "Upload raw files and a brief via your dedicated client portal.",
    rotation: 6.5,
    hoverRotation: 2,
    glowColor: "rgba(0, 127, 255, 0.25)",
    borderColor: "rgba(56, 189, 248, 0.32)",
  },
  {
    num: "02",
    title: "Hunt",
    desc: "An editor reviews the scope and confirms the delivery timeline.",
    rotation: -12.5,
    hoverRotation: -6,
    glowColor: "rgba(0, 127, 255, 0.25)",
    borderColor: "rgba(56, 189, 248, 0.32)",
  },
  {
    num: "03",
    title: "Craft",
    desc: "Delivery takes 24 to 72 hours depending on style.",
    rotation: 12,
    hoverRotation: 6,
    glowColor: "rgba(0, 127, 255, 0.25)",
    borderColor: "rgba(56, 189, 248, 0.32)",
  },
  {
    num: "04",
    title: "Surface",
    desc: "Long form video, short clips, and thumbnail together.",
    rotation: -2.2,
    hoverRotation: 0,
    glowColor: "rgba(0, 127, 255, 0.25)",
    borderColor: "rgba(56, 189, 248, 0.32)",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Clean 3D Blue Push Pin SVG Component
   - Outer drop-shadow filter removed completely for a clean, sharp look
   - Preserves Figma's exact 3D inner shadows & radial gradients on the ellipses
   ───────────────────────────────────────────────────────────────────────────── */
function FigmaPinClean({
  idPrefix,
  tilt = 0,
}: {
  idPrefix: string;
  tilt?: number;
}) {
  const f1 = `f1_${idPrefix}`;
  const f2 = `f2_${idPrefix}`;
  const p0 = `p0_${idPrefix}`;
  const p1 = `p1_${idPrefix}`;

  return (
    <div
      className="pointer-events-none select-none transition-transform duration-300"
      style={{
        transform: `rotate(${tilt}deg)`,
      }}
    >
      <svg
        width="82"
        height="94"
        viewBox="0 0 101 116"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Base Ellipse with 3D Inner Shadows */}
        <g filter={`url(#${f1})`}>
          <ellipse
            cx="49.7603"
            cy="56.9765"
            rx="33"
            ry="31.8"
            transform="rotate(-146.544 49.7603 56.9765)"
            fill={`url(#${p0})`}
          />
        </g>

        {/* Top Dome Ellipse with 3D Bevel Inner Shadows */}
        <g filter={`url(#${f2})`}>
          <ellipse
            cx="56.503"
            cy="36.8596"
            rx="27"
            ry="23.4"
            transform="rotate(23.8507 56.503 36.8596)"
            fill={`url(#${p1})`}
          />
        </g>

        <defs>
          {/* Base Inner Shadows (Highlights & Depth) */}
          <filter
            id={f1}
            x="17.1163"
            y="20.004"
            width="65.2881"
            height="69.145"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-8.4" />
            <feGaussianBlur stdDeviation="2.4" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.990385 0 0 0 0 0.933247 0 0 0 0 0.933247 0 0 0 1 0"
            />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-7.2" />
            <feGaussianBlur stdDeviation="1.38" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.0190459 0 0 0 0 0.359014 0 0 0 0 0.990385 0 0 0 1 0"
            />
            <feBlend mode="normal" in2="effect1_innerShadow" result="effect2_innerShadow" />
          </filter>

          {/* Top Knob Inner Shadows */}
          <filter
            id={f2}
            x="16.4909"
            y="2.86886"
            width="80.0243"
            height="75.1813"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3.6" />
            <feGaussianBlur stdDeviation="6.78" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.71 0"
            />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-6" />
            <feGaussianBlur stdDeviation="2.4" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
            />
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-6" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0.132212 0 0 0 0 0.793269 0 0 0 0.68 0"
            />
            <feBlend mode="normal" in2="effect2_innerShadow" result="effect3_innerShadow" />
          </filter>

          <radialGradient
            id={p0}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(59.9603 61.1765) rotate(-165.964) scale(29.6864 30.8066)"
          >
            <stop stopColor="#889DE5" />
            <stop offset="1" stopColor="#3B5BD2" />
          </radialGradient>

          <radialGradient
            id={p1}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(45.703 24.8596) rotate(57.6193) scale(29.1294 33.6108)"
          >
            <stop stopColor="#6A8EFC" />
            <stop offset="1" stopColor="#1942F5" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Route Card (Dark-Native Luminous Glassmorphism)
   - Step numbers in uniform CTA light blue (#007FFF)
   - Clean pins with zero muddy drop shadow
   ───────────────────────────────────────────────────────────────────────────── */
function RouteCard({
  item,
  index,
  isHovered,
  onHover,
}: {
  item: StepItem;
  index: number;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
}) {
  const currentRotation = isHovered ? item.hoverRotation : item.rotation;

  return (
    <div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="group relative cursor-pointer select-none transition-transform duration-500 ease-out"
      style={{
        transform: `rotate(${currentRotation}deg)`,
      }}
    >
      {/* Clean Pin without drop shadow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
        <FigmaPinClean idPrefix={`pin_${index}`} tilt={index % 2 === 0 ? 5 : -5} />
      </div>

      {/* Outer Dark Card Frame */}
      <div
        className="relative w-full max-w-[390px] sm:w-[385px] rounded-[36px] p-4 pt-9 pb-5 transition-all duration-500 ease-out"
        style={{
          background: isHovered ? "#0e1c38" : "#0a152c",
          border: `1.5px solid ${item.borderColor}`,
          boxShadow: isHovered
            ? "0 16px 36px -8px rgba(0, 0, 0, 0.6)"
            : "0 10px 25px -6px rgba(0, 0, 0, 0.45)",
          transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        }}
      >
        {/* Inner Solid Pad */}
        <div
          className="relative min-h-[225px] rounded-[28px] p-6 sm:p-7 flex flex-col justify-between overflow-hidden"
          style={{
            background: "#070e1c",
            border: "1px solid rgba(56, 189, 248, 0.2)",
          }}
        >
          {/* Top Row: Handwritten Number in CTA light blue (#007FFF) */}
          <div className="relative z-10 flex items-start justify-between">
            <span
              className="text-[44px] sm:text-[50px] font-bold leading-none tracking-wide"
              style={{
                fontFamily: "'Caveat', cursive",
                color: CTA_LIGHT_BLUE,
                transform: index % 2 === 0 ? "rotate(2deg)" : "rotate(-3deg)",
                display: "inline-block",
              }}
            >
              {item.num}
            </span>
          </div>

          {/* Title & Description */}
          <div className="relative z-10 mt-2">
            <h3 className="font-display text-[32px] sm:text-[36px] font-bold tracking-tight text-white leading-tight drop-shadow-sm">
              {item.title}
            </h3>
            <p className="mt-3 text-[15px] sm:text-[16px] font-medium leading-[1.5] text-slate-300/90">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main TheRoute Section
   Sequential staggered reading order (1 ➔ 2 ➔ 3 ➔ 4) with clear vertical spacing
   ───────────────────────────────────────────────────────────────────────────── */
export function TheRoute() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="route" className="relative mx-auto max-w-7xl px-6 py-24 md:py-36 overflow-hidden">
      {/* Section Header */}
      <div className="mb-16 md:mb-20">
        <h2 className="font-display text-5xl font-bold md:text-7xl">
          The <span className="text-stroke-gilroy">route</span>.
        </h2>
        <p className="mt-4 max-w-xl text-base text-muted-foreground">
          People need to know how working with you feels before they see a price. Frictionless from
          raw clips to final export.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          DESKTOP CANVAS LAYOUT (lg screens)
          Sequential vertical stagger:
          - Step 1 (Drop): top ~20px (left)
          - Step 2 (Hunt): top ~280px (right) -> clearly second
          - Step 3 (Craft): top ~600px (left) -> clearly third
          - Step 4 (Surface): top ~880px (right) -> clearly fourth
          ───────────────────────────────────────────────────────────────── */}
      <div className="relative mx-auto hidden lg:block w-full max-w-[1020px] h-[1240px]">
        {/* SVG Dotted Connecting Paths (z-0 behind cards, connecting border-to-border) */}
        <svg
          className="absolute inset-0 pointer-events-none w-full h-full z-0 overflow-visible"
          viewBox="0 0 1020 1240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="dashGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Dotted Line 1: Card 01 (Drop right edge) -> Card 02 (Hunt left edge) */}
          <path
            d="M 405 185 C 475 200, 540 280, 615 390"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeDasharray="4 8"
            strokeLinecap="round"
            opacity="0.9"
            filter="url(#dashGlow)"
          />

          {/* Dotted Line 2: Card 02 (Hunt bottom edge) -> Card 03 (Craft top-right edge) */}
          <path
            d="M 650 600 C 580 670, 480 660, 418 640"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeDasharray="4 8"
            strokeLinecap="round"
            opacity="0.9"
            filter="url(#dashGlow)"
          />

          {/* Dotted Line 3: Card 03 (Craft right edge) -> Card 04 (Surface left edge) with playful loop-the-loop */}
          <path
            d="M 418 780 C 465 780, 505 760, 515 720 C 522 685, 495 670, 480 695 C 465 720, 485 790, 535 840 C 570 880, 595 950, 615 1000"
            stroke="#38BDF8"
            strokeWidth="3"
            strokeDasharray="4 8"
            strokeLinecap="round"
            opacity="0.9"
            filter="url(#dashGlow)"
          />
        </svg>

        {/* Card 01: Drop (Tier 1 - Left) */}
        <div className="absolute left-[30px] top-[20px] z-10">
          <RouteCard
            item={stepsData[0]}
            index={0}
            isHovered={hoveredIdx === 0}
            onHover={(h) => setHoveredIdx(h ? 0 : null)}
          />
        </div>

        {/* Card 02: Hunt (Tier 2 - Right) */}
        <div className="absolute right-[40px] top-[280px] z-10">
          <RouteCard
            item={stepsData[1]}
            index={1}
            isHovered={hoveredIdx === 1}
            onHover={(h) => setHoveredIdx(h ? 1 : null)}
          />
        </div>

        {/* Card 03: Craft (Tier 3 - Left) */}
        <div className="absolute left-[40px] top-[600px] z-10">
          <RouteCard
            item={stepsData[2]}
            index={2}
            isHovered={hoveredIdx === 2}
            onHover={(h) => setHoveredIdx(h ? 2 : null)}
          />
        </div>

        {/* Card 04: Surface (Tier 4 - Right) */}
        <div className="absolute right-[30px] top-[880px] z-10">
          <RouteCard
            item={stepsData[3]}
            index={3}
            isHovered={hoveredIdx === 3}
            onHover={(h) => setHoveredIdx(h ? 3 : null)}
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          RESPONSIVE TABLET & MOBILE FLOW (screen < lg)
          ───────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-14 lg:hidden py-4">
        {stepsData.map((item, i) => (
          <div key={item.num} className="relative w-full max-w-[380px] flex flex-col items-center">
            <RouteCard
              item={{
                ...item,
                rotation: i % 2 === 0 ? 3 : -3,
                hoverRotation: 0,
              }}
              index={i}
              isHovered={hoveredIdx === i}
              onHover={(h) => setHoveredIdx(h ? i : null)}
            />

            {/* Connecting dotted line to next card */}
            {i < stepsData.length - 1 && (
              <div className="h-12 w-1 my-2 flex flex-col items-center justify-center">
                <svg width="24" height="48" viewBox="0 0 24 48" fill="none" className="overflow-visible">
                  <path
                    d={i % 2 === 0 ? "M 12 0 C 22 16, 2 32, 12 48" : "M 12 0 C 2 16, 22 32, 12 48"}
                    stroke="#38BDF8"
                    strokeWidth="3"
                    strokeDasharray="4 6"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
