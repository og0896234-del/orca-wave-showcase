import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { OrcaCursor } from "@/components/OrcaCursor";
import { Extra } from "@/components/Extra";
import { Gallery, HelixGallery, grid, helix } from "@/components/GalleryWall";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OrcaVX Media — Post-production that hunts attention" },
      { name: "description", content: "Video editing and thumbnail design for doctors, lawyers, financial advisors and real estate agents." },
      { property: "og:title", content: "OrcaVX Media — Post-production agency" },
      { property: "og:description", content: "Scroll-stopping long-form, shorts and thumbnails. Pod, Apex and Megalodon plans." },
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
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
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
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setY(window.scrollY)); };
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

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Chapter({ n, title }: { n: string; title: string }) {
  return (
    <Reveal className="mb-14 flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
      <Fin className="h-4 w-4 text-primary" />
      <span>Chapter {n}</span>
      <span className="h-px w-16 bg-border" />
      <span className="text-foreground">{title}</span>
    </Reveal>
  );
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
        ref.current!.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
      }}
      onMouseLeave={() => (ref.current!.style.transform = "")}
    >
      {children}
    </div>
  );
}

function Bubbles() {
  const b = Array.from({ length: 14 }, (_, i) => ({
    left: (i * 37) % 100, size: 4 + ((i * 7) % 12), dur: 10 + ((i * 5) % 14), delay: (i * 1.3) % 10,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {b.map((x, i) => (
        <span key={i} className="bubble" style={{ left: `${x.left}%`, width: x.size, height: x.size, animationDuration: `${x.dur}s`, animationDelay: `${x.delay}s` }} />
      ))}
    </div>
  );
}

/* ---------- data ---------- */
const styles = [
  { name: "Interview", hrs: "48–72h", desc: "Multi-cam podcasts & panels" },
  { name: "Presenter", hrs: "48h", desc: "Direct-to-camera explainers" },
  { name: "Screencast", hrs: "24–48h", desc: "Walk-throughs & chart reviews" },
  { name: "Showcase", hrs: "48h", desc: "Property & clinic tours" },
  { name: "Shorts", hrs: "24–36h", desc: "Reels · TikTok · YT Shorts" },
  { name: "Thumbnails", hrs: "24h", desc: "Click-optimized authority art" },
];

const waters = [
  { name: "Healthcare", line: "Empathy meets authority.", tags: ["Provider intros", "Explainers", "FAQ reels"] },
  { name: "Legal", line: "Clarity without jargon.", tags: ["Process explainers", "Thought leadership", "Q&A shorts"] },
  { name: "Finance", line: "Stability, visualised.", tags: ["Market updates", "Webinar cutdowns", "Literacy series"] },
  { name: "Real Estate", line: "Sell the lifestyle.", tags: ["Listing tours", "Neighbourhood guides", "Market reports"] },
];

const plans = [
  { name: "Pod", price: "999", tag: "Solo creators & small practices", lf: 2, sf: 12, th: 14, extra: ["Up to 1080p", "10 min renders", "48–72h turnaround"] },
  { name: "Apex", price: "1,899", tag: "Growing teams, weekly cadence", lf: 4, sf: 16, th: 20, extra: ["All 4 edit styles", "Subtitles & show notes", "9:16 · 1:1 · 16:9 pack"], hot: true },
  { name: "Megalodon", price: "2,399", tag: "Brands running full-funnel", lf: 8, sf: 28, th: 36, extra: ["Up to 4K + color grade", "Unlimited revisions", "24h rush included"] },
];

/* ---------- page ---------- */
function Index() {
  useReveal();
  const y = useScrollY();

  return (
    <main className="relative overflow-x-clip bg-abyss">
      <OrcaCursor />
      {/* depth meter */}
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex">
        <span>Depth</span>
        <div className="relative h-40 w-px bg-border">
          <div className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-glow transition-all"
            style={{ top: `${Math.min(100, (y / Math.max(1, (typeof document !== "undefined" ? document.body.scrollHeight - window.innerHeight : 1))) * 100)}%` }} />
        </div>
        <span className="font-display text-foreground">{Math.round(y / 10)}m</span>
      </div>

      {/* nav */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${y > 40 ? "bg-background/70 backdrop-blur-xl" : ""}`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#top" className="group flex items-center gap-2 font-display text-lg font-bold">
            <Fin className="h-6 w-6 text-primary transition-transform duration-500 group-hover:-rotate-12" /> ORCAVX
          </a>
          <div className="hidden gap-8 text-sm text-muted-foreground md:flex">
            {["about", "craft", "reels", "exhibit", "plans", "compare", "brief"].map((s) => (
              <a key={s} href={`#${s}`} className="relative capitalize transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full">{s}</a>
            ))}
          </div>
          <a href="#contact" className="rounded-full border border-border px-5 py-2 text-sm transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground">Let's talk</a>
        </nav>
      </header>

      {/* hero */}
      <section id="top" className="relative flex h-[100svh] items-center justify-center overflow-hidden">
        <img src={hero} alt="Orca gliding through deep ocean" width={1920} height={1088}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: `scale(${1.1 + y * 0.0003}) translateY(${y * 0.25}px)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-abyss" />
        <Bubbles />
        <div className="relative z-10 px-6 text-center" style={{ transform: `translateY(${y * -0.2}px)`, opacity: Math.max(0, 1 - y / 600) }}>
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-accent">Post-production agency</p>
          <h1 className="font-display text-[18vw] font-extrabold leading-[0.85] md:text-[12rem]">
            ORCA<span className="text-stroke">VX</span>
          </h1>
          <p className="mx-auto mt-8 max-w-md text-lg text-muted-foreground">We hunt attention. Raw footage in — scroll-stopping stories out.</p>
        </div>
        <a href="#about" className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Dive
          <span className="h-12 w-px animate-pulse bg-gradient-to-b from-primary to-transparent" />
        </a>
      </section>

      {/* marquee */}
      <div className="border-y border-border py-6">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-4xl font-bold md:text-6xl">
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

      {/* about */}
      <section id="about" className="relative mx-auto max-w-7xl px-6 py-32 md:py-48">
        <Chapter n="01" title="The Pod" />
        <div className="grid items-center gap-16 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-5xl font-bold leading-tight md:text-7xl">
              Smart. Fast.<br /><span className="text-gradient">Relentless.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg text-muted-foreground">
              Like an orca pod, we move as one — editors, designers and colorists turning raw footage into high-retention stories, so you can focus on creating.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <Tilt className="relative">
              <div className="overflow-hidden rounded-3xl shadow-glow">
                <img src={studio} alt="Editor at multi-monitor workstation" loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="absolute -bottom-8 -left-8 rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-xl">
                <p className="font-display text-4xl font-bold text-primary">24h</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Fastest turnaround</p>
              </div>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* craft */}
      <section id="craft" className="relative bg-deep py-32 md:py-48">
        <div className="absolute inset-0 bg-glow opacity-60" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Chapter n="02" title="The Craft" />
          <Reveal><h2 className="mb-20 max-w-3xl font-display text-5xl font-bold md:text-7xl">Six ways we <span className="text-stroke">hunt</span>.</h2></Reveal>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {styles.map((s, i) => (
              <Reveal key={s.name} delay={i * 80}>
                <div className="group relative h-full overflow-hidden bg-background p-10 transition-colors duration-500 hover:bg-primary">
                  <Fin className="absolute -bottom-6 -right-6 h-32 w-32 text-primary/10 transition-all duration-700 group-hover:-translate-y-4 group-hover:text-primary-foreground/20" />
                  <span className="text-xs tracking-[0.3em] text-muted-foreground group-hover:text-primary-foreground/70">0{i + 1}</span>
                  <h3 className="mt-12 font-display text-3xl font-bold group-hover:text-primary-foreground">{s.name}</h3>
                  <p className="mt-2 text-muted-foreground group-hover:text-primary-foreground/80">{s.desc}</p>
                  <p className="mt-8 text-sm text-accent group-hover:text-primary-foreground">↳ {s.hrs}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* exhibit */}
      <section id="exhibit" className="relative py-32 md:py-48">
        <div className="mx-auto max-w-7xl px-6">
          <Chapter n="03" title="The Exhibition" />
          <Reveal><h2 className="font-display text-5xl font-bold md:text-7xl">Hall I — <span className="text-gradient">Long form</span></h2></Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {[l1, l2, l3, l4].map((src, i) => (
              <Reveal key={i} delay={i * 100} className={i % 2 ? "md:mt-24" : ""}>
                <Frame src={src} label={`No. 0${i + 1}`} ratio="aspect-video" />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-40"><h2 className="font-display text-5xl font-bold md:text-7xl">Hall II — <span className="text-stroke">Shorts</span></h2></Reveal>
          <p className="mt-4 text-sm text-muted-foreground">A spiral of reels — scroll to wind the helix.</p>
          <div className="relative mt-10 h-[80vh] overflow-hidden rounded-3xl border border-border/50 bg-deep/40">
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-background via-transparent to-background" />
            <HelixGallery arrange={helix({ radius: 500, itemsPerTurn: 12, pitch: 48 })} className="h-full w-full">
              {[s1, s2, s3, s1, s2, s3, s1, s2, s3, s1, s2, s3].map((src, i) => (
                <img key={i} src={src} alt={`Reel ${(i % 3) + 1}`} loading="lazy" className="aspect-[9/16] w-full rounded-xl border border-border object-cover shadow-glow" />
              ))}
            </HelixGallery>
          </div>
        </div>

        <div className="mt-40">
          <Reveal className="mx-auto max-w-7xl px-6"><h2 className="font-display text-5xl font-bold md:text-7xl">Hall III — <span className="text-gradient">Thumbnails</span></h2></Reveal>
          <div className="mt-16 overflow-hidden">
            <div className="flex gap-6" style={{ transform: `translateX(${-((y * 0.25) % 1200)}px)` }}>
              {[t1, t2, t3, t4, t5, t6, t1, t2, t3].map((src, i) => (
                <div key={i} className="w-80 shrink-0 md:w-[28rem]">
                  <Frame src={src} label={`Plate ${i + 1}`} ratio="aspect-video" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Reveal className="mx-auto max-w-7xl px-6">
          <Gallery arrange={grid({ columns: 6, fill: "offset", rotateX: 20, bulge: 120 })} className="pb-14 pt-2">
            {[t1, t2, t3, t4, t5, t6, t1, t2, t3, t4, t5, t6].map((src, i) => (
              <img key={i} src={src} alt={`Thumbnail plate ${i + 1}`} loading="lazy" className="aspect-video w-full rounded-xl border border-border object-cover" />
            ))}
          </Gallery>
          <p className="text-center text-xs uppercase tracking-[0.4em] text-muted-foreground">Glide your cursor across the wall</p>
        </Reveal>
      </section>

      {/* waters */}
      <section id="waters" className="relative overflow-hidden bg-deep py-32 md:py-48">
        <img src={desk} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-10" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Chapter n="04" title="Our Waters" />
          <Reveal><h2 className="mb-20 font-display text-5xl font-bold md:text-7xl">Where we <span className="text-gradient">swim</span>.</h2></Reveal>
          <div className="divide-y divide-border border-y border-border">
            {waters.map((w, i) => (
              <Reveal key={w.name} delay={i * 80}>
                <div className="group flex flex-col gap-4 py-10 transition-all duration-500 hover:pl-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-6">
                    <Fin className="h-8 w-8 -translate-x-4 text-primary opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                    <h3 className="font-display text-4xl font-bold transition-colors group-hover:text-primary md:text-6xl">{w.name}</h3>
                  </div>
                  <div className="md:text-right">
                    <p className="text-lg">{w.line}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{w.tags.join(" · ")}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* plans */}
      <section id="plans" className="relative mx-auto max-w-7xl px-6 py-32 md:py-48">
        <Chapter n="05" title="Join the Pod" />
        <Reveal><h2 className="mb-20 font-display text-5xl font-bold md:text-7xl">Pick your <span className="text-stroke">size</span>.</h2></Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <Tilt className="h-full">
                <div className={`relative h-full overflow-hidden rounded-3xl border p-8 transition-shadow duration-500 hover:shadow-glow ${p.hot ? "border-primary bg-primary/10" : "border-border bg-card/40"}`}>
                  {p.hot && <span className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-[10px] uppercase tracking-widest text-primary-foreground">Popular</span>}
                  <Fin className={`mb-8 text-primary ${["h-8 w-8", "h-12 w-12", "h-16 w-16"][i]}`} />
                  <h3 className="font-display text-3xl font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.tag}</p>
                  <p className="mt-8 font-display text-5xl font-bold">${p.price}<span className="text-base font-normal text-muted-foreground">/mo</span></p>
                  <div className="mt-8 grid grid-cols-3 gap-2 border-y border-border py-6 text-center">
                    {[["Long", p.lf], ["Shorts", p.sf], ["Thumbs", p.th]].map(([k, v]) => (
                      <div key={k as string}><p className="font-display text-2xl font-bold text-accent">{v}</p><p className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</p></div>
                    ))}
                  </div>
                  <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                    {p.extra.map((e) => <li key={e}>— {e}</li>)}
                  </ul>
                  <a href="#contact" className={`mt-8 block rounded-full py-3 text-center text-sm font-semibold transition-all ${p.hot ? "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground" : "border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground"}`}>Start with {p.name}</a>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      <Extra />

      {/* contact */}
      <section id="contact" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <img src={breach} alt="Orca breaching from the ocean" loading="lazy" width={1600} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/40 to-abyss" />
        <Bubbles />
        <div className="relative z-10 px-6 text-center">
          <Reveal><p className="mb-6 text-xs uppercase tracking-[0.5em] text-accent">Chapter 06 — Surface</p></Reveal>
          <Reveal delay={100}><h2 className="font-display text-6xl font-extrabold leading-none md:text-[9rem]">Let's make<br /><span className="text-gradient">a splash.</span></h2></Reveal>
          <Reveal delay={250}>
            <a href="mailto:hello@orcavx.com" className="group mt-14 inline-flex items-center gap-4 rounded-full bg-primary px-10 py-5 font-display text-lg font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105 hover:bg-foam hover:text-abyss">
              hello@orcavx.com
              <Fin className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="relative overflow-hidden border-t border-border bg-deep px-6 pt-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="flex items-center gap-2 font-display text-2xl font-bold"><Fin className="h-7 w-7 text-primary animate-swim" /> ORCAVX MEDIA</span>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">Post-production for doctors, lawyers, financial advisors and real estate agents. We hunt attention.</p>
              <form onSubmit={(e) => { e.preventDefault(); const em = new FormData(e.currentTarget).get("email"); window.location.href = `mailto:hello@orcavx.com?subject=Newsletter&body=${encodeURIComponent(`Subscribe: ${em}`)}`; }} className="mt-8 flex max-w-sm overflow-hidden rounded-full border border-border focus-within:border-primary">
                <input required type="email" name="email" maxLength={255} placeholder="Join the pod newsletter" className="flex-1 bg-transparent px-5 py-3 text-sm outline-none" />
                <button className="bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent">Join</button>
              </form>
            </div>
            {[
              ["Explore", [["About", "#about"], ["Craft", "#craft"], ["Reels", "#reels"], ["Exhibition", "#exhibit"], ["Industries", "#waters"]]],
              ["Plans", [["Pod — $999", "#plans"], ["Apex — $1,899", "#plans"], ["Megalodon — $2,399", "#plans"], ["Compare plans", "#compare"], ["Send a brief", "#brief"]]],
              ["Services", [["Long-form editing", "#craft"], ["Shorts & reels", "#craft"], ["Thumbnails", "#craft"], ["Color & sound", "#craft"], ["Captions", "#craft"]]],
              ["Connect", [["hello@orcavx.com", "mailto:hello@orcavx.com"], ["Instagram", "https://www.instagram.com"], ["LinkedIn", "https://www.linkedin.com"], ["YouTube", "https://www.youtube.com"], ["X / Twitter", "https://x.com"]]],
            ].map(([title, links]) => (
              <div key={title as string} className="md:col-span-2">
                <p className="mb-5 text-xs uppercase tracking-[0.3em] text-primary">{title as string}</p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {(links as string[][]).map(([l, h]) => (
                    <li key={l}><a href={h} className="group inline-flex items-center gap-2 transition-colors hover:text-foreground"><span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3" />{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-20 grid gap-6 border-y border-border py-8 text-sm text-muted-foreground md:grid-cols-3">
            <p><span className="text-foreground">Hours</span> · Mon–Sat, 9am–7pm IST</p>
            <p><span className="text-foreground">Turnaround</span> · 24–72h, worldwide clients</p>
            <p><span className="text-foreground">Response</span> · Replies within 24 hours</p>
          </div>

          <p className="pointer-events-none select-none py-6 text-center font-display text-[18vw] font-extrabold leading-none text-stroke opacity-30 md:text-[14rem]">ORCAVX</p>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-8 text-xs text-muted-foreground md:flex-row">
            <span>© {new Date().getFullYear()} OrcaVX Media · All rights reserved</span>
            <div className="flex gap-6">
              <a href="#brief" className="hover:text-primary">Privacy</a>
              <a href="#brief" className="hover:text-primary">Terms</a>
              <a href="#brief" className="hover:text-primary">Refund policy</a>
            </div>
            <a href="#top" className="group flex items-center gap-2 hover:text-primary">Back to surface <Fin className="h-4 w-4 transition-transform group-hover:-translate-y-1" /></a>
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
        <img src={src} alt={label} loading="lazy" className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute bottom-4 left-4 flex translate-y-4 items-center gap-2 text-xs uppercase tracking-widest opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <Fin className="h-4 w-4 text-primary" /> View
        </span>
      </div>
      <figcaption className="mt-3 flex justify-between text-xs uppercase tracking-widest text-muted-foreground">
        <span>{label}</span><span>OrcaVX</span>
      </figcaption>
    </figure>
  );
}
