import { useState, useEffect, useRef, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Sparkles, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  channelOrCompany: string;
  avatar: string;
  rating: number;
  quote: string;
  metric?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Lin",
    role: "Lead Creator & Filmmaker",
    channelOrCompany: "2.1M Subscribers",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5.0,
    quote: "OrcaVX transformed our multi-cam studio podcast into retention gold. Average view duration jumped from 38% to 64% in month one. Their sound design and cut pacing are untouchable.",
    metric: "+26% Retention",
  },
  {
    id: 2,
    name: "Marcus Sterling",
    role: "Head of Production",
    channelOrCompany: "Apex Media Studios",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5.0,
    quote: "We’ve partnered with dozens of post houses, but nobody matches OrcaVX’s turnaround speed. Delivering full 4K episode edits with custom 3D motion graphics under 48 hours is unreal.",
    metric: "<48h Turnaround",
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Documentary Director",
    channelOrCompany: "Rostova Films",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5.0,
    quote: "The color grade alone gave our documentary a genuine Hollywood presence. Their team instinctively understands emotional storytelling, narrative arcs, and subtle micro-cuts.",
    metric: "Cinematic Grade",
  },
  {
    id: 4,
    name: "Julian Mercer",
    role: "Tech YouTuber",
    channelOrCompany: "1.4M Subscribers",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5.0,
    quote: "Their Shorts editing team turned our backlog into 35M+ organic views across YouTube and TikTok. The hooks, animated captions, and sound effects drive insane engagement.",
    metric: "35M+ Shorts Views",
  },
  {
    id: 5,
    name: "Chloe Davenport",
    role: "Creative Director",
    channelOrCompany: "Horizon Brands",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5.0,
    quote: "Working with the OrcaVX pod feels like having a senior studio editing room on tap. Zero friction, meticulous attention to detail, and flawless final deliverables every single drop.",
    metric: "100% On-Brief",
  },
  {
    id: 6,
    name: "Devon Reed",
    role: "Agency Founder",
    channelOrCompany: "Velocity Media",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5.0,
    quote: "CTR on our client video ads doubled after OrcaVX redesigned our hooks and thumbnails. They don't just cut video—they engineer high-converting visual assets.",
    metric: "2x Ad CTR",
  },
];

// Right-pointing arrow dot coordinates (centered in 44x44 frame, evenly spaced at 3.1px pitch)
const ARROW_DOTS_RIGHT = [
  // Top wing
  { x: 19.7, y: 12.7 },
  { x: 19.7, y: 15.8 },
  { x: 22.8, y: 15.8 },
  { x: 22.8, y: 18.9 },
  { x: 25.9, y: 18.9 },

  // Center horizontal shaft (6 dots: leftmost to tip)
  { x: 13.5, y: 22.0 },
  { x: 16.6, y: 22.0 },
  { x: 19.7, y: 22.0 },
  { x: 22.8, y: 22.0 },
  { x: 25.9, y: 22.0 },
  { x: 29.0, y: 22.0 },

  // Bottom wing
  { x: 25.9, y: 25.1 },
  { x: 22.8, y: 25.1 },
  { x: 22.8, y: 28.2 },
  { x: 19.7, y: 28.2 },
  { x: 19.7, y: 31.3 },
];

