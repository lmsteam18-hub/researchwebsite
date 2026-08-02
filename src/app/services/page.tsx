import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { services, serviceCategories } from "@/config/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore 20+ academic research support services — proposals, dissertations, data analysis (SPSS, R, Python), proofreading, editing, publication support and more.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title={<>Expert support for <span className="text-gradient">every stage</span></>}
        description="Pick a single service or combine several. Every project is matched to a vetted consultant in your discipline."
      >
        <Button asChild size="lg">
          <Link href="/order">Start a project</Link>
        </Button>
      </PageHeader>

      <Container className="pb-24">
        {serviceCategories.map((category) => (
          <section key={category} className="mt-16 first:mt-0">
            <h2 className="font-display text-2xl font-bold tracking-tight">{category}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services
                .filter((s) => s.category === category)
                .map((service, i) => {
                  const Icon = service.icon;
                  return (
                    <Reveal key={service.slug} delay={i % 3}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft card-hover"
                      >
                        {service.popular && (
                          <Badge variant="soft" className="absolute right-5 top-5">Popular</Badge>
                        )}
                        <span className="grid size-12 place-items-center rounded-xl bg-brand-gradient-soft text-brand-600 dark:text-brand-300">
                          <Icon className="size-6" />
                        </span>
                        <h3 className="mt-4 flex items-center gap-1 font-display text-lg font-semibold">
                          {service.title}
                          <ArrowUpRight className="size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                        <ul className="mt-4 space-y-1.5">
                          {service.features.slice(0, 3).map((f) => (
                            <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Check className="size-4 shrink-0 text-success" /> {f}
                            </li>
                          ))}
                        </ul>
                      </Link>
                    </Reveal>
                  );
                })}
            </div>
          </section>
        ))}
      </Container>
    </>
  );
}
