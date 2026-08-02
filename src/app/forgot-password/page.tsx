"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Send } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [sent, setSent] = React.useState(false);
  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll email you a secure link to set a new password."
      footer={<>Remembered it? <Link href="/login" className="font-medium text-brand-600 hover:underline">Back to log in</Link></>}
    >
      {sent ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center">
          <CheckCircle2 className="size-10 text-success" />
          <p className="text-sm text-muted-foreground">If an account exists for that email, a reset link is on its way.</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-4"
        >
          <div>
            <Label className="mb-1.5 block">Email</Label>
            <Input type="email" required placeholder="you@university.edu" />
          </div>
          <Button type="submit" size="lg" className="w-full">
            Send reset link <Send className="size-4" />
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
