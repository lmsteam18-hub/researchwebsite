import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { siteConfig } from "@/config/site";

export function Stats() {
  return (
    <section className="py-8">
      <Container>
        <div className="glass-strong grid grid-cols-2 gap-6 rounded-3xl p-8 sm:p-10 lg:grid-cols-4">
          {siteConfig.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i}>
              <div className="text-center">
                <p className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  <span className="text-gradient">
                    <AnimatedCounter value={stat.value} />
                  </span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
