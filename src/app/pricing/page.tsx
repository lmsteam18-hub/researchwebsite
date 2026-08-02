import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { PricingCalculator } from "@/components/pricing/pricing-calculator";
import { FaqAccordion } from "@/components/faq-accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { faqs } from "@/config/content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent, per-project pricing for academic research support. Use the instant calculator — pricing adjusts to service, academic level, deadline, pages and subject complexity.",
};

const factors = [
  { label: "Academic level", detail: "Secondary through PhD" },
  { label: "Deadline & urgency", detail: "12 hours to 1 month+" },
  { label: "Number of pages", detail: "≈275 words per page" },
  { label: "Service type", detail: "20+ specialised services" },
  { label: "Subject complexity", detail: "100+ disciplines" },
  { label: "Optional add-ons", detail: "Reports & premium consultants" },
];

export default function PricingPage() {
  const paymentFaqs = faqs.filter((f) =>
    ["Payment", "Refund Policy", "Revisions", "Delivery Time"].includes(f.category),
  );

  return (
    <>
      <PageHeader
        eyebrow="Transparent pricing"
        title={<>Pay for exactly <span className="text-gradient">what you need</span></>}
        description="No subscriptions, no hidden fees. Your price is calculated live from a few simple inputs."
      />

      <Container className="pb-16">
        <div className="mx-auto max-w-5xl">
          <PricingCalculator />
        </div>

        {/* Factors */}
        <div className="mt-16">
          <h2 className="text-center font-display text-2xl font-bold">What affects your price?</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {factors.map((f) => (
              <Card key={f.label} className="flex items-start gap-3 p-5">
                <Check className="mt-0.5 size-5 shrink-0 text-success" />
                <div>
                  <p className="font-medium">{f.label}</p>
                  <p className="text-sm text-muted-foreground">{f.detail}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Guarantee band */}
        <Card glass className="mt-16 flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="font-display text-xl font-bold">Every order is protected</h3>
            <p className="mt-1 text-muted-foreground">
              Money-back guarantee, free revisions, secure escrow and total confidentiality.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/order">Start your project</Link>
          </Button>
        </Card>

        {/* FAQ */}
        <div className="mx-auto mt-20 max-w-3xl">
          <h2 className="text-center font-display text-2xl font-bold">Pricing & payment FAQ</h2>
          <div className="mt-8">
            <FaqAccordion items={paymentFaqs} />
          </div>
        </div>
      </Container>
    </>
  );
}
