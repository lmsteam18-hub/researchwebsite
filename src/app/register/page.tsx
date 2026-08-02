"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserPlus } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { registerSchema, type RegisterInput } from "@/lib/validations";

export default function RegisterPage() {
  const [message, setMessage] = React.useState<{ type: "error" | "ok"; text: string } | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "CLIENT" },
  });

  const role = watch("role");

  async function onSubmit(data: RegisterInput) {
    setMessage(null);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setMessage({ type: "ok", text: "Account created! You can now log in." });
    } else {
      const json = await res.json().catch(() => ({}));
      setMessage({ type: "error", text: json.error ?? "Something went wrong." });
    }
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join thousands of students and researchers."
      footer={<>Already have an account? <Link href="/login" className="font-medium text-brand-600 hover:underline">Log in</Link></>}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Role toggle */}
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted p-1">
          {(["CLIENT", "CONSULTANT"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setValue("role", r)}
              className={cn(
                "rounded-lg py-2 text-sm font-medium transition-all",
                role === r ? "bg-card shadow-sm text-foreground" : "text-muted-foreground",
              )}
            >
              {r === "CLIENT" ? "I'm a student" : "I'm a freelancer"}
            </button>
          ))}
        </div>

        <div>
          <Label className="mb-1.5 block">Full name</Label>
          <Input {...register("name")} placeholder="Ada Lovelace" />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <Label className="mb-1.5 block">Email</Label>
          <Input type="email" {...register("email")} placeholder="you@university.edu" />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label className="mb-1.5 block">Password</Label>
            <PasswordInput {...register("password")} placeholder="••••••••" />
            {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
          </div>
          <div>
            <Label className="mb-1.5 block">Confirm</Label>
            <PasswordInput {...register("confirmPassword")} placeholder="••••••••" />
            {errors.confirmPassword && <p className="mt-1 text-xs text-destructive">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        {message && (
          <p className={cn("rounded-lg p-3 text-sm", message.type === "ok" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive")}>
            {message.text}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="size-5 animate-spin" /> Creating…</> : <>Create account <UserPlus className="size-4" /></>}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          By creating an account you agree to our{" "}
          <Link href="/legal/terms" className="hover:underline">Terms</Link> and{" "}
          <Link href="/legal/academic-integrity" className="hover:underline">Academic Integrity Policy</Link>.
        </p>
      </form>
    </AuthShell>
  );
}
