"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  CreditCard,
  FileText,
  Loader2,
  Lock,
  ShieldCheck,
  User,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileDropzone, type UploadedFile } from "@/components/upload/file-dropzone";
import { cn, formatCurrency } from "@/lib/utils";
import { orderSchema, type OrderInput } from "@/lib/validations";
import { computeQuote } from "@/lib/pricing";
import { services } from "@/config/services";
import { subjects, referenceStyles } from "@/config/subjects";
import { academicLevels, deadlineOptions } from "@/config/pricing";
import { useCurrency } from "@/lib/store";

const steps = [
  { id: 0, title: "Your details", icon: User },
  { id: 1, title: "Project", icon: FileText },
  { id: 2, title: "Instructions & files", icon: Building2 },
  { id: 3, title: "Review & pay", icon: CreditCard },
] as const;

const fieldsByStep: Record<number, (keyof OrderInput)[]> = {
  0: ["name", "email", "phone", "country"],
  1: ["service", "academicLevel", "deadline", "pages"],
  2: ["instructions", "agreeIntegrity"],
  3: [],
};

const paymentMethods = [
  { id: "paystack", label: "Paystack", hint: "Cards · Bank · USSD" },
  { id: "flutterwave", label: "Flutterwave", hint: "Pan-African" },
  { id: "stripe", label: "Stripe", hint: "Apple / Google Pay" },
  { id: "bank", label: "Bank transfer", hint: "Manual confirmation" },
];

