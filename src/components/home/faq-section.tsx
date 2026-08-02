import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FaqAccordion } from "@/components/faq-accordion";
import { faqs } from "@/config/content";

export function FaqSection() {
  return (
    <section id="faq" className="section">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="Frequently asked questions"
          title={<>Answers, <span className="text-gradient">upfront</span></>}
          description={
            <>
              Can&apos;t find what you&apos;re looking for?{" "}
              <Link href="/contact" className="font-medium text-brand-600 hover:underline dark:text-brand-300">
                Talk to our team
              </Link>
              .
            </>
          }
        />
        <Reveal className="mt-12">
          <FaqAccordion items={faqs} />
        </Reveal>
      </Container>
    </section>
  );
}
