import { useState, useEffect, useRef, type FormEvent, type ReactNode } from "react";
import { TheRoute } from "./RouteSection";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

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

/**
 * Converts any standard YouTube link (watch URL, youtu.be short URL, or embed URL) into an embed link.
 * Example input:  "https://www.youtube.com/watch?v=6kYRUsXtS4s"
 * Example output: "https://www.youtube-nocookie.com/embed/6kYRUsXtS4s"
 */
export function createYouTubeEmbedUrl(urlOrId: string): string {
  if (!urlOrId) return "";
  if (urlOrId.includes("/embed/")) {
    return urlOrId.replace("youtube.com/embed/", "youtube-nocookie.com/embed/");
  }
  const match = urlOrId.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  const id = match ? match[1] : urlOrId;
  return `https://www.youtube-nocookie.com/embed/${id}`;
}

// Single featured showreel video configuration
// Example YouTube Watch Link: https://www.youtube.com/watch?v=6kYRUsXtS4s
// Created Embed Link:        https://www.youtube-nocookie.com/embed/6kYRUsXtS4s
export const featuredVideo = {
  title: "OrcaVX Media — Video Editing & Post-Production Showreel",
  youtubeUrl: "https://www.youtube.com/watch?v=6kYRUsXtS4s",
  embedUrl: createYouTubeEmbedUrl("https://www.youtube.com/watch?v=6kYRUsXtS4s"),
};

