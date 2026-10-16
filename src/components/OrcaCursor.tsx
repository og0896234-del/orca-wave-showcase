import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * A glowing orca fin that trails the cursor with springy physics.
 * Rendered inside <main>; uses fixed positioning + viewport coords,
 * so it follows the pointer regardless of scroll position.
 */
export function OrcaCursor() {
  const x = useSpring(0, { stiffness: 200, damping: 18, mass: 1 });
  const y = useSpring(0, { stiffness: 200, damping: 18, mass: 1 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fine pointer devices only (skip touch screens)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
      style={{ x, y }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2"
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="relative flex items-center justify-center">
          {/* soft glow halo */}
          <div className="absolute h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          {/* trailing rings */}
          <div className="absolute h-10 w-10 rounded-full border border-primary/30" />
          {/* the fin */}
          <svg
            viewBox="0 0 64 64"
            className="h-5 w-5 text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]"
            fill="currentColor"
            aria-hidden
          >
            <path d="M8 58c10-2 18-10 22-22C34 22 40 10 52 4c-4 12-4 26 0 40 2 6 4 10 4 14H8z" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}
