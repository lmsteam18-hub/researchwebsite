import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { services, getService } from "@/config/services";
import { serviceJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const related = services.filter((s) => s.category === service.category && s.slug !== slug).slice(0, 3);
  const jsonLd = serviceJsonLd(slug);

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}

      <section className="relative overflow-hidden pt-32 pb-4 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-radial" />
        <Container>
          <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/services" className="hover:text-foreground">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{service.title}</span>
          </nav>
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="grid size-14 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                <Icon className="size-7" />
              </span>
              <div className="mt-4 flex items-center gap-2">
                <Badge variant="soft">{service.category}</Badge>
                {service.popular && <Badge>Popular</Badge>}
              </div>
              <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">{service.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href={`/order?service=${service.slug}`}>Start a project <ArrowRight className="size-5" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">Estimate the price</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold">What&apos;s included</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                  <Check className="mt-0.5 size-5 shrink-0 text-success" />
                  <span className="text-sm font-medium">{f}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-display text-2xl font-bold">How it works</h2>
            <ol className="mt-6 space-y-4">
              {[
                "Share your brief, files and deadline through the secure order form.",
                `We match you with a vetted ${service.category.toLowerCase()} specialist in your field.`,
                "Collaborate in real time, track milestones and review drafts.",
                "Approve the delivery, download your files and request free revisions.",
              ].map((text, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-muted-foreground">{text}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Card glass className="p-6">
              <p className="text-sm text-muted-foreground">Turn your project around from</p>
              <p className="mt-1 font-display text-3xl font-bold text-gradient">12 hours</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Pricing depends on scope, level and deadline. Get a transparent estimate in seconds.
              </p>
              <Button asChild className="mt-5 w-full">
                <Link href={`/order?service=${service.slug}`}>Get instant quote</Link>
              </Button>
            </Card>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold">Related services</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((r) => {
                const RIcon = r.icon;
                return (
                  <Link
                    key={r.slug}
                    href={`/services/${r.slug}`}
                    className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft card-hover"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-brand-gradient-soft text-brand-600 dark:text-brand-300">
                      <RIcon className="size-5" />
                    </span>
                    <h3 className="mt-3 font-display font-semibold">{r.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{r.short}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
