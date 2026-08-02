import { Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials, type Testimonial } from "@/config/content";

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
      <Quote className="size-6 text-brand-300" />
      <div className="mt-2 flex gap-0.5">
        {Array.from({ length: t.rating }).map((_, j) => (
          <Star key={j} className="size-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <blockquote className="mt-3 line-clamp-4 text-sm leading-relaxed text-foreground/90">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">
          {t.avatar}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{t.name}</p>
          <p className="truncate text-xs text-muted-foreground">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse }: { items: Testimonial[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="group flex overflow-hidden py-2">
      <div
        className="flex w-max gap-5 pr-5 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {doubled.map((t, i) => (
          <Card key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const rowA = testimonials.slice(0, half);
  const rowB = testimonials.slice(half);

  return (
    <section id="testimonials" className="section bg-muted/40">
      <Container>
        <SectionHeading
          eyebrow="Loved by students & researchers"
          title={<>Success stories from <span className="text-gradient">across the diaspora</span></>}
          description="Real outcomes from students and researchers we've supported — from first-year undergraduates to published academics."
        />
      </Container>

      {/* Full-bleed marquee rows (hover to pause) */}
      <div className="mask-fade-x mt-14 space-y-2">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  );
}
