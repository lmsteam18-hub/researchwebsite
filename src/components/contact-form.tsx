"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/validations";

export function ContactForm() {
  const [sent, setSent] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      /* demo mode */
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="size-12 text-success" />
        <h3 className="font-display text-xl font-bold">Message sent</h3>
        <p className="text-muted-foreground">Thanks for reaching out — we&apos;ll reply within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label className="mb-1.5 block">Name</Label>
          <Input {...register("name")} placeholder="Your name" />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <Label className="mb-1.5 block">Email</Label>
          <Input type="email" {...register("email")} placeholder="you@email.com" />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <Label className="mb-1.5 block">Subject</Label>
        <Input {...register("subject")} placeholder="How can we help?" />
        {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>}
      </div>
      <div>
        <Label className="mb-1.5 block">Message</Label>
        <Textarea {...register("message")} placeholder="Tell us about your project or question…" />
        {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? <><Loader2 className="size-5 animate-spin" /> Sending…</> : <>Send message <Send className="size-4" /></>}
      </Button>
    </form>
  );
}
