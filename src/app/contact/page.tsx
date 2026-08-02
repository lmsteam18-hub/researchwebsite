import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${siteConfig.name} team. We reply within one business day, or chat with us instantly on WhatsApp.`,
};

export default function ContactPage() {
  const whatsapp = `https://wa.me/${siteConfig.contact.whatsapp}`;
  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title={<>We&apos;d love to <span className="text-gradient">hear from you</span></>}
        description="Questions about a project, pricing, or becoming a consultant? Reach out and we'll respond quickly."
      />

      <Container className="pb-24">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
              { icon: Phone, label: "Phone", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone}` },
              { icon: MessageCircle, label: "WhatsApp", value: "Chat instantly", href: whatsapp },
              { icon: MapPin, label: "Office", value: siteConfig.contact.address },
              { icon: Clock, label: "Hours", value: "Mon–Sat, 8am–8pm WAT" },
            ].map((item) => {
              const Icon = item.icon;
              const content = (
                <Card className="flex items-center gap-4 p-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-gradient-soft text-brand-600 dark:text-brand-300">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </Card>
              );
              return item.href ? (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block transition-transform hover:-translate-y-0.5">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>

          <Card className="p-6 sm:p-8 lg:col-span-3">
            <h2 className="font-display text-xl font-bold">Send us a message</h2>
            <p className="mt-1 mb-6 text-sm text-muted-foreground">We reply within one business day.</p>
            <ContactForm />
          </Card>
        </div>
      </Container>
    </>
  );
}
