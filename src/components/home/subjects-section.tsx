import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { subjects } from "@/config/subjects";

export function SubjectsSection() {
  return (
    <section id="subjects" className="section bg-muted/40">
      <Container>
        <SectionHeading
          eyebrow="100+ disciplines"
          title={<>Specialists across <span className="text-gradient">every field</span></>}
          description="Whatever your discipline, we'll match you with a consultant who understands its methods, standards and conventions."
        />

        <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
          {subjects.map((subject, i) => (
            <Reveal as="li" key={subject.name} delay={i % 10}>
              <span className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium shadow-sm transition-colors hover:border-brand-300 hover:text-brand-600">
                <span aria-hidden>{subject.emoji}</span>
                {subject.name}
              </span>
            </Reveal>
          ))}
          <Reveal as="li" delay={10}>
            <span className="flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-soft">
              + 80 more
            </span>
          </Reveal>
        </ul>

        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link href="/order">Don&apos;t see your field? Tell us about it</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
