"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BarChart3, GraduationCap, Star } from "lucide-react";

/**
 * Human, student-centred hero visual: a real photo of a student at work,
 * framed with a gradient ring and premium floating glass stat chips.
 * The portrait tilts subtly toward the cursor (disabled on touch).
 */
export function HeroIllustration() {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 150, damping: 18 });

  function onMove(e: React.MouseEvent) {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[500px] [perspective:1200px]"
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {/* Ambient gradient glow behind the portrait */}
      <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-brand-gradient opacity-25 blur-3xl" />

      {/* Portrait card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/50 shadow-glass-lg dark:border-white/10"
      >
        <Image
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80"
          alt="A student working on their research at a laptop"
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 500px"
          className="object-cover"
        />
        {/* Brand tint + bottom gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 via-transparent to-transparent" />
        <div className="absolute inset-0 mix-blend-soft-light bg-brand-gradient opacity-20" />
      </motion.div>

      {/* Floating chip: rating (top-left) */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 top-10 flex items-center gap-2.5 rounded-2xl bg-white/90 px-4 py-3 shadow-glass backdrop-blur-md dark:bg-zinc-900/90"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/20">
          <Star className="size-4 fill-current" />
        </span>
        <div>
          <p className="text-sm font-bold leading-none">4.9/5</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">2,300+ reviews</p>
        </div>
      </motion.div>

      {/* Floating chip: analysis (right) */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute -right-4 top-1/3 flex items-center gap-2.5 rounded-2xl bg-white/90 px-4 py-3 shadow-glass backdrop-blur-md dark:bg-zinc-900/90"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-accent-100 text-accent-600 dark:bg-accent-500/20">
          <BarChart3 className="size-4" />
        </span>
        <div>
          <p className="text-sm font-bold leading-none">SPSS ready</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">p &lt; 0.05 · significant</p>
        </div>
      </motion.div>

      {/* Floating chip: approved (bottom-left) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute -left-5 bottom-12 flex items-center gap-2.5 rounded-2xl bg-white/90 px-4 py-3 shadow-glass backdrop-blur-md dark:bg-zinc-900/90"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-brand-gradient text-white">
          <GraduationCap className="size-4" />
        </span>
        <div>
          <p className="text-sm font-bold leading-none">Approved</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">on first submission</p>
        </div>
      </motion.div>
    </div>
  );
}
