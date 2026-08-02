"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Minus, Plus, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency } from "@/lib/utils";
import { computeQuote } from "@/lib/pricing";
import { services } from "@/config/services";
import { subjects } from "@/config/subjects";
import { academicLevels, deadlineOptions } from "@/config/pricing";
import { useCurrency } from "@/lib/store";

export function PricingCalculator({ compact = false }: { compact?: boolean }) {
  const { currency } = useCurrency();
  const [serviceSlug, setServiceSlug] = React.useState(services[0].slug);
  const [levelId, setLevelId] = React.useState("undergraduate");
  const [deadlineId, setDeadlineId] = React.useState("7d");
  const [subject, setSubject] = React.useState(subjects[0].name);
  const [pages, setPages] = React.useState(10);
  const [plagiarismReport, setPlagiarism] = React.useState(false);
  const [premiumConsultant, setPremium] = React.useState(false);

  const service = services.find((s) => s.slug === serviceSlug)!;

  const quote = React.useMemo(
    () =>
      computeQuote({
        serviceSlug,
        levelId,
        deadlineId,
        subject,
        pages,
        addons: { plagiarismReport, premiumConsultant },
      }),
    [serviceSlug, levelId, deadlineId, subject, pages, plagiarismReport, premiumConsultant],
  );

  const toDisplay = (ngn: number) => formatCurrency(ngn * currency.rate, currency.code);

  return (
    <Card glass className="overflow-hidden p-0">
      <div className="grid lg:grid-cols-5">
        {/* Inputs */}
        <div className="space-y-6 p-6 sm:p-8 lg:col-span-3">
          <div>
            <Label htmlFor="calc-service">Service</Label>
            <Select
              id="calc-service"
              className="mt-1.5"
              value={serviceSlug}
              onChange={(e) => setServiceSlug(e.target.value)}
            >
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="calc-level">Academic level</Label>
              <Select
                id="calc-level"
                className="mt-1.5"
                value={levelId}
                onChange={(e) => setLevelId(e.target.value)}
              >
                {academicLevels.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="calc-subject">Subject</Label>
              <Select
                id="calc-subject"
                className="mt-1.5"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                {subjects.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.emoji} {s.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Deadline chips */}
          <div>
            <Label>Deadline / urgency</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {deadlineOptions.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDeadlineId(d.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
                    deadlineId === d.id
                      ? "border-transparent bg-brand-gradient text-white shadow-soft"
                      : "border-border text-muted-foreground hover:border-brand-300",
                  )}
                  aria-pressed={deadlineId === d.id}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pages stepper */}
          <div className={cn(!service.perPage && "opacity-50")}>
            <Label htmlFor="calc-pages">
              Number of pages{" "}
              <span className="font-normal text-muted-foreground">
                (≈275 words each)
              </span>
            </Label>
            <div className="mt-2 flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={!service.perPage}
                onClick={() => setPages((p) => Math.max(1, p - 1))}
                aria-label="Decrease pages"
              >
                <Minus className="size-4" />
              </Button>
              <input
                id="calc-pages"
                type="range"
                min={1}
                max={200}
                value={pages}
                disabled={!service.perPage}
                onChange={(e) => setPages(Number(e.target.value))}
                className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-brand-500"
                aria-label="Number of pages"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={!service.perPage}
                onClick={() => setPages((p) => Math.min(200, p + 1))}
                aria-label="Increase pages"
              >
                <Plus className="size-4" />
              </Button>
              <span className="w-14 text-center font-display text-lg font-semibold tabular-nums">
                {service.perPage ? pages : "—"}
              </span>
            </div>
            {!service.perPage && (
              <p className="mt-1.5 text-xs text-muted-foreground">
                This service is priced per project, not per page.
              </p>
            )}
          </div>

          {/* Add-ons */}
          <div>
            <Label>Add-ons</Label>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <AddonToggle
                label="Plagiarism report"
                sub="Similarity score + breakdown"
                checked={plagiarismReport}
                onChange={setPlagiarism}
              />
              <AddonToggle
                label="Premium consultant"
                sub="Top-rated, priority matching"
                checked={premiumConsultant}
                onChange={setPremium}
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="relative flex flex-col justify-between bg-brand-gradient p-6 text-white sm:p-8 lg:col-span-2">
          <div className="pointer-events-none absolute inset-0 bg-mesh opacity-30" />
          <div className="relative">
            <Badge className="border-white/30 bg-white/15 text-white">
              <Sparkles className="size-3.5" /> Instant estimate
            </Badge>
            <p className="mt-6 text-sm text-white/80">Estimated total</p>
            <motion.p
              key={quote.total}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              {toDisplay(quote.total)}
            </motion.p>
            {service.perPage && (
              <p className="mt-1 text-sm text-white/70">
                ≈ {toDisplay(quote.pricePerPage)} per page
              </p>
            )}

            {!compact && (
              <ul className="mt-6 space-y-2 border-t border-white/20 pt-5 text-sm">
                {quote.breakdown
                  .filter((b) => b.amount !== 0)
                  .map((b) => (
                    <li key={b.label} className="flex items-center justify-between gap-4">
                      <span className="text-white/80">{b.label}</span>
                      <span className="font-medium tabular-nums">
                        {b.amount > 0 ? "+" : ""}
                        {toDisplay(b.amount)}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div className="relative mt-8 space-y-3">
            <Button asChild variant="glass" size="lg" className="w-full text-brand-700">
              <Link href={`/order?service=${serviceSlug}&level=${levelId}&deadline=${deadlineId}&pages=${pages}`}>
                Continue to order <ArrowRight className="size-5" />
              </Link>
            </Button>
            <p className="flex items-center justify-center gap-1.5 text-xs text-white/80">
              <Check className="size-3.5" /> Free revisions · Secure payment · Money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function AddonToggle({
  label,
  sub,
  checked,
  onChange,
}: {
  label: string;
  sub: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex items-center justify-between rounded-xl border p-3 text-left transition-all",
        checked ? "border-brand-400 bg-brand-50 dark:bg-brand-500/10" : "border-border hover:border-brand-300",
      )}
    >
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-muted-foreground">{sub}</span>
      </span>
      <span
        className={cn(
          "grid size-5 shrink-0 place-items-center rounded-md border transition-colors",
          checked ? "border-brand-500 bg-brand-gradient text-white" : "border-border",
        )}
      >
        {checked && <Check className="size-3.5" />}
      </span>
    </button>
  );
}
