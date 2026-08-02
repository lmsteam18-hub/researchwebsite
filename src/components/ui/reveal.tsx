"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
}

const tags = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
};

/** Scroll-triggered fade-up wrapper, respects reduced-motion via CSS. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const MotionTag = tags[as];
  return (
    <MotionTag
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
