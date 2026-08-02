"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CardSpotlight, spotlightMouseMove } from "@/components/ui/card-spotlight";
import { services, serviceCategories, type ServiceCategory } from "@/config/services";

type Filter = "All" | ServiceCategory;

export function ServicesSection() {
  const [filter, setFilter] = React.useState<Filter>("All");
  const filters: Filter[] = ["All", ...serviceCategories];
  const visible = filter === "All" ? services : services.filter((s) => s.category === filter);

  return (
    <section id="services" className="section">
      <Container>
        <SectionHeading
          eyebrow="20+ specialised services"
          title={<>Everything you need, <span className="text-gradient">expertly supported</span></>}
          description="From your first proposal to your published paper — pick a service or bundle several. Every project is matched to a vetted consultant in your field."
        />

        {/* Category filter */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                filter === f
                  ? "bg-brand-gradient text-white shadow-soft"
                  : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              aria-pressed={filter === f}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.ul
          layout
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {visible.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.li
                key={service.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  onMouseMove={spotlightMouseMove}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft card-hover hover:border-brand-300/70"
                >
                  <CardSpotlight />
                  {service.popular && (
                    <Badge variant="soft" className="absolute right-4 top-4">
                      Popular
                    </Badge>
                  )}
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-gradient-soft text-brand-600 transition-transform group-hover:scale-110 dark:text-brand-300">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 flex items-center gap-1 font-display text-base font-semibold">
                    {service.title}
                    <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {service.short}
                  </p>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
