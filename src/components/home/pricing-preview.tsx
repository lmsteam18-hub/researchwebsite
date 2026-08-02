import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { PricingCalculator } from "@/components/pricing/pricing-calculator";

export function PricingPreview() {
  return (
    <section id="pricing" className="section bg-muted/40">
      <Container>
        <SectionHeading
          eyebrow="Transparent pricing"
          title={<>Get an <span className="text-gradient">instant quote</span></>}
          description="No hidden fees. Adjust the options and watch your estimate update live. Pay only when you're ready to proceed."
        />
        <Reveal className="mx-auto mt-12 max-w-5xl">
          <PricingCalculator />
        </Reveal>
      </Container>
    </section>
  );
}
