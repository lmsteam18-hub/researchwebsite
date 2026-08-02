"use client";

import * as React from "react";

/**
 * Attach to a card's `onMouseMove` to track the cursor position as CSS vars,
 * then render <CardSpotlight/> inside that card (which must be `relative
 * overflow-hidden group`) for a cursor-following radial glow.
 */
export function spotlightMouseMove(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function CardSpotlight({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${className}`}
      style={{
        background:
          "radial-gradient(240px circle at var(--mx, 50%) var(--my, 0%), rgba(124,77,255,0.16), transparent 65%)",
      }}
    />
  );
}
