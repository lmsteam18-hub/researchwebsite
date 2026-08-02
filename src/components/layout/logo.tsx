import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)} aria-label={`${siteConfig.name} home`}>
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-brand-gradient shadow-soft">
        {/* Stylised graduation-cap / research mark */}
        <svg viewBox="0 0 24 24" className="size-5 text-white" fill="none" aria-hidden="true">
          <path d="M12 3 2 8l10 5 8-4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 11v4c0 1.1 2.7 3 6 3s6-1.9 6-3v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </span>
      {showText && (
        <span className="font-display text-lg font-bold tracking-tight">
          {siteConfig.name}
        </span>
      )}
    </Link>
  );
}
