import { useState, useEffect, type FormEvent, type ReactNode } from "react";
import poster1 from "@/assets/work/img_p8_1.png";
import poster2 from "@/assets/work/img_p8_2.png";
import poster3 from "@/assets/work/img_p8_3.png";
import { TheRoute } from "./RouteSection";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

function Fin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden>
      <path d="M8 58c10-2 18-10 22-22C34 22 40 10 52 4c-4 12-4 26 0 40 2 6 4 10 4 14H8z" />
    </svg>
  );
}

function Head({ h }: { n?: string; title?: string; h: ReactNode }) {
  return (
    <div className="reveal mb-16">
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
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setOn(true)}
          className="absolute inset-0"
          aria-label={`Play ${title}`}
        >
          <img
            src={poster}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-abyss/90 to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform duration-500 group-hover:scale-125">
            ▶
          </span>
          <span className="absolute bottom-4 left-4 text-xs uppercase tracking-widest">
            {title}
          </span>
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
  [
    "What if I'm not happy with an edit?",
    "Every plan includes revisions; we iterate until it's right.",
  ],
  [
    "Do you write scripts or hooks?",
    "We suggest hooks and titles with every delivery on Apex and Megalodon.",
  ],
];

export function PressPlay() {
  return (
    <section id="reels" className="relative bg-deep py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <Head
          n="Proof"
          title="Now Playing"
          h={
            <>
              Press <span className="text-gradient">play</span>.
            </>
          }
        />
        <p className="-mt-8 mb-12 max-w-xl text-base text-muted-foreground">
          A quick showreel so people see proof within the first scroll. Raw footage transformed into
          scroll-stopping stories.
        </p>
        <div className="reveal mb-6">
          {videos.slice(0, 1).map((v) => (
            <YT key={v.id} {...v} />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {videos.slice(1).map((v) => (
            <div key={v.id} className="reveal">
              <YT {...v} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { TheRoute } from "./RouteSection";

export function ComparisonTable() {
  return (
    <section id="compare" className="relative bg-deep pt-8 pb-14 md:pt-12 md:pb-20">
      <div className="mx-auto max-w-7xl px-6 md:pr-20">
        <Head
          n="Side by side"
          title="Compare plans"
          h={
            <>
              Size up the <span className="text-gradient">pod</span>.
            </>
          }
        />
        <p className="-mt-10 mb-10 max-w-xl text-base text-muted-foreground">
          Compare every tier feature-by-feature directly under the plans so nobody has to hunt for
          details.
        </p>
        <div className="reveal overflow-x-auto rounded-3xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-background/60">
                <th className="p-5 font-normal text-muted-foreground">Feature</th>
                {["Pod", "Apex", "Megalodon"].map((p, i) => (
                  <th
                    key={p}
                    className={`p-5 font-display text-xl ${
                      i === 1 ? "bg-primary/10 text-primary" : ""
                    }`}
                  >
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([f, ...v]) => (
                <tr
                  key={f}
                  className="border-b border-border transition-colors last:border-0 hover:bg-primary/5"
                >
                  <td className="p-5 text-muted-foreground">{f}</td>
                  {v.map((x, i) => (
                    <td
                      key={i}
                      className={`p-5 ${i === 1 ? "bg-primary/10" : ""} ${
                        x === "✓" ? "text-accent" : ""
                      }`}
                    >
                      {x}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 pt-12 pb-10 md:pt-16 md:pb-14">
      <Head
        n="Sonar"
        title="Questions"
        h={
          <>
            Echoes<span className="text-primary">.</span>
          </>
        }
      />
      <p className="-mt-10 mb-10 text-center text-base text-muted-foreground">
        Answers to the last doubts right after pricing, where decisions are made.
      </p>
      <div className="divide-y divide-border border-y border-border">
        {faqs.map(([q, a], i) => (
          <div key={q} className="reveal">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between py-6 text-left font-display text-xl transition-colors hover:text-primary"
            >
              {q}
              <span
                className={`text-primary transition-transform duration-300 ${
                  open === i ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-500 ${
                open === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
              }`}
            >
              <p className="overflow-hidden text-muted-foreground">{a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const servicesOptions = [
  { value: "All Services (Long Form, Shorts, Thumbnails)", label: "All Services (Long Form, Shorts, Thumbnails)" },
  { value: "Long-Form Video Editing", label: "Long-Form Video Editing" },
  { value: "Short-Form Clips & Reels", label: "Short-Form Clips & Reels" },
  { value: "Thumbnail Design & Packaging", label: "Thumbnail Design & Packaging" },
  { value: "Complete Channel Retainer", label: "Complete Channel Retainer" },
];

const videoStyleOptions = [
  { value: "All / Dynamic Multi-cam", label: "All / Dynamic Multi-cam" },
  { value: "Talking Head / Presenter", label: "Talking Head / Presenter" },
  { value: "Cinematic Documentary Narrative", label: "Cinematic Documentary Narrative" },
  { value: "High-Energy Kinetic Cut", label: "High-Energy Kinetic Cut" },
  { value: "Screencast & Tutorial", label: "Screencast & Tutorial" },
  { value: "Product Showcase Film", label: "Product Showcase Film" },
];

const industryOptions = [
  { value: "Select industry...", label: "Select industry..." },
  { value: "Healthcare & Medical", label: "Healthcare & Medical" },
  { value: "Legal & Law Firms", label: "Legal & Law Firms" },
  { value: "Finance & Wealth Advisory", label: "Finance & Wealth Advisory" },
  { value: "Luxury Real Estate", label: "Luxury Real Estate" },
  { value: "Tech, SaaS & AI", label: "Tech, SaaS & AI" },
  { value: "Executive & Personal Brand", label: "Executive & Personal Brand" },
  { value: "Other", label: "Other" },
];

const packageOptions = [
  { value: "Select package / plan...", label: "Select package / plan..." },
  { value: "Pod Plan ($999/mo)", label: "Pod Plan ($999/mo)" },
  { value: "Apex Plan ($1,899/mo)", label: "Apex Plan ($1,899/mo)" },
  { value: "Megalodon Plan ($2,399/mo)", label: "Megalodon Plan ($2,399/mo)" },
  { value: "Custom Post-Production", label: "Custom Post-Production" },
];

interface CustomSelectProps {
  id: string;
  value: string;
  onValueChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

function CustomSelect({
  id,
  value,
  onValueChange,
  options,
  placeholder = "Select an option...",
}: CustomSelectProps) {
  const selectedLabel = options.find((o) => o.value === value)?.label || value || placeholder;

  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        id={id}
        className="group flex h-[48px] w-full items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-foreground outline-none transition-all duration-300 hover:border-sky-400/50 hover:bg-black/50 focus:border-sky-400 focus:bg-black/60 focus:ring-2 focus:ring-sky-400/20 data-[state=open]:border-sky-400 data-[state=open]:ring-2 data-[state=open]:ring-sky-400/20 cursor-pointer text-left"
        aria-label={placeholder}
      >
        <span className="truncate pr-2 font-normal text-foreground">
          {selectedLabel}
        </span>
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 shrink-0 text-sky-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className="relative z-[9999] max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-y-auto overflow-x-hidden rounded-2xl border-2 border-sky-300 bg-white p-1.5 text-blue-950 shadow-[0_16px_36px_rgba(56,189,248,0.22),0_4px_16px_rgba(0,0,0,0.06)] animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-select-content-transform-origin)]"
        >
          <SelectPrimitive.Viewport className="p-1 space-y-0.5">
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className={`relative flex w-full cursor-pointer select-none items-center rounded-xl py-2.5 pl-3.5 pr-8 text-sm outline-none transition-all duration-150 ${
                    isSelected
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-blue-950 font-medium hover:bg-sky-50 hover:text-blue-600 focus:bg-sky-50 focus:text-blue-600"
                  }`}
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute right-2.5 flex h-4 w-4 items-center justify-center text-blue-600">
                    <Check className="h-4 w-4 stroke-[2.5]" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              );
            })}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export function BriefSection() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    services: "All Services (Long Form, Shorts, Thumbnails)",
    videoStyle: "All / Dynamic Multi-cam",
    industry: "Select industry...",
    package: "Select package / plan...",
    message: "",
  });

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("megalodon")) {
        setFormData((prev) => ({ ...prev, package: "Megalodon Pod ($2,399/mo)" }));
      } else if (hash.includes("apex")) {
        setFormData((prev) => ({ ...prev, package: "Apex Pod ($1,899/mo)" }));
      } else if (hash.includes("pod")) {
        setFormData((prev) => ({ ...prev, package: "The Pod ($999/mo)" }));
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = `Name: ${formData.name}
Email: ${formData.email}
Services: ${formData.services}
Video Style: ${formData.videoStyle}
Industry: ${formData.industry}
Package Selection: ${formData.package}

Message / Project Details:
${formData.message}`;

    window.location.href = `mailto:hey@orcavx.com?subject=${encodeURIComponent(
      `Project Brief: ${formData.name || "New Client"}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const inputStyle =
    "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:border-primary focus:bg-black/60 focus:ring-1 focus:ring-primary/40";

  return (
    <section id="brief" className="relative bg-deep pt-10 pb-16 md:pt-14 md:pb-20 overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Direct Contacts */}
          <div className="reveal flex flex-col justify-between lg:col-span-5">
            <div>
              <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Discuss Your Video <span className="text-gradient">Post-Production</span> Needs
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground max-w-md">
                Are you looking for top-quality video post-production tailored to your needs? Reach out to us.
              </p>
            </div>

            {/* Direct Contact Info: Email & Phone */}
            <div className="mt-12 space-y-6">
              {/* Email item */}
              <a
                href="mailto:hey@orcavx.com"
                className="group inline-flex items-center gap-4 transition-opacity hover:opacity-85"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs font-mono uppercase tracking-wider text-muted-foreground">E-mail</span>
                  <span className="text-base font-semibold text-foreground group-hover:underline">
                    hey@orcavx.com
                  </span>
                </div>
              </a>

              {/* Phone item */}
              <a
                href="tel:+917381313929"
                className="group flex items-center gap-4 transition-opacity hover:opacity-85"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs font-mono uppercase tracking-wider text-muted-foreground">Phone number</span>
                  <span className="text-base font-semibold text-foreground group-hover:underline">
                    +91 73813 13929
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form Card */}
          <div className="reveal lg:col-span-7">
            <div className="relative rounded-3xl border border-white/10 bg-card/60 p-6 md:p-8 lg:p-10 shadow-2xl backdrop-blur-xl">
              <form onSubmit={submit} className="space-y-5">
                {/* Row 1: Name & Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="form-name" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Name
                    </label>
                    <input
                      id="form-name"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className={inputStyle}
                      maxLength={100}
                    />
                  </div>
                  <div>
                    <label htmlFor="form-email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Email
                    </label>
                    <input
                      id="form-email"
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={inputStyle}
                      maxLength={255}
                    />
                  </div>
                </div>

                {/* Row 2: Services & Video Style */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="form-services" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Services
                    </label>
                    <CustomSelect
                      id="form-services"
                      value={formData.services}
                      onValueChange={(val) => setFormData((prev) => ({ ...prev, services: val }))}
                      options={servicesOptions}
                    />
                  </div>
                  <div>
                    <label htmlFor="form-video-style" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Video Style
                    </label>
                    <CustomSelect
                      id="form-video-style"
                      value={formData.videoStyle}
                      onValueChange={(val) => setFormData((prev) => ({ ...prev, videoStyle: val }))}
                      options={videoStyleOptions}
                    />
                  </div>
                </div>

                {/* Row 3: Industry & Package Selection */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="form-industry" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Industry
                    </label>
                    <CustomSelect
                      id="form-industry"
                      value={formData.industry}
                      onValueChange={(val) => setFormData((prev) => ({ ...prev, industry: val }))}
                      options={industryOptions}
                    />
                  </div>
                  <div>
                    <label htmlFor="form-package" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Package Selection
                    </label>
                    <CustomSelect
                      id="form-package"
                      value={formData.package}
                      onValueChange={(val) => setFormData((prev) => ({ ...prev, package: val }))}
                      options={packageOptions}
                    />
                  </div>
                </div>

                {/* Row 4: Message / Project Details */}
                <div>
                  <label htmlFor="form-message" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Message / Project Details
                  </label>
                  <textarea
                    id="form-message"
                    required
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your raw footage, camera setup, or specific goals..."
                    className={inputStyle}
                    maxLength={2500}
                  />
                </div>

                {/* Row 5: Action Button as shown in the reference image */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3.5 rounded-full bg-foreground px-6 py-3.5 font-display text-sm font-semibold text-background shadow-xl transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_rgba(0,127,255,0.45)] active:scale-95"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background text-foreground transition-all duration-300 group-hover:bg-primary-foreground group-hover:text-primary group-hover:translate-x-0.5">
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                    <span>{sent ? "Opening your email client…" : "Get a Solution"}</span>
                  </button>
                  {sent && (
                    <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-300">
                      Opening your email client with your project details... If it doesn't open automatically, you can also send directly to{" "}
                      <a href="mailto:hey@orcavx.com" className="font-semibold underline text-white">
                        hey@orcavx.com
                      </a>
                      .
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Backwards-compatible Extra component
export function Extra() {
  return (
    <>
      <PressPlay />
      <TheRoute />
      <ComparisonTable />
      <FaqSection />
      <BriefSection />
    </>
  );
}
