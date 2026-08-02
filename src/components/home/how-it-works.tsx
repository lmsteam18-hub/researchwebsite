import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { howItWorks } from "@/config/content";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title={<>From brief to brilliance in <span className="text-gradient">four steps</span></>}
          description="A transparent, guided process designed to keep you informed and in control at every stage."
        />

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent lg:block" />

          <ol className="grid gap-8 lg:grid-cols-4">
            {howItWorks.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal as="li" key={step.title} delay={i} className="relative">
                  <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                    <span className="relative z-10 grid size-16 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                      <Icon className="size-7" />
                      <span className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full bg-white text-xs font-bold text-brand-600 shadow dark:bg-zinc-900">
                        {i + 1}
                      </span>
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
