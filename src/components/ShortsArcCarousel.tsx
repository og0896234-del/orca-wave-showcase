import { useRef, useEffect, useState } from "react";
import { Play } from "lucide-react";
import s1 from "@/assets/work/img_p7_4.png";
import s2 from "@/assets/work/img_p7_5.png";
import s3 from "@/assets/work/img_p7_6.png";

interface ShortItem {
  id: string;
  title: string;
  tag: string;
  duration: string;
  label: string;
  src: string;
}

const SHORTS: ShortItem[] = [
  {
    id: "short-1",
    title: "Retention Hook & Viral Pacing",
    tag: "Viral Hook",
    duration: "0:42",
    label: "No. 01",
    src: s1,
  },
  {
    id: "short-2",
    title: "Micro-Transitions & Dynamic Cuts",
    tag: "Pacing",
    duration: "0:30",
    label: "No. 02",
    src: s2,
  },
  {
    id: "short-3",
    title: "Sound Design & Kinetic SFX",
    tag: "Sound FX",
    duration: "0:55",
    label: "No. 03",
    src: s3,
  },
  {
    id: "short-4",
    title: "Kinetic Typography & Captions",
    tag: "Story Arc",
    duration: "0:38",
    label: "No. 04",
    src: s1,
  },
  {
    id: "short-5",
    title: "Cinematic Color Grade Pop",
    tag: "Color Grade",
    duration: "0:28",
    label: "No. 05",
    src: s2,
  },
  {
    id: "short-6",
    title: "Talking Head Pacing & Rhythm",
    tag: "Retention",
    duration: "0:45",
    label: "No. 06",
    src: s3,
  },
  {
    id: "short-7",
    title: "High-Energy B-Roll Sequences",
    tag: "Visual Hook",
    duration: "0:35",
    label: "No. 07",
    src: s1,
  },
  {
    id: "short-8",
    title: "The Climactic Audio Drop",
    tag: "Sound Design",
    duration: "0:50",
    label: "No. 08",
    src: s2,
  },
];

