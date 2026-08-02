"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string; // e.g. "12,400+" or "4.9/5"
  duration?: number;
}

/**
 * Counts up to any numeric portion inside a label string, preserving the
 * surrounding characters (commas, "+", "/5", etc).
 */
export function AnimatedCounter({ value, duration = 1600 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(() => value.replace(/\d/g, "0"));

  // Derive stable primitives — do NOT put the regex match array in deps,
  // or every re-render restarts the animation and the number flickers.
  const matched = value.match(/[\d.,]+/);
  const hasDigits = matched !== null;
  const target = matched ? parseFloat(matched[0].replace(/,/g, "")) : 0;
  const isFloat = matched ? matched[0].includes(".") : false;

  useEffect(() => {
    if (!hasDigits) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    let raf = 0;
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const formatted = isFloat
        ? current.toFixed(1)
        : Math.floor(current).toLocaleString("en-US");
      setDisplay(value.replace(/[\d.,]+/, formatted));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target, isFloat, duration, value, hasDigits]);

  return <span ref={ref}>{display}</span>;
}
