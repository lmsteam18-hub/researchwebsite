import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { siteConfig } from "@/config/site";

const perks = [
  "Vetted consultants across 100+ disciplines",
  "Transparent pricing with free revisions",
  "Bank-grade security & full confidentiality",
  "Live progress tracking on every order",
];

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh opacity-60" />
      <Container>
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-glass-lg lg:grid-cols-2">
          {/* Brand panel */}
          <div className="relative hidden flex-col justify-between bg-brand-gradient p-10 text-white lg:flex">
            <div className="pointer-events-none absolute inset-0 bg-mesh opacity-30" />
            <div className="relative">
              <Logo />
              <h2 className="mt-10 font-display text-3xl font-bold leading-tight">
                {siteConfig.tagline}
              </h2>
              <ul className="mt-8 space-y-3">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-white/90">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <p className="relative text-sm text-white/70">
              “The support helped me get approval on the first submission.” — Daniel M.
            </p>
          </div>

          {/* Form panel */}
          <div className="p-8 sm:p-10">
            <div className="lg:hidden">
              <Logo />
            </div>
            <h1 className="mt-6 font-display text-2xl font-bold lg:mt-0">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-6">{children}</div>
            <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              <Link href="/" className="hover:text-foreground">← Back to home</Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