export function OrderForm({
  defaults,
}: {
  defaults?: Partial<Pick<OrderInput, "service" | "academicLevel" | "deadline" | "pages">>;
}) {
  const { currency } = useCurrency();
  const [step, setStep] = React.useState(0);
  const [files, setFiles] = React.useState<UploadedFile[]>([]);
  const [payment, setPayment] = React.useState<string>("paystack");
  const [submitted, setSubmitted] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [reference, setReference] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);

  const {
    register,
    control,
    watch,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderInput>({
    resolver: zodResolver(orderSchema),
    mode: "onTouched",
    defaultValues: {
      service: defaults?.service ?? services[0].slug,
      academicLevel: defaults?.academicLevel ?? "undergraduate",
      deadline: defaults?.deadline ?? "7d",
      pages: defaults?.pages ?? 10,
      subject: subjects[0].name,
      referenceStyle: "APA 7th",
      plagiarismReport: false,
      premiumConsultant: false,
      agreeIntegrity: false,
    },
  });

  const values = watch();
  const quote = React.useMemo(
    () =>
      computeQuote({
        serviceSlug: values.service,
        levelId: values.academicLevel,
        deadlineId: values.deadline,
        subject: values.subject,
        pages: Number(values.pages) || 1,
        addons: {
          plagiarismReport: values.plagiarismReport,
          premiumConsultant: values.premiumConsultant,
        },
      }),
    [values],
  );

  const toDisplay = (ngn: number) => formatCurrency(ngn * currency.rate, currency.code);

  async function next() {
    const valid = await trigger(fieldsByStep[step]);
    if (valid) setStep((s) => Math.min(steps.length - 1, s + 1));
  }

  async function onSubmit(data: OrderInput) {
    // Guard: only ever submit from the final (payment) step, never on a
    // step transition. Prevents accidental early submission.
    if (step !== steps.length - 1) return;
    setSubmitError(null);

    // 1) Upload any attached files to storage first, collecting their metadata.
    let attachments: unknown[] = [];
    if (files.length > 0) {
      setUploading(true);
      try {
        const fd = new FormData();
        files.forEach((f) => fd.append("files", f.file));
        const up = await fetch("/api/uploads", { method: "POST", body: fd });
        if (!up.ok) {
          const j = await up.json().catch(() => ({}));
          setSubmitError(j.error ?? "We couldn't upload your files. Please try again.");
          return;
        }
        attachments = (await up.json()).files ?? [];
      } catch {
        setSubmitError("We couldn't upload your files. Please check your connection and try again.");
        return;
      } finally {
        setUploading(false);
      }
    }

    // 2) Create the order with the uploaded attachment metadata.
    const payload = {
      ...data,
      paymentMethod: payment,
      quoteNgn: quote.total,
      attachments,
      files: files.map((f) => f.file.name),
    };
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setSubmitError(json.error ?? "We couldn't place your order. Please try again.");
        return;
      }
      const result = await res.json();
      // If a real payment gateway returned a checkout URL, go there.
      if (result?.payment?.url) {
        window.location.href = result.payment.url;
        return;
      }
      setReference(result?.reference ?? null);
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    }
  }

  if (submitted) {
    return <OrderSuccess total={toDisplay(quote.total)} email={values.email} reference={reference} />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Form column */}
      <div className="lg:col-span-2">
        {/* Stepper */}
        <ol className="mb-6 flex items-center gap-2">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const done = i < step;
            const active = i === step;
            return (
              <li key={s.id} className="flex flex-1 items-center gap-2">
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-colors",
                    done && "border-transparent bg-success text-white",
                    active && "border-transparent bg-brand-gradient text-white",
                    !done && !active && "border-border text-muted-foreground",
                  )}
                >
                  {done ? <CheckCircle2 className="size-5" /> : <Icon className="size-4" />}
                </span>
                <span className={cn("hidden text-sm font-medium sm:block", active ? "text-foreground" : "text-muted-foreground")}>
                  {s.title}
                </span>
                {i < steps.length - 1 && (
                  <span className={cn("h-px flex-1", done ? "bg-success" : "bg-border")} />
                )}
              </li>
            );
          })}
        </ol>

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                {step === 0 && (
                  <div className="space-y-4">
                    <Field label="Full name" error={errors.name?.message}>
                      <Input {...register("name")} placeholder="Ada Lovelace" />
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Email" error={errors.email?.message}>
                        <Input type="email" {...register("email")} placeholder="you@university.edu" />
                      </Field>
                      <Field label="Phone" error={errors.phone?.message}>
                        <Input {...register("phone")} placeholder="+234 800 000 0000" />
                      </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Country" error={errors.country?.message}>
                        <Input {...register("country")} placeholder="Nigeria" />
                      </Field>
                      <Field label="Institution (optional)">
                        <Input {...register("institution")} placeholder="University of Lagos" />
                      </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Course (optional)">
                        <Input {...register("course")} placeholder="MSc Public Health" />
                      </Field>
                      <Field label="Department (optional)">
                        <Input {...register("department")} placeholder="Epidemiology" />
                      </Field>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <Field label="Service" error={errors.service?.message}>
                      <Select {...register("service")}>
                        {services.map((s) => (
                          <option key={s.slug} value={s.slug}>{s.title}</option>
                        ))}
                      </Select>
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Subject">
                        <Select {...register("subject")}>
                          {subjects.map((s) => (
                            <option key={s.name} value={s.name}>{s.emoji} {s.name}</option>
                          ))}
                        </Select>
                      </Field>
                      <Field label="Academic level" error={errors.academicLevel?.message}>
                        <Select {...register("academicLevel")}>
                          {academicLevels.map((l) => (
                            <option key={l.id} value={l.id}>{l.label}</option>
                          ))}
                        </Select>
                      </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Deadline" error={errors.deadline?.message}>
                        <Select {...register("deadline")}>
                          {deadlineOptions.map((d) => (
                            <option key={d.id} value={d.id}>{d.label}</option>
                          ))}
                        </Select>
                      </Field>
                      <Field label="Reference style">
                        <Select {...register("referenceStyle")}>
                          {referenceStyles.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </Select>
                      </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Number of pages" error={errors.pages?.message}>
                        <Input type="number" min={1} {...register("pages")} />
                      </Field>
                      <Field label="Word count (optional)">
                        <Input type="number" min={0} {...register("wordCount")} placeholder="e.g. 2750" />
                      </Field>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <Field label="Instructions" error={errors.instructions?.message}>
                      <Textarea
                        {...register("instructions")}
                        placeholder="Describe your project, requirements, marking rubric, and anything your consultant should know…"
                      />
                    </Field>
                    <Field label="Additional notes (optional)">
                      <Textarea {...register("additionalNotes")} className="min-h-[80px]" placeholder="Anything else?" />
                    </Field>
                    <div>
                      <Label className="mb-2 block">Upload files</Label>
                      <FileDropzone files={files} onChange={setFiles} />
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4">
                      <input type="checkbox" {...register("agreeIntegrity")} className="mt-0.5 size-5 accent-brand-500" />
                      <span className="text-sm text-muted-foreground">
                        I understand Scholiva provides research support and guidance, and I
                        agree to the{" "}
                        <a href="/legal/academic-integrity" className="font-medium text-brand-600 hover:underline">
                          Academic Integrity Policy
                        </a>
                        . I will not submit supported work as wholly my own where prohibited.
                      </span>
                    </label>
                    {errors.agreeIntegrity && (
                      <p className="text-sm text-destructive">{errors.agreeIntegrity.message}</p>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <h3 className="font-display text-lg font-semibold">Choose payment method</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {paymentMethods.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPayment(m.id)}
                          className={cn(
                            "flex items-center justify-between rounded-xl border p-4 text-left transition-all",
                            payment === m.id ? "border-brand-400 bg-brand-50 dark:bg-brand-500/10" : "border-border hover:border-brand-300",
                          )}
                        >
                          <span>
                            <span className="block text-sm font-semibold">{m.label}</span>
                            <span className="block text-xs text-muted-foreground">{m.hint}</span>
                          </span>
                          <span className={cn("size-4 rounded-full border-4", payment === m.id ? "border-brand-500" : "border-muted")} />
                        </button>
                      ))}
                    </div>

                    <div className="rounded-xl bg-muted/60 p-4 text-sm">
                      <p className="flex items-center gap-2 font-medium">
                        <Lock className="size-4 text-brand-500" /> Secure escrow
                      </p>
                      <p className="mt-1 text-muted-foreground">
                        Your payment is held securely and only released when you approve the
                        delivery. A VAT invoice is generated automatically.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav */}
            <div className="mt-8 flex items-center justify-between">
              <Button type="button" variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
                <ArrowLeft className="size-4" /> Back
              </Button>
              {step < steps.length - 1 ? (
                <Button key="continue-btn" type="button" onClick={next}>
                  Continue <ArrowRight className="size-4" />
                </Button>
              ) : (
                <Button key="submit-btn" type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><Loader2 className="size-5 animate-spin" /> {uploading ? "Uploading files…" : "Processing…"}</>
                  ) : (
                    <>Pay {toDisplay(quote.total)} securely <Lock className="size-4" /></>
                  )}
                </Button>
              )}
            </div>

            {submitError && (
              <p className="mt-4 rounded-xl bg-destructive/10 p-3 text-center text-sm text-destructive">
                {submitError}
              </p>
            )}
          </form>
        </Card>
      </div>

      {/* Live quote sidebar */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <Card glass className="p-6">
          <Badge variant="soft">Live estimate</Badge>
          <p className="mt-4 font-display text-3xl font-bold">
            <span className="text-gradient">{toDisplay(quote.total)}</span>
          </p>
          <p className="text-sm text-muted-foreground">Updates as you fill the form</p>
          <ul className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            {quote.breakdown.filter((b) => b.amount !== 0).map((b) => (
              <li key={b.label} className="flex justify-between gap-4">
                <span className="text-muted-foreground">{b.label}</span>
                <span className="tabular-nums">{toDisplay(b.amount)}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-5 space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-success" /> Free revisions included</li>
            <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-success" /> Money-back guarantee</li>
            <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-success" /> 100% confidential</li>
          </ul>
        </Card>
      </aside>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-1.5 block">{label}</Label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function OrderSuccess({ total, email, reference }: { total: string; email: string; reference?: string | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-lg text-center"
    >
      <Card glass className="p-10">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="size-8" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-bold">Order received!</h2>
        {reference && (
          <p className="mt-2 text-sm">
            Reference{" "}
            <span className="rounded-md bg-muted px-2 py-0.5 font-mono font-semibold text-brand-600">{reference}</span>
          </p>
        )}
        <p className="mt-2 text-muted-foreground">
          We&apos;ve emailed a confirmation and invoice to{" "}
          <span className="font-medium text-foreground">{email}</span>. Your estimated total is{" "}
          <span className="font-semibold text-brand-600">{total}</span>.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Track progress and chat with your consultant from your dashboard.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild><a href="/dashboard">Go to dashboard</a></Button>
          <Button asChild variant="outline"><a href="/">Back home</a></Button>
        </div>
      </Card>
    </motion.div>
  );
}