function DottedArrow({ direction }: { direction: "left" | "right" }) {
  const dots =
    direction === "right"
      ? ARROW_DOTS_RIGHT
      : ARROW_DOTS_RIGHT.map((d) => ({ x: 44 - d.x, y: d.y }));

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        className="w-full h-full"
        style={{ shapeRendering: "geometricPrecision" }}
      >
        <defs>
          <linearGradient id={`dot-gradient-${direction}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2D2D43" />
            <stop offset="40%" stopColor="#3B7CE8" />
            <stop offset="100%" stopColor="#4285F4" />
          </linearGradient>
        </defs>

        {dots.map((dot, idx) => (
          <g key={idx}>
            {/* Light bottom bevel highlight */}
            <circle cx={dot.x} cy={dot.y + 0.3} r={1.15} fill="#E8EAEA" />
            {/* Main blue circle with tactile inner shade */}
            <circle cx={dot.x} cy={dot.y} r={1.12} fill={`url(#dot-gradient-${direction})`} />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  // Scroll to a specific testimonial index smoothly
  const scrollToTestimonial = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>("[data-testimonial-card]");
    if (!cards[index]) return;

    const card = cards[index];
    const targetScrollLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;

    track.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: "smooth",
    });
    setActiveIndex(index);
  }, []);

  // Update active index based on current scroll position
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll<HTMLElement>("[data-testimonial-card]");
    if (cards.length === 0) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - trackCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  // Next and previous controls
  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % TESTIMONIALS.length;
    scrollToTestimonial(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    scrollToTestimonial(prevIdx);
  };

  // Auto-advance every 3.5 seconds when not hovered/dragged
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIdx = (prev + 1) % TESTIMONIALS.length;
        scrollToTestimonial(nextIdx);
        return nextIdx;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, scrollToTestimonial]);

  // Sync scroll listener
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Mouse drag support for smooth manual scrolling
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;

    isPointerDownRef.current = true;
    startXRef.current = e.pageX;
    scrollLeftStartRef.current = track.scrollLeft;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const track = trackRef.current;
    if (!track) return;

    const dx = e.pageX - startXRef.current;
    track.scrollLeft = scrollLeftStartRef.current - dx;
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-10 sm:py-12 md:py-14 flex flex-col justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative mx-auto max-w-7xl px-6 w-full">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Trusted by <span className="text-stroke-gilroy">100+</span> World-Class Creators
          </h2>

          <p className="mx-auto mt-2 sm:mt-2.5 max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
            See how OrcaVX transforms raw footage into high-retention stories, viral shorts, and flawless Hollywood-grade color.
          </p>
        </div>

        {/* Carousel Viewport */}
        <div className="relative w-full">
          {/* Subtle edge fade vignettes */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-background via-background/40 to-transparent z-10 hidden sm:block" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-background via-background/40 to-transparent z-10 hidden sm:block" />

          {/* Testimonial Cards Track */}
          <div
            ref={trackRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="flex gap-5 sm:gap-6 overflow-x-auto py-3 px-2 sm:px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory cursor-grab active:cursor-grabbing"
            style={{ touchAction: "pan-y" }}
          >
            {TESTIMONIALS.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.id}
                  data-testimonial-card
                  className={`shrink-0 snap-center select-none transition-all duration-500 w-[270px] sm:w-[300px] md:w-[330px] ${
                    isActive
                      ? "scale-100 opacity-100 z-10"
                      : "scale-[0.96] opacity-80 hover:opacity-100"
                  }`}
                >
                  {/* Outer Frame */}
                  <div className="p-2 rounded-[20px] bg-white/[0.06] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-[#00C2FF]/40">
                    {/* Inner Card (Square with very small corner radius, dull white / platinum) */}
                    <div className="relative aspect-square w-full rounded-xl bg-[#ECEFF3] text-[#0A101D] p-5 sm:p-5.5 flex flex-col justify-between shadow-sm border border-black/5 overflow-hidden">
                      {/* Subtle quote watermark accent */}
                      <Quote className="pointer-events-none absolute right-3 top-3 h-12 w-12 text-black/[0.04]" />

                      {/* Top: 5 Stars + Metric / Score */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1 text-amber-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                            ))}
                            <span className="ml-1 text-[11px] font-bold text-slate-700">
                              {item.rating.toFixed(1)}
                            </span>
                          </div>

                          {item.metric && (
                            <span className="rounded-md bg-slate-900/[0.06] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-slate-800">
                              {item.metric}
                            </span>
                          )}
                        </div>

                        {/* Middle: Review Quote praising OrcaVX */}
                        <p className="text-[12.5px] sm:text-[13px] leading-relaxed text-[#1E293B] font-medium line-clamp-4">
                          "{item.quote}"
                        </p>
                      </div>

                      {/* Bottom: Author info (Avatar, Name, Role) - No line / separator */}
                      <div className="mt-2.5 flex items-center gap-2.5 pt-1">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          loading="lazy"
                          className="h-9 w-9 rounded-full object-cover border border-slate-300 shadow-xs shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs sm:text-[13px] font-bold text-[#0F172A] truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-[#64748B] truncate">
                            {item.role} · <span className="text-[#007FFF] font-semibold">{item.channelOrCompany}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation & Indicator (Figma Frame 2147225633 & Frame 2147225621) */}
        <div className="mt-5 sm:mt-6 flex flex-col items-center justify-center gap-4">
          {/* Pagination Capsule Pills (Frame 2147225633) */}
          <div
            className="flex flex-row items-center justify-center"
            style={{ gap: "7px", height: "8.65px" }}
          >
            {TESTIMONIALS.map((_, i) => {
              const isActive = i === activeIndex;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToTestimonial(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="relative p-0 border-none bg-transparent cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
                  style={{ width: "27.84px", height: "8.65px" }}
                >
                  {/* Frame 2147225623: White base underlay */}
                  <span
                    className="absolute left-0"
                    style={{
                      width: "28px",
                      height: "7.87px",
                      top: "0.79px",
                      backgroundColor: "#FFFFFF",
                      borderRadius: "4.7191px",
                    }}
                  />
                  {/* Frame 2147225622: Capsule pill with Figma inset shadow */}
                  <span
                    className="absolute left-0 top-0 transition-colors duration-300"
                    style={{
                      width: "27.84px",
                      height: "7.87px",
                      backgroundColor: isActive ? "#4285F4" : "#F1F1F1",
                      boxShadow: isActive
                        ? "inset 0px 1.25843px 2.83146px rgba(0, 0, 0, 0.25)"
                        : "inset 0px 1.25843px 2.98876px rgba(0, 0, 0, 0.25)",
                      borderRadius: "4.7191px",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Left and Right Navigation Buttons (Frame 2147225621) */}
          <div
            className="flex flex-row items-center justify-center"
            style={{
              gap: "28px",
              width: "116px",
              height: "44.16px",
            }}
          >
            {/* Frame 2147225616: Left Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="relative transition-all duration-200 cursor-pointer active:scale-95 hover:shadow-[0_0_18px_rgba(26,115,232,0.45)] hover:border-[#1A73E8]"
              style={{
                boxSizing: "border-box",
                width: "44px",
                height: "44.16px",
                backgroundColor: "#FFFFFF",
                border: "0.64px solid #1A73E8",
                borderRadius: "5px",
              }}
            >
              <DottedArrow direction="left" />
            </button>

            {/* Frame 2147225617: Right Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="relative transition-all duration-200 cursor-pointer active:scale-95 hover:shadow-[0_0_18px_rgba(26,115,232,0.45)] hover:border-[#1A73E8]"
              style={{
                boxSizing: "border-box",
                width: "44px",
                height: "44.16px",
                backgroundColor: "#FFFFFF",
                border: "0.64px solid #1A73E8",
                borderRadius: "5px",
              }}
            >
              <DottedArrow direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
