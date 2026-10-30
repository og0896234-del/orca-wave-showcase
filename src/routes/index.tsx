import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Linkedin, Instagram, Clock, Calendar } from "lucide-react";
import { OrcaCursor } from "@/components/OrcaCursor";
import { PressPlay, TheRoute, ComparisonTable, FaqSection, BriefSection } from "@/components/Extra";
import { Gallery, HelixGallery, grid, helix } from "@/components/GalleryWall";
import { ShortsArcCarousel } from "@/components/ShortsArcCarousel";
import SixWaysSection from "@/components/SixWaysSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { InteractiveFooterBrand } from "@/components/InteractiveFooterBrand";
import hero from "@/assets/orca-hero.jpg";
import breach from "@/assets/orca-breach.jpg";
import studio from "@/assets/work/img_p3_1.jpg";
import desk from "@/assets/work/img_p5_1.jpg";
import l1 from "@/assets/work/img_p7_7.png";
import l2 from "@/assets/work/img_p7_8.png";
import l3 from "@/assets/work/img_p7_9.png";
import l4 from "@/assets/work/img_p7_10.png";
import s1 from "@/assets/work/img_p7_4.png";
import s2 from "@/assets/work/img_p7_5.png";
import s3 from "@/assets/work/img_p7_6.png";
import t1 from "@/assets/work/img_p8_1.png";
import t2 from "@/assets/work/img_p8_2.png";
import t3 from "@/assets/work/img_p8_3.png";
import t4 from "@/assets/work/img_p8_4.png";
import t5 from "@/assets/work/img_p8_5.png";
import t6 from "@/assets/work/img_p8_6.png";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/logo.png" },
    ],
    meta: [
      { title: "OrcaVX Media — Post-production that hunts attention" },
      {
        name: "description",
        content:
          "Video editing and thumbnail design for doctors, lawyers, financial advisors and real estate agents.",
      },
      { property: "og:title", content: "OrcaVX Media — Post-production agency" },
      {
        property: "og:description",
        content: "Scroll-stopping long-form, shorts and thumbnails. Pod, Apex and Megalodon plans.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- helpers ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) =>
        es.forEach(
          (e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target)),
        ),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return y;
}

function Fin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden>
      <path d="M8 58c10-2 18-10 22-22C34 22 40 10 52 4c-4 12-4 26 0 40 2 6 4 10 4 14H8z" />
    </svg>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Chapter({ n, title }: { n: string; title: string }) {
  return null;
}

