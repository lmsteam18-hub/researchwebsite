import { Container } from "@/components/ui/container";
import { universityLogos } from "@/config/content";

export function TrustMarquee() {
  const items = [...universityLogos, ...universityLogos];
  return (
    <section aria-label="Institutions our members study at" className="py-12">
      <Container>
        <p className="text-center text-sm font-medium text-muted-foreground">
          Supporting students and researchers at leading institutions
        </p>
        <div className="mask-fade-x relative mt-6 overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-10">
            {items.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex shrink-0 items-center gap-2 text-base font-semibold text-muted-foreground/70"
              >
                <span className="grid size-8 place-items-center rounded-lg bg-brand-gradient-soft text-brand-600">
                  {name.charAt(0)}
                </span>
                {name}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
