import { useRef, useEffect, useState } from "react";
import { useScroll, useSpring } from "framer-motion";
import s1 from "@/assets/work/img_p7_4.png";
import s2 from "@/assets/work/img_p7_5.png";
import s3 from "@/assets/work/img_p7_6.png";

// 20 vertical reels (2 full turns of 10 items) for perfectly seamless periodic winding
const SHORTS_IMAGES = [
  s1, s2, s3, s1, s2, s3, s1, s2, s3, s1,
  s2, s3, s1, s2, s3, s1, s2, s3, s1, s2,
];

export function GalleryHelix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Responsive sizing
  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1440);

  useEffect(() => {
    const handleResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = vw < 768;
  const isTablet = vw >= 768 && vw < 1024;

  // Geometry: 10 items per 360-degree turn
  const itemsPerTurn = 10;
  const stepDeg = 360 / itemsPerTurn; // 36 degrees per item
  const n = SHORTS_IMAGES.length; // 20 items = exactly 2 turns
  const pitch = isMobile ? 24 : isTablet ? 28 : 32; // px climb per step
  const radius = isMobile ? 220 : isTablet ? 300 : 360; // cylinder radius
  const totalHeight = n * pitch; // 20 * 32 = 640px period

  // Scroll tracking across the pinned container (height: 280vh = exactly ~3 to 4 natural scrolls)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll-driven spring rotation
  const smoothRotation = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.3,
  });

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (!stageRef.current) return;

      const progress = smoothRotation.get();
      // Rotate ~640 degrees (approx 1.78 full revolutions) over the 3-4 scrolls
      const currentRot = progress * 640;

      const cells = stageRef.current.querySelectorAll<HTMLElement>("[data-helix-cell]");
      cells.forEach((el) => {
        const i = Number(el.getAttribute("data-index"));
        // Angle around cylinder
        const angle = i * stepDeg + currentRot;
        const rad = (angle * Math.PI) / 180;

        // Vertical climb: nominal height along helix spiral
        const nominalY = i * pitch - (currentRot / 360) * (itemsPerTurn * pitch);

        // Safe Euclidean modulo wrap into [-totalHeight / 2, totalHeight / 2]
        let y = (((nominalY + totalHeight / 2) % totalHeight) + totalHeight) % totalHeight - totalHeight / 2;

        // Front vs back depth
        const cosVal = Math.cos(rad);
        const depth = (cosVal + 1) / 2; // 1 = front center, 0 = back

        // Smooth opacity falloff near vertical container boundaries
        const edgeFade = Math.max(0, Math.min(1, (totalHeight / 2 - Math.abs(y)) / 75));

        el.style.transform = `translate(-50%, -50%) translateY(${y.toFixed(1)}px) rotateY(${angle.toFixed(2)}deg) translateZ(${radius}px)`;
        el.style.opacity = ((0.2 + depth * 0.8) * edgeFade).toFixed(3);
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.filter = `brightness(${(0.45 + depth * 0.65).toFixed(2)})`;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [smoothRotation, stepDeg, pitch, radius, itemsPerTurn, totalHeight]);

  return (
    /* Outer scroll container: 280vh height ensures the section pins for ~2 to 3 scrolls, moving away on 3rd-4th scroll */
    <div ref={containerRef} className="relative w-full h-[280vh]">
      {/* Sticky wrapper pinning heading + helix box together */}
      <div className="sticky top-16 md:top-20 w-full flex flex-col gap-6">
        <div>
          <h2 className="font-display text-5xl font-bold md:text-7xl">
            Hall II — <span className="text-stroke-gilroy">Shorts</span>
          </h2>
        </div>

        {/* Contained box: pins centered in viewport while scrolling */}
        <div className="relative h-[56vh] md:h-[62vh] min-h-[440px] max-h-[620px] w-full rounded-3xl border border-white/10 bg-[#070e1b] shadow-xl overflow-hidden">

          {/* Top & Bottom Depth Vignettes for seamless gradient edge fade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#070e1b] via-[#070e1b]/70 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#070e1b] via-[#070e1b]/70 to-transparent z-20" />

          {/* 3D Helix Stage: Pure moving vertical short photos */}
          <div
            ref={stageRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ perspective: "1800px" }}
          >
            <div
              className="relative h-full w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {SHORTS_IMAGES.map((src, i) => (
                <div
                  key={i}
                  data-helix-cell
                  data-index={i}
                  className="absolute left-1/2 top-1/2 w-32 sm:w-36 md:w-42 will-change-transform pointer-events-auto group cursor-pointer"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* 9:16 Vertical Short Reel Card */}
                  <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/12 bg-[#0A1324] shadow-2xl transition-all duration-300 group-hover:border-[#00C2FF]/60 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(0,194,255,0.35)]">
                    <img
                      src={src}
                      alt={`Short Reel ${i + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Oceanic bottom shadow gradient */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030814]/85 via-transparent to-transparent" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
