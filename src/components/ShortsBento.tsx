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
  featured?: boolean;
}

const SHORTS: ShortItem[] = [
  {
    id: "short-1",
    title: "Retention Hook & Viral Pacing",
    tag: "Featured Short",
    duration: "0:42",
    label: "No. 01",
    src: s1,
    featured: true,
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
    tag: "Sound",
    duration: "0:55",
    label: "No. 03",
    src: s3,
  },
  {
    id: "short-4",
    title: "Cinematic Color Grade Pop",
    tag: "Color",
    duration: "0:28",
    label: "No. 04",
    src: s3,
  },
];

export function ShortsBento() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 h-auto lg:h-[410px]">
      {SHORTS.map((item) => {
        const isFeatured = item.featured;

        return (
          <div
            key={item.id}
            className={`group relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-[#0A1324] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(0,194,255,0.25)] cursor-pointer h-[280px] sm:h-[340px] md:h-[380px] lg:h-full ${
              isFeatured
                ? "col-span-2 lg:col-span-2"
                : "col-span-1 lg:col-span-1"
            }`}
          >
            {/* Background Thumbnail Image */}
            <img
              src={item.src}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />

            {/* Depth Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030814]/90 via-[#030814]/20 to-transparent transition-opacity duration-300" />

            {/* Top Badges */}
            <div className="pointer-events-none absolute top-2.5 left-2.5 right-2.5 sm:top-3.5 sm:left-3.5 sm:right-3.5 flex items-center justify-between z-10">
              <span className="rounded-full border border-white/15 bg-black/50 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white/90">
                {item.tag}
              </span>
              <span className="rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-mono text-white/70">
                {item.duration}
              </span>
            </div>

            {/* Center Play Button with hover micro-interaction */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
              <span
                className={`flex items-center justify-center rounded-full bg-primary/90 text-primary-foreground backdrop-blur-sm shadow-glow transition-transform duration-300 ease-out group-hover:scale-110 ${
                  isFeatured
                    ? "h-11 w-11 sm:h-13 sm:w-13 md:h-14 md:w-14"
                    : "h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11"
                }`}
              >
                <Play
                  className={`fill-current ml-0.5 ${
                    isFeatured ? "h-5 w-5 sm:h-6 sm:w-6" : "h-4 w-4 sm:h-4.5 sm:w-4.5"
                  }`}
                />
              </span>
            </div>

            {/* Bottom Caption & Label */}
            <div className="pointer-events-none absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 z-10">
              <p
                className={`font-display font-semibold text-white drop-shadow-sm ${
                  isFeatured
                    ? "text-sm sm:text-base md:text-lg line-clamp-1 sm:line-clamp-2"
                    : "text-xs sm:text-sm line-clamp-1"
                }`}
              >
                {item.title}
              </p>
              <div className="mt-0.5 sm:mt-1 flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-widest text-muted-foreground">
                <span>{item.label}</span>
                <span className="text-primary font-medium">OrcaVX</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
