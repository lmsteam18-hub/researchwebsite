import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { securityPillars } from "@/config/content";

export function SecuritySection() {
  return (
    <section id="security" className="section">
      <Container>
        <SectionHeading
          eyebrow="Security & trust"
          title={<>Your work is <span className="text-gradient">safe with us</span></>}
          description="Enterprise-grade security and privacy compliance protect your identity, files and payments at every step."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {securityPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={i % 3}>
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-gradient-soft text-brand-600 dark:text-brand-300">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold">{pillar.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{pillar.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
