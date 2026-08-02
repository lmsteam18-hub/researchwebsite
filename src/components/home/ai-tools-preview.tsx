import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { CardSpotlight, spotlightMouseMove } from "@/components/ui/card-spotlight";
import { aiTools } from "@/config/ai-tools";

export function AiToolsPreview() {
  return (
    <section id="ai-tools" className="section">
      <Container>
        <SectionHeading
          eyebrow="Free productivity tools"
          title={<>Plan smarter with <span className="text-gradient">AI research tools</span></>}
          description="Free planning and productivity aids to help you organise your own research — from topic ideas to citation formatting."
        />

        {/* Academic-integrity note */}
        <Reveal>
          <div className="mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-2xl border border-brand-200/60 bg-brand-50/60 p-4 text-sm text-brand-800 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-200">
            <Info className="mt-0.5 size-5 shrink-0" />
            <p>
              These are <strong>planning and productivity tools</strong> — they help you
              structure and organise your own work. They do not write assignments for
              submission. We uphold a strict academic-integrity policy.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aiTools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <Reveal as="li" key={tool.id} delay={i % 4}>
                <Link
                  href={`/ai-tools#${tool.id}`}
                  onMouseMove={spotlightMouseMove}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft card-hover hover:border-brand-300/70"
                >
                  <CardSpotlight />
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-gradient-soft text-brand-600 dark:text-brand-300">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold">{tool.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {tool.short}
                  </p>
                  <span className="mt-3 flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-300">
                    Try it
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>

        <div className="mt-10 text-center">
          <Button asChild>
            <Link href="/ai-tools">
              Explore all tools <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