export function ShortsArcCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);

  const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1440);

  useEffect(() => {
    const handleResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Global mouseup/touchend to cleanly end drag if user releases outside container
  useEffect(() => {
    const handleGlobalDragEnd = () => {
      isDraggingRef.current = false;
    };
    window.addEventListener("mouseup", handleGlobalDragEnd);
    window.addEventListener("touchend", handleGlobalDragEnd);
    return () => {
      window.removeEventListener("mouseup", handleGlobalDragEnd);
      window.removeEventListener("touchend", handleGlobalDragEnd);
    };
  }, []);

  const isMobile = vw < 640;
  const isTablet = vw >= 640 && vw < 1024;

  const cardSpacing = isMobile ? 220 : isTablet ? 270 : 310;
  const totalLength = SHORTS.length * cardSpacing;
  const arcHalfWidth = isMobile ? 360 : isTablet ? 500 : 640;
  const arcDropHeight = isMobile ? 85 : isTablet ? 110 : 130;
  const maxRotationDeg = isMobile ? 18 : 22;

  useEffect(() => {
    let raf = 0;
    const baseSpeed = 0.75; // px per frame automated scroll

    const tick = () => {
      // Continuous smooth animation: never stops on casual hover or scrolling
      // Only pauses during active manual dragging / scrubbing
      if (!isDraggingRef.current) {
        offsetRef.current = (offsetRef.current + baseSpeed) % totalLength;
      }

      if (containerRef.current) {
        const cards = containerRef.current.querySelectorAll<HTMLElement>("[data-arc-card]");
        const currentOffset = offsetRef.current;

        cards.forEach((card) => {
          const i = Number(card.getAttribute("data-index"));
          const nominalX = i * cardSpacing - currentOffset;

          // Euclidean modulo wrap into [-totalLength / 2, totalLength / 2]
          let x = (((nominalX + totalLength / 2) % totalLength) + totalLength) % totalLength - totalLength / 2;

          // Normalized coordinate u (-1 to +1 across the visible arc)
          const u = x / arcHalfWidth;

          // Mountain arc curve: apex at center (u = 0, y = 0), descending as u moves outward
          const y = Math.min(arcDropHeight * 1.8, arcDropHeight * (u * u));

          // Tangent rotation: negative on left, 0 at center, positive on right
          const rot = Math.max(-28, Math.min(28, u * maxRotationDeg));

          // Depth scaling: slightly larger at peak, smaller at base
          const scale = Math.max(0.85, 1.02 - 0.14 * (u * u));

          // Seamless edge fade
          const edgeFade = Math.max(0, Math.min(1, (1.35 - Math.abs(u)) / 0.35));

          // Z-index: peak card is on top
          const zIndex = Math.round((1 - Math.min(1, Math.abs(u))) * 30) + 1;

          card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0px) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
          card.style.opacity = edgeFade.toFixed(3);
          card.style.zIndex = String(zIndex);
        });
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [cardSpacing, totalLength, arcHalfWidth, arcDropHeight, maxRotationDeg]);

  // Drag interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    offsetRef.current = dragStartOffsetRef.current - delta;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!e.touches[0]) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartOffsetRef.current = offsetRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !e.touches[0]) return;
    const delta = e.touches[0].clientX - dragStartXRef.current;
    offsetRef.current = dragStartOffsetRef.current - delta;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className="relative w-full overflow-hidden select-none py-6 cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        isDraggingRef.current = false;
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Mountain Arc Stage: Height sized so peak and base curve fit comfortably */}
      <div
        ref={containerRef}
        className="relative mx-auto h-[460px] sm:h-[500px] md:h-[540px] w-full flex items-center justify-center pointer-events-none"
      >
        {SHORTS.map((item, index) => (
          <div
            key={item.id}
            data-arc-card
            data-index={index}
            className="absolute left-1/2 top-10 sm:top-8 -translate-x-1/2 will-change-transform pointer-events-auto group"
            style={{
              transformOrigin: "center 80%",
            }}
          >
            {/* 9:16 Vertical Short Reel Card */}
            <div className="relative w-52 sm:w-60 md:w-64 aspect-[9/16] rounded-2xl md:rounded-3xl overflow-hidden border border-white/12 bg-[#0A1324] shadow-2xl transition-all duration-300 ease-out group-hover:border-primary/60 group-hover:shadow-[0_0_32px_rgba(0,194,255,0.35)] cursor-pointer">
              {/* Background Reel Thumbnail */}
              <img
                src={item.src}
                alt={item.title}
                draggable={false}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 select-none pointer-events-none"
              />

              {/* Gradient Depth Vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030814]/92 via-[#030814]/25 to-transparent transition-opacity duration-300" />

              {/* Top Badges */}
              <div className="pointer-events-none absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <span className="rounded-full border border-white/15 bg-black/50 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-white/90">
                  {item.tag}
                </span>
                <span className="rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-white/70">
                  {item.duration}
                </span>
              </div>

              {/* Center Play Button with hover scale */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
                <span className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-glow transition-transform duration-300 ease-out group-hover:scale-115">
                  <Play className="fill-current ml-0.5 h-5 w-5 md:h-6 md:w-6" />
                </span>
              </div>

              {/* Bottom Caption & Label */}
              <div className="pointer-events-none absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 z-10">
                <p className="font-display text-sm md:text-base font-semibold text-white drop-shadow-sm line-clamp-1">
                  {item.title}
                </p>
                <div className="mt-1 flex items-center justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
                  <span>{item.label}</span>
                  <span className="text-primary font-medium">OrcaVX</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subtle edge gradient overlays for smooth peripheral blending */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-deep via-deep/60 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-deep via-deep/60 to-transparent z-20" />
    </div>
  );
}
