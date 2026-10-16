import { useState, type FormEvent, type ReactNode } from "react";
import poster1 from "@/assets/work/img_p8_1.png";
import poster2 from "@/assets/work/img_p8_2.png";
import poster3 from "@/assets/work/img_p8_3.png";

function Fin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden>
      <path d="M8 58c10-2 18-10 22-22C34 22 40 10 52 4c-4 12-4 26 0 40 2 6 4 10 4 14H8z" />
    </svg>
  );
}

function Head({ n, title, h }: { n: string; title: string; h: ReactNode }) {
  return (
    <div className="reveal mb-16">
      <div className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">
        <Fin className="h-4 w-4 text-primary" /><span>{n}</span><span className="h-px w-16 bg-border" /><span className="text-foreground">{title}</span>
      </div>
      <h2 className="font-display text-5xl font-bold md:text-7xl">{h}</h2>
    </div>
  );
}

// Placeholder videos — replace with OrcaVX YouTube IDs
const videos = [
  { id: "aqz-KE-bpKQ", title: "Long-form edit", poster: poster1 },
  { id: "eRsGyueVLvQ", title: "Story cut", poster: poster2 },
  { id: "R6MlUcmOul8", title: "Color & sound", poster: poster3 },
];

function YT({ id, title, poster }: { id: string; title: string; poster: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-card">
      {on ? (
        <iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`} title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      ) : (
        <button onClick={() => setOn(true)} className="absolute inset-0" aria-label={`Play ${title}`}>
          <img src={poster} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <span className="absolute inset-0 bg-gradient-to-t from-abyss/90 to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform duration-500 group-hover:scale-125">▶</span>
          <span className="absolute bottom-4 left-4 text-xs uppercase tracking-widest">{title}</span>
        </button>
      )}
    </div>
  );
}

const rows: [string, string, string, string][] = [
  ["Long-form videos / mo", "2", "4", "8"],
  ["Short-form videos / mo", "12", "16", "28"],
  ["Thumbnails / mo", "14", "20", "36"],
  ["Max resolution", "1080p", "1080p", "4K"],
  ["Edit styles", "2", "All 4", "All 4"],
  ["Subtitles & show notes", "—", "✓", "✓"],
  ["Multi-ratio export pack", "—", "✓", "✓"],
  ["Color grading", "Basic", "Standard", "Cinematic"],
  ["Revisions", "2 / video", "3 / video", "Unlimited"],
  ["Turnaround", "48–72h", "48h", "24h rush"],
  ["Dedicated editor", "—", "✓", "✓ + strategist"],
  ["Price / mo", "$999", "$1,899", "$2,399"],
];

const steps = [
  ["Drop", "Upload raw footage to your shared folder."],
  ["Hunt", "We find the story, hook and pacing."],
  ["Craft", "Edit, color, sound, captions, thumbnails."],
  ["Surface", "Review, revise, publish-ready files."],
];

const faqs = [
  ["How do I send footage?", "Via a shared Google Drive or Dropbox folder we set up on day one."],
  ["Can I change plans?", "Yes — upgrade or downgrade any month."],
  ["What if I'm not happy with an edit?", "Every plan includes revisions; we iterate until it's right."],
  ["Do you write scripts or hooks?", "We suggest hooks and titles with every delivery on Apex and Megalodon."],
];

export function Extra() {
  const [open, setOpen] = useState<number | null>(0);
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = ["name", "email", "industry", "plan", "message"].map((k) => `${k}: ${f.get(k) ?? ""}`).join("\n");
    window.location.href = `mailto:hello@orcavx.com?subject=${encodeURIComponent("New project brief")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const input = "w-full rounded-xl border border-border bg-background/60 px-5 py-4 outline-none transition-all focus:border-primary focus:shadow-glow";

  return (
    <>
      <section id="reels" className="relative bg-deep py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <Head n="Interlude" title="Now Playing" h={<>Press <span className="text-gradient">play</span>.</>} />
          <div className="reveal mb-6">{videos.slice(0, 1).map((v) => <YT key={v.id} {...v} />)}</div>
          <div className="grid gap-6 md:grid-cols-2">
            {videos.slice(1).map((v) => <div key={v.id} className="reveal"><YT {...v} /></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <Head n="Migration" title="How it works" h={<>The <span className="text-stroke">route</span>.</>} />
        <div className="grid gap-6 md:grid-cols-4">
          {steps.map(([t, d], i) => (
            <div key={t} className="reveal group rounded-3xl border border-border bg-card/40 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary" style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="font-display text-6xl font-bold text-primary/30 transition-colors group-hover:text-primary">0{i + 1}</p>
              <h3 className="mt-6 font-display text-2xl font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="compare" className="relative bg-deep py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6 md:pr-20">
          <Head n="Side by side" title="Compare plans" h={<>Size up the <span className="text-gradient">pod</span>.</>} />
          <div className="reveal overflow-x-auto rounded-3xl border border-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-background/60">
                  <th className="p-5 font-normal text-muted-foreground">Feature</th>
                  {["Pod", "Apex", "Megalodon"].map((p, i) => (
                    <th key={p} className={`p-5 font-display text-xl ${i === 1 ? "bg-primary/10 text-primary" : ""}`}>{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([f, ...v]) => (
                  <tr key={f} className="border-b border-border transition-colors last:border-0 hover:bg-primary/5">
                    <td className="p-5 text-muted-foreground">{f}</td>
                    {v.map((x, i) => <td key={i} className={`p-5 ${i === 1 ? "bg-primary/10" : ""} ${x === "✓" ? "text-accent" : ""}`}>{x}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
        <Head n="Sonar" title="Questions" h={<>Echoes<span className="text-primary">.</span></>} />
        <div className="divide-y divide-border border-y border-border">
          {faqs.map(([q, a], i) => (
            <div key={q} className="reveal">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between py-6 text-left font-display text-xl transition-colors hover:text-primary">
                {q}<span className={`text-primary transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                <p className="overflow-hidden text-muted-foreground">{a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="brief" className="relative bg-deep py-24 md:py-36">
        <div className="absolute inset-0 bg-glow opacity-40" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:pr-20">
          <Head n="Signal" title="Start a project" h={<>Send a <span className="text-stroke">brief</span>.</>} />
          <form onSubmit={submit} className="reveal space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input required name="name" placeholder="Your name" className={input} maxLength={100} />
              <input required type="email" name="email" placeholder="Email" className={input} maxLength={255} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <select name="industry" className={input} defaultValue="Healthcare">
                {["Healthcare", "Legal", "Finance", "Real Estate", "Other"].map((o) => <option key={o}>{o}</option>)}
              </select>
              <select name="plan" className={input} defaultValue="Apex">
                {["Pod", "Apex", "Megalodon", "Not sure"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <textarea required name="message" rows={5} placeholder="Tell us about your content…" className={input} maxLength={2000} />
            <button className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105">
              {sent ? "Opening your email…" : "Send brief"} <Fin className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
