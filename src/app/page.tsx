import { Hero } from "@/components/home/hero";
import { TrustMarquee } from "@/components/home/trust-marquee";
import { Stats } from "@/components/home/stats";
import { ServicesSection } from "@/components/home/services-section";
import { SubjectsSection } from "@/components/home/subjects-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { AiToolsPreview } from "@/components/home/ai-tools-preview";
import { PricingPreview } from "@/components/home/pricing-preview";
import { Testimonials } from "@/components/home/testimonials";
import { SecuritySection } from "@/components/home/security-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />
      <Hero />
      <TrustMarquee />
      <Stats />
      <ServicesSection />
      <SubjectsSection />
      <HowItWorks />
      <AiToolsPreview />
      <PricingPreview />
      <Testimonials />
      <SecuritySection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