function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        ref.current!.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8
          }deg) translateZ(0)`;
      }}
      onMouseLeave={() => (ref.current!.style.transform = "")}
    >
      {children}
    </div>
  );
}

function Bubbles() {
  const bubbleList = [
    // --- 6 Large Featured Bubbles (24px - 38px, high opacity ~0.80 - 0.90) ---
    { left: 12, size: 28, dur: 14, delay: 1, opacity: 0.85, drift: 16, tier: "large" },
    { left: 34, size: 36, dur: 18, delay: 4.5, opacity: 0.90, drift: -20, tier: "large" },
    { left: 58, size: 25, dur: 13, delay: 2, opacity: 0.80, drift: 14, tier: "large" },
    { left: 76, size: 38, dur: 19, delay: 7.5, opacity: 0.90, drift: -18, tier: "large" },
    { left: 88, size: 26, dur: 15, delay: 3, opacity: 0.82, drift: 12, tier: "large" },
    { left: 46, size: 32, dur: 16, delay: 9, opacity: 0.88, drift: -15, tier: "large" },

    // --- 8 Medium Bubbles (12px - 18px, medium opacity ~0.55 - 0.70) ---
    { left: 6, size: 14, dur: 11, delay: 0.5, opacity: 0.65, drift: -10, tier: "medium" },
    { left: 22, size: 16, dur: 13, delay: 5, opacity: 0.60, drift: 12, tier: "medium" },
    { left: 28, size: 12, dur: 12, delay: 3, opacity: 0.55, drift: -8, tier: "medium" },
    { left: 52, size: 18, dur: 14, delay: 6.5, opacity: 0.70, drift: 15, tier: "medium" },
    { left: 68, size: 15, dur: 12.5, delay: 1.5, opacity: 0.65, drift: -12, tier: "medium" },
    { left: 82, size: 17, dur: 13.5, delay: 8, opacity: 0.68, drift: 10, tier: "medium" },
    { left: 94, size: 13, dur: 11.5, delay: 4, opacity: 0.58, drift: -9, tier: "medium" },
    { left: 40, size: 16, dur: 15, delay: 10.5, opacity: 0.62, drift: 11, tier: "medium" },

    // --- 18 Small Ambient Micro-Bubbles (4px - 9px, delicate lower opacity ~0.20 - 0.38) ---
    { left: 3, size: 5, dur: 9, delay: 0, opacity: 0.25, drift: -6, tier: "small" },
    { left: 9, size: 7, dur: 10, delay: 2.5, opacity: 0.32, drift: 7, tier: "small" },
    { left: 16, size: 4, dur: 8, delay: 4, opacity: 0.22, drift: -5, tier: "small" },
    { left: 19, size: 6, dur: 9.5, delay: 6, opacity: 0.28, drift: 6, tier: "small" },
    { left: 25, size: 8, dur: 11, delay: 1.2, opacity: 0.35, drift: -8, tier: "small" },
    { left: 31, size: 5, dur: 8.5, delay: 7.2, opacity: 0.24, drift: 5, tier: "small" },
    { left: 43, size: 7, dur: 10.5, delay: 3.5, opacity: 0.30, drift: -7, tier: "small" },
    { left: 49, size: 4, dur: 7.5, delay: 5.5, opacity: 0.20, drift: 6, tier: "small" },
    { left: 55, size: 8, dur: 11.5, delay: 0.8, opacity: 0.36, drift: -9, tier: "small" },
    { left: 64, size: 6, dur: 9, delay: 8.2, opacity: 0.26, drift: 7, tier: "small" },
    { left: 71, size: 5, dur: 8, delay: 2.2, opacity: 0.23, drift: -5, tier: "small" },
    { left: 79, size: 9, dur: 12, delay: 4.8, opacity: 0.38, drift: 8, tier: "small" },
    { left: 85, size: 6, dur: 9.5, delay: 9.5, opacity: 0.27, drift: -6, tier: "small" },
    { left: 91, size: 4, dur: 7, delay: 1.8, opacity: 0.22, drift: 5, tier: "small" },
    { left: 96, size: 7, dur: 10, delay: 6.8, opacity: 0.31, drift: -7, tier: "small" },
    { left: 14, size: 5, dur: 8.5, delay: 11, opacity: 0.25, drift: 6, tier: "small" },
    { left: 61, size: 6, dur: 9.2, delay: 10.2, opacity: 0.28, drift: -5, tier: "small" },
    { left: 80, size: 8, dur: 11, delay: 12, opacity: 0.34, drift: 7, tier: "small" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbleList.map((x, i) => {
        const isLarge = x.tier === "large";
        const isMedium = x.tier === "medium";
        return (
          <span
            key={i}
            className="bubble"
            style={{
              left: `${x.left}%`,
              width: x.size,
              height: x.size,
              animationDuration: `${x.dur}s`,
              animationDelay: `${x.delay}s`,
              border: isLarge
                ? "1.5px solid rgba(125, 211, 252, 0.75)"
                : isMedium
                  ? "1px solid rgba(56, 189, 248, 0.5)"
                  : "1px solid rgba(56, 189, 248, 0.35)",
              background: isLarge
                ? "radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.5) 0%, rgba(56, 189, 248, 0.22) 35%, rgba(0, 127, 255, 0.05) 70%, transparent 100%)"
                : isMedium
                  ? "radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.3) 0%, rgba(56, 189, 248, 0.12) 40%, transparent 100%)"
                  : "transparent",
              boxShadow: isLarge
                ? "0 0 12px rgba(56, 189, 248, 0.35), inset 0 0 6px rgba(255, 255, 255, 0.25)"
                : "none",
              ["--bubble-opacity" as any]: x.opacity,
              ["--bubble-drift" as any]: `${x.drift}px`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------- data ---------- */
const waters = [
  {
    name: "Healthcare",
    line: "Empathy meets authority.",
    tags: ["Provider intros", "Explainers", "FAQ reels"],
    description:
      "Doctors, surgeons, therapists, and clinics come to us with raw talking-head footage, CME presentations, and patient Q&A recordings. We transform them into polished long-form videos — complete with motion graphics, animated diagrams, and professional colour grading — plus short-form FAQ reels and educational explainers that build trust, grow patient audiences, and establish undeniable authority in highly regulated spaces.",
  },
  {
    name: "Legal",
    line: "Clarity without jargon.",
    tags: ["Process explainers", "Thought leadership", "Q&A shorts"],
    description:
      "Law firms and solo attorneys hand us raw interview recordings, deposition walk-throughs, and seminar footage. We cut it into crisp process explainers that demystify legal procedure, thought-leadership pieces that position partners as go-to authorities, and short Q&A reels designed for LinkedIn and YouTube — all without sacrificing the gravitas the legal world demands.",
  },
  {
    name: "Finance",
    line: "Stability, visualised.",
    tags: ["Market updates", "Webinar cutdowns", "Literacy series"],
    description:
      "Wealth advisors, fintech founders, and trading educators send us webinar recordings, screen-capture sessions, and on-camera commentary. We turn them into polished market-update videos with animated data overlays, tightly edited webinar cutdowns for gated lead magnets, and serialised financial-literacy content that converts viewers into long-term clients.",
  },
  {
    name: "Real Estate",
    line: "Sell the lifestyle.",
    tags: ["Listing tours", "Neighbourhood guides", "Market reports"],
    description:
      "Top-producing agents and luxury brokerages drop drone footage, walk-through videos, and neighbourhood b-roll into our shared folder. We craft cinematic listing tours with music, colour grading, and motion titles; neighbourhood lifestyle guides that sell the community as much as the property; and punchy market-report shorts that keep an agent's audience engaged between listings.",
  },
];

const plans = [
  {
    name: "Pod",
    price: "999",
    tag: "Solo creators & small practices",
    lf: 2,
    sf: 12,
    th: 14,
    extra: ["Up to 1080p", "10 min renders", "48–72h turnaround"],
  },
  {
    name: "Apex",
    price: "1,899",
    tag: "Growing teams, weekly cadence",
    lf: 4,
    sf: 16,
    th: 20,
    extra: ["All 4 edit styles", "Subtitles & show notes", "9:16 · 1:1 · 16:9 pack"],
    hot: true,
  },
  {
    name: "Megalodon",
    price: "2,399",
    tag: "Brands running full-funnel",
    lf: 8,
    sf: 28,
    th: 36,
    extra: ["Up to 4K + color grade", "Unlimited revisions", "24h rush included"],
  },
];

/* ---------- WaterRow: hover-expandable industry card ---------- */
function WaterRow({
  w,
}: {
  w: { name: string; line: string; tags: string[]; description: string };
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group cursor-default py-10 transition-all duration-500 hover:pl-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row: icon + name + tagline / tags */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-6">
          <Fin className="h-8 w-8 -translate-x-4 text-primary opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
          <h3 className="font-display text-4xl font-bold transition-colors group-hover:text-primary md:text-6xl">
            {w.name}
          </h3>
        </div>
        <div className="md:pr-20 md:text-right">
          <p className="text-lg">{w.line}</p>
          <p className="mt-1 text-sm text-muted-foreground">{w.tags.join(" · ")}</p>
        </div>
      </div>

      {/* Dropdown description */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${
          hovered ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="mt-4 max-w-3xl border-l-2 border-primary/40 pl-5 text-base leading-relaxed text-muted-foreground text-justify">
            {w.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- page ---------- */
function Index() {
  useReveal();
  const y = useScrollY();
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ["six-ways", "exhibit", "waters", "route", "plans", "brief"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            current = id;
          }
        }
      }
      if (window.scrollY < 300) {
        current = "";
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectPlan = (planName: string) => {
    const planKey = planName.toLowerCase();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("orcavx:select-plan", { detail: { plan: planName } }),
      );
      window.history.pushState(null, "", `#brief-${planKey}`);

      const briefEl = document.getElementById("brief");
      if (briefEl) {
        const headerOffset = 80;
        const elementPosition = briefEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }

      setTimeout(() => {
        const nameInput = document.getElementById("form-name");
        if (nameInput) {
          nameInput.focus({ preventScroll: true });
        }
      }, 500);
    }
  };

  const navItems = [
    { label: "Six Ways", href: "#six-ways", id: "six-ways", subtitle: "Hunting Styles" },
    { label: "The Route", href: "#route", id: "route", subtitle: "Sticky Notes" },
    { label: "Our Waters", href: "#waters", id: "waters", subtitle: "Healthcare & Niches" },
    { label: "The Exhibit", href: "#exhibit", id: "exhibit", subtitle: "Work & Reels" },
    { label: "Pod Plans", href: "#plans", id: "plans", subtitle: "Pricing & Tiers" },
  ];

  return (
    <main className="relative overflow-x-clip bg-abyss">
      <OrcaCursor />

      {/* depth meter */}
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex">
        <span>Depth</span>
        <div className="relative h-40 w-px bg-border">
          <div
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-glow transition-all"
            style={{
              top: `${Math.min(
                100,
                (y /
                  Math.max(
                    1,
                    typeof document !== "undefined"
                      ? document.body.scrollHeight - window.innerHeight
                      : 1,
                  )) *
                100,
              )}%`,
            }}
          />
        </div>
        <span className="font-display text-foreground">{Math.round(y / 10)}m</span>
      </div>

      {/* nav */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${y > 40
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
          }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
          {/* Logo */}
          <a
            href="#top"
            onClick={() => setMobileMenuOpen(false)}
            className="group flex items-center gap-3 font-display text-lg font-bold"
          >
            <img
              src={logo}
              alt="OrcaVX official logo"
              className="h-7 w-7 rounded-md object-contain transition-transform duration-500 group-hover:scale-110 shadow-sm"
            />
            <span className="tracking-[0.02em]">
              ORCA<span className="text-primary ml-[0.03em]"><span className="tracking-[0.05em]">V</span><span>X</span></span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden items-center gap-1.5 rounded-full border border-border/50 bg-background/40 p-1.5 backdrop-blur-md md:flex lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`group relative rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 md:text-sm ${isActive
                    ? "bg-primary/15 text-primary shadow-[0_0_15px_rgba(0,127,255,0.25)]"
                    : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                    }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    )}
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#brief"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-[5px] bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105 hover:bg-primary/90 md:text-sm"
            >
              Send brief
            </a>

            {/* Mobile menu hamburger toggle button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-border/80 bg-background/50 text-foreground transition-colors hover:border-primary md:hidden"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-border/80 bg-abyss/95 px-6 pb-6 pt-2 backdrop-blur-2xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="mb-3 flex items-center justify-between border-b border-border/50 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>Pod Navigation</span>
              <span className="flex items-center gap-1 text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Live Radar
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-200 ${isActive
                      ? "bg-primary/15 font-semibold text-primary"
                      : "text-foreground hover:bg-white/[0.05]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground/80">0{idx + 1}</span>
                      <span>{item.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.subtitle}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* 1. Hero (ORCAVX): Brand, one line of what you do, and the main CTA */}
      <section
        id="top"
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-20 pb-16"
      >
        <img
          src={hero}
          alt="Orca gliding through deep ocean"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: `scale(${1.1 + y * 0.0003}) translateY(${y * 0.25}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-abyss" />
        <Bubbles />
        <div
          className="relative z-10 px-6 text-center"
          style={{
            transform: `translateY(${y * -0.2}px)`,
            opacity: Math.max(0, 1 - y / 600),
          }}
        >
          <h1 className="font-display text-[18vw] font-extrabold leading-[0.85] tracking-[0.02em] md:text-[12rem]">
            <span>ORCA</span>
            <span className="text-stroke-gilroy ml-[0.04em]">
              <span className="tracking-[0.06em]">V</span>
              <span>X</span>
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-md text-lg text-muted-foreground">
            We hunt attention. Raw footage in — scroll-stopping stories out.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#brief"
              className="group inline-flex items-center gap-3 rounded-[5px] bg-primary px-8 py-4 font-display text-base font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105 hover:bg-primary/90"
            >
              Start your project
              <Fin className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#reels"
              className="group inline-flex items-center gap-3 rounded-[5px] border border-border/80 bg-card/90 px-8 py-4 font-display text-base font-semibold transition-all hover:scale-105 hover:border-primary hover:text-foreground"
            >
              <span>Watch showreel</span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5">▶</span>
            </a>
          </div>
        </div>
        <a
          href="#about"
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
        >
          Dive
          <span className="h-10 w-px bg-primary/40" />
        </a>
      </section>

      {/* Marquee */}
      <div className="border-y border-border py-6">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap text-4xl font-bold md:text-6xl" style={{ fontFamily: "'Gilroy', 'Gilroy-Heavy', sans-serif", fontWeight: 800 }}>
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Long-form", "Shorts", "Thumbnails", "Color", "Sound", "Story"].map((w, i) => (
              <span key={`${k}${i}`} className="flex items-center gap-12">
                <span className={i % 2 ? "text-stroke" : ""}>{w}</span>
                <Fin className="h-8 w-8 text-primary" />
              </span>
            )),
          )}
        </div>
      </div>

      {/* 2. Smart. Fast. Relentless.: The core value proposition, right under the hero */}
      <section id="about" className="relative mx-auto max-w-7xl px-6 py-24 md:py-36">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-5xl font-bold leading-tight md:text-7xl">
              Smart. Fast.
              <br />
              <span className="text-gradient">Relentless.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg text-muted-foreground">
              Like an orca pod, we move as one — editors, designers and colorists turning raw
              footage into high-retention stories, so you can focus on creating.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Tilt className="relative">
              <div className="overflow-hidden rounded-3xl shadow-glow">
                <img
                  src={studio}
                  alt="Editor at multi-monitor workstation"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 rounded-2xl border border-border bg-card p-6">
                <p className="font-display text-4xl font-bold text-primary">24h</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Fastest turnaround
                </p>
              </div>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* 3. Press play: A quick showreel so people see proof within the first scroll */}
      <PressPlay />

      {/* 4. Six ways we swim (the services grid): Interview, Presenter, Screencast, Showcase, Shorts, Thumbnails */}
      <SixWaysSection />

      {/* 5. Hall I Long form, Hall II Shorts, Hall III Thumbnails: The portfolio in matching order */}
      <section id="exhibit" className="relative py-20 md:py-28 overflow-x-clip">
        {/* Hall I — Long Form */}
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="font-display text-5xl font-bold md:text-7xl">
              Hall I — <span className="text-gradient">Long form</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 overflow-hidden">
          <div className="flex w-max gap-6 animate-marquee-slow-reverse">
            {[l1, l2, l3, l4, l1, l2, l3, l4].map((src, i) => (
              <div key={i} className="w-80 shrink-0 md:w-[28rem]">
                <Frame src={src} label={`No. 0${(i % 4) + 1}`} ratio="aspect-video" />
              </div>
            ))}
          </div>
        </div>

        {/* Hall II — Shorts */}
        <div className="mx-auto mt-20 md:mt-24 max-w-7xl px-6">
          <div>
            <h2 className="font-display text-5xl font-bold md:text-7xl">
              Hall II — <span className="text-stroke-gilroy">Shorts</span>
            </h2>
          </div>
        </div>

        <div className="mt-10 overflow-hidden">
          <ShortsArcCarousel />
        </div>

        {/* Hall III — Thumbnails */}
        <div className="mx-auto mt-20 md:mt-24 max-w-7xl px-6">
          <Reveal>
            <h2 className="font-display text-5xl font-bold md:text-7xl">
              Hall III — <span className="text-gradient">Thumbnails</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 overflow-hidden">
          <div className="flex w-max gap-6 animate-marquee-slow">
            {[t1, t2, t3, t4, t5, t6, t1, t2, t3, t4, t5, t6].map((src, i) => (
              <div key={i} className="w-80 shrink-0 md:w-[28rem]">
                <Frame src={src} label={`No. 0${(i % 6) + 1}`} ratio="aspect-video" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Where we swim: Healthcare, Legal, Finance, Real Estate */}
      <section id="waters" className="relative overflow-hidden bg-deep py-20 md:py-28">
        <img
          src={desk}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-10"
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="mb-14 font-display text-5xl font-bold md:text-7xl">
              Where we <span className="text-gradient">swim</span>.
            </h2>
          </Reveal>
          <div className="divide-y divide-border border-y border-border">
            {waters.map((w, i) => (
              <Reveal key={w.name} delay={i * 80}>
                <WaterRow w={w} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. The route (Drop, Hunt, Craft, Surface): Process before price */}
      <TheRoute />

      {/* Praise from the Pod: Verified Client Stories & Testimonials */}
      <TestimonialsSection />

      {/* 8. Pick your size: The Pod, Apex and Megalodon pricing cards */}
      <section id="plans" className="relative mx-auto max-w-7xl px-6 pt-16 pb-10 md:pt-24 md:pb-14">
        <Reveal>
          <h2 className="mb-14 font-display text-5xl font-bold md:text-7xl">
            Pick your <span className="text-stroke-gilroy">size</span>.
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <Tilt className="h-full">
                <div
                  onClick={() => handleSelectPlan(p.name)}
                  className={`group relative h-full overflow-hidden rounded-3xl border p-8 transition-shadow duration-500 hover:shadow-glow cursor-pointer ${p.hot ? "border-primary bg-primary/10" : "border-border bg-card/40"
                    }`}
                >
                  {p.hot && (
                    <span className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-[10px] uppercase tracking-widest text-primary-foreground">
                      Popular
                    </span>
                  )}
                  <Fin
                    className={`mb-8 text-primary ${["h-8 w-8", "h-12 w-12", "h-16 w-16"][i]}`}
                  />
                  <h3 className="font-display text-3xl font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.tag}</p>
                  <p className="mt-8 font-display text-5xl font-bold">
                    ${p.price}
                    <span className="text-base font-normal text-muted-foreground">/mo</span>
                  </p>
                  <div className="mt-8 grid grid-cols-3 gap-2 border-y border-border py-6 text-center">
                    {[
                      ["Long", p.lf],
                      ["Shorts", p.sf],
                      ["Thumbs", p.th],
                    ].map(([k, v]) => (
                      <div key={k as string}>
                        <p className="font-display text-2xl font-bold text-accent">{v}</p>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          {k}
                        </p>
                      </div>
                    ))}
                  </div>
                  <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                    {p.extra.map((e) => (
                      <li key={e}>— {e}</li>
                    ))}
                  </ul>
                  <a
                    href="#brief"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleSelectPlan(p.name);
                    }}
                    className={`mt-8 block rounded-[5px] py-3 text-center text-sm font-semibold transition-all ${p.hot
                      ? "bg-primary text-primary-foreground shadow-glow hover:bg-primary/90 hover:scale-[1.02]"
                      : "border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground"
                      }`}
                  >
                    Start with {p.name}
                  </a>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 9. Size up the pod: Comparison table placed directly under cards */}
      <ComparisonTable />

      {/* 10. Echoes (FAQ): Answers doubts right after pricing */}
      <FaqSection />

      {/* 11. Send a brief: Contact form when ready */}
      <BriefSection />

      {/* 12. Let’s make a splash: The closing CTA */}
      <section
        id="contact"
        className="relative flex py-16 md:py-24 items-center justify-center overflow-hidden"
      >
        <img
          src={breach}
          alt="Orca breaching from the ocean"
          loading="lazy"
          width={1600}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/40 to-abyss" />
        <Bubbles />
        <div className="relative z-10 px-6 text-center">
          <Reveal>
            <h2 className="font-display text-6xl font-extrabold leading-none md:text-[9rem]">
              Let's make
              <br />
              <span className="text-gradient">a splash.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* 13. Footer */}
      <footer className="relative overflow-hidden border-t border-border bg-deep px-6 pt-16 pb-12 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-12">
            {/* Left Column: Brand, Description, Socials, Turnaround */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <span className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-white">
                  <img
                    src={logo}
                    alt="OrcaVX official logo"
                    className="h-8 w-8 rounded-lg object-contain shadow-[0_0_15px_rgba(0,127,255,0.35)]"
                  />
                  OrcaVX Media
                </span>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
                  Post-production that hunts attention for doctors, lawyers, financial advisors, and creators.
                </p>

                {/* Social Icon Square Buttons (Instagram & LinkedIn) */}
                <div className="mt-6 flex items-center gap-2.5">
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-white/12 bg-white/[0.03] text-slate-400 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-white/12 bg-white/[0.03] text-slate-400 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>

                {/* Availability Badges */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs font-medium text-slate-400">
                    <Clock className="h-3 w-3 text-primary" />
                    <span>24-hour turnaround</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-xs font-medium text-slate-400">
                    <Calendar className="h-3 w-3 text-[#00C2FF]" />
                    <span>Monday to Friday</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Columns (4 Structured Columns Matching Reference Design & Website Content) */}
            <div className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {[
                {
                  title: "The Exhibit",
                  links: [
                    ["Long-Form", "#exhibit"],
                    ["Shorts", "#exhibit"],
                    ["Thumbnails", "#exhibit"],
                    ["Showreel", "#reels"],
                    ["Six Ways", "#six-ways"],
                  ],
                },
                {
                  title: "Process & Plans",
                  links: [
                    ["The Route", "#route"],
                    ["Pod", "#plans"],
                    ["Apex", "#plans"],
                    ["Megalodon", "#plans"],
                    ["Compare plans", "#compare"],
                  ],
                },
                {
                  title: "Company",
                  links: [
                    ["About Us", "#about"],
                    ["Our Waters", "#waters"],
                    ["Send a brief", "#brief"],
                    ["Client reviews", "#testimonials"],
                    ["FAQ", "#faq"],
                  ],
                },
                {
                  title: "Legal",
                  links: [
                    ["Privacy Policy", "#brief"],
                    ["Terms of Service", "#brief"],
                    ["Cookie Policy", "#brief"],
                    ["Refund Policy", "#brief"],
                    ["Sitemap", "#top"],
                  ],
                },
              ].map((col) => (
                <div key={col.title}>
                  <p className="mb-4 text-sm font-semibold text-white">
                    {col.title}
                  </p>
                  <ul className="space-y-3 text-sm text-slate-400">
                    {col.links.map(([label, href]) => (
                      <li key={label}>
                        <a
                          href={href}
                          className="transition-colors duration-200 hover:text-white"
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive cursor-following blue spotlight brand text inspired by huly.io */}
          <InteractiveFooterBrand />

          <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-8 text-xs text-muted-foreground md:flex-row">
            <span>© {new Date().getFullYear()} OrcaVX Media · All rights reserved</span>
            <div className="flex gap-6">
              <a href="#brief" className="hover:text-primary">
                Privacy
              </a>
              <a href="#brief" className="hover:text-primary">
                Terms
              </a>
              <a href="#brief" className="hover:text-primary">
                Refund policy
              </a>
            </div>
            <a href="#top" className="group flex items-center gap-2 hover:text-primary">
              Back to surface{" "}
              <Fin className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Frame({ src, label, ratio }: { src: string; label: string; ratio: string }) {
  return (
    <figure className="group">
      <div className={`relative overflow-hidden rounded-2xl border border-border bg-card ${ratio}`}>
        <img
          src={src}
          alt={label}
          loading="lazy"
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute bottom-4 left-4 flex translate-y-4 items-center gap-2 text-xs uppercase tracking-widest opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <Fin className="h-4 w-4 text-primary" /> View
        </span>
      </div>
      <figcaption className="mt-3 flex justify-between text-xs uppercase tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span>OrcaVX</span>
      </figcaption>
    </figure>
  );
}