export function VideoEmbed({
  embedUrl,
  title,
}: {
  embedUrl: string;
  title: string;
}) {
  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl md:rounded-[28px] border-2 md:border-[3px] border-white/95 bg-transparent shadow-[0_0_50px_rgba(255,255,255,0.07),0_25px_60px_rgba(0,0,0,0.6)] [isolation:isolate] transform-gpu transition-all duration-300">
      <iframe
        className="h-full w-full border-0 scale-[1.015] md:scale-[1.02] transform-gpu origin-center"
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

// Backward-compatible alias
export const YT = VideoEmbed;

// Backward-compatible array with single video
export const videos = [
  {
    id: "6kYRUsXtS4s",
    title: featuredVideo.title,
    embedUrl: featuredVideo.embedUrl,
  },
];

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
        <div className="reveal">
          <VideoEmbed
            embedUrl={featuredVideo.embedUrl}
            title={featuredVideo.title}
          />
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
          <div
            key={q}
            className="reveal group"
            onMouseEnter={() => setOpen(i)}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              onFocus={() => setOpen(i)}
              aria-expanded={open === i}
              className={`flex w-full items-center justify-between py-6 text-left font-display text-xl transition-colors duration-200 ${
                open === i ? "text-primary" : "text-foreground group-hover:text-primary"
              }`}
            >
              <span>{q}</span>
              <span
                className={`text-primary text-2xl font-light leading-none transition-transform duration-300 ease-out select-none ${
                  open === i ? "rotate-45" : "rotate-0"
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <p
                  className={`pt-1 pb-6 text-base leading-relaxed text-muted-foreground transition-all duration-300 ease-out ${
                    open === i ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                  }`}
                >
                  {a}
                </p>
              </div>
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
  highlight?: boolean;
}

function CustomSelect({
  id,
  value,
  onValueChange,
  options,
  placeholder = "Select an option...",
  highlight = false,
}: CustomSelectProps) {
  const selectedLabel = options.find((o) => o.value === value)?.label || value || placeholder;

  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        id={id}
        className={`group flex h-[48px] w-full items-center justify-between rounded-xl border bg-black/40 px-4 py-3.5 text-sm text-foreground outline-none transition-all duration-300 hover:border-sky-400/50 hover:bg-black/50 focus:border-sky-400 focus:bg-black/60 focus:ring-2 focus:ring-sky-400/20 data-[state=open]:border-sky-400 data-[state=open]:ring-2 data-[state=open]:ring-sky-400/20 cursor-pointer text-left ${
          highlight
            ? "border-sky-400 ring-2 ring-sky-400/40 shadow-[0_0_24px_rgba(56,189,248,0.35)]"
            : "border-white/10"
        }`}
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const notificationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    services: "All Services (Long Form, Shorts, Thumbnails)",
    videoStyle: "All / Dynamic Multi-cam",
    industry: "Select industry...",
    package: "Select package / plan...",
    message: "",
  });

  const [highlightPackage, setHighlightPackage] = useState(false);

  useEffect(() => {
    return () => {
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const applyPlanFromIdentifier = (identifier: string) => {
      if (!identifier) return;
      const lower = identifier.toLowerCase();
      let matchedPackage = "";
      if (lower.includes("megalodon")) {
        matchedPackage = "Megalodon Plan ($2,399/mo)";
      } else if (lower.includes("apex")) {
        matchedPackage = "Apex Plan ($1,899/mo)";
      } else if (lower.includes("pod")) {
        matchedPackage = "Pod Plan ($999/mo)";
      }

      if (matchedPackage) {
        setFormData((prev) => ({ ...prev, package: matchedPackage }));
        setHighlightPackage(true);
        setTimeout(() => setHighlightPackage(false), 2400);
      }
    };

    const checkHash = () => {
      if (window.location.hash) {
        applyPlanFromIdentifier(window.location.hash);
      }
    };

    const handleCustomPlanSelect = (e: Event) => {
      const customEvt = e as CustomEvent<{ plan?: string }>;
      if (customEvt.detail?.plan) {
        applyPlanFromIdentifier(customEvt.detail.plan);
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    window.addEventListener("orcavx:select-plan", handleCustomPlanSelect);

    return () => {
      window.removeEventListener("hashchange", checkHash);
      window.removeEventListener("orcavx:select-plan", handleCustomPlanSelect);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      to_email: "hey@orcavx.com",
      recipient_email: "hey@orcavx.com",
      name: formData.name,
      from_name: formData.name,
      user_name: formData.name,
      email: formData.email,
      from_email: formData.email,
      user_email: formData.email,
      reply_to: formData.email,
      services: formData.services,
      video_style: formData.videoStyle,
      industry: formData.industry,
      package: formData.package,
      message: formData.message,
      project_summary: `Name: ${formData.name}\nEmail: ${formData.email}\nServices: ${formData.services}\nVideo Style: ${formData.videoStyle}\nIndustry: ${formData.industry}\nPackage: ${formData.package}\nMessage: ${formData.message}`,
    };

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_orcavx";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_orcavx";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (publicKey) {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      } else {
        console.info(
          "EmailJS: To enable live email dispatch to hey@orcavx.com without a backend, set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.",
          templateParams,
        );
      }
    } catch (error) {
      console.warn("EmailJS sending encountered an issue:", error);
    } finally {
      setIsSubmitting(false);

      // Trigger floating bottom notification that automatically disappears in 4.5 seconds
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }
      setShowNotification(true);
      notificationTimerRef.current = setTimeout(() => {
        setShowNotification(false);
      }, 4500);

      // Reset form fields
      setFormData({
        name: "",
        email: "",
        services: "All Services (Long Form, Shorts, Thumbnails)",
        videoStyle: "All / Dynamic Multi-cam",
        industry: "Select industry...",
        package: "Select package / plan...",
        message: "",
      });
    }
  };

  const inputStyle =
    "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all duration-300 focus:border-primary focus:bg-black/60 focus:ring-1 focus:ring-primary/40";

  return (
    <section id="brief" className="relative bg-deep pt-10 pb-16 md:pt-14 md:pb-20 overflow-hidden scroll-mt-20">
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
                      highlight={highlightPackage}
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
                    disabled={isSubmitting}
                    className="group inline-flex items-center gap-3.5 rounded-[5px] bg-foreground px-6 py-3.5 font-display text-sm font-semibold text-background shadow-xl transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_rgba(0,127,255,0.45)] active:scale-95 disabled:opacity-80"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-background text-foreground transition-all duration-300 group-hover:bg-primary-foreground group-hover:text-primary group-hover:translate-x-0.5">
                      {isSubmitting ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
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
                      )}
                    </span>
                    <span>{isSubmitting ? "Sending…" : "Get a Solution"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Toast Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.aside
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-7 left-1/2 z-[9999] -translate-x-1/2 pointer-events-none"
          >
            <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-neutral-950/95 px-5 py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-md">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Check className="h-3 w-3 stroke-[2.5]" />
              </span>
              <span className="text-sm font-medium text-white tracking-wide">
                Sent successfully
              </span>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
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
