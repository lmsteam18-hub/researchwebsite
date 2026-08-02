"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginInput } from "@/lib/validations";

export default function LoginPage() {
  const [error, setError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const demoRoles = [
    { label: "Student", email: "client@scholiva.com", href: "/dashboard" },
    { label: "Freelancer", email: "consultant@scholiva.com", href: "/consultant" },
    { label: "Admin", email: "admin@scholiva.com", href: "/admin" },
  ];

  async function onSubmit(data: LoginInput) {
    setError(null);
    try {
      const { signIn } = await import("next-auth/react");
      const res = await signIn("credentials", { ...data, redirect: false });
      if (res?.error) {
        setError("Invalid email or password.");
      } else {
        // Route by role after login.
        const target =
          demoRoles.find((r) => r.email === data.email)?.href ?? "/dashboard";
        window.location.href = target;
      }
    } catch {
      setError("Authentication isn't configured yet. Explore the demo dashboard instead.");
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to manage your projects and messages."
      footer={<>New here? <Link href="/register" className="font-medium text-brand-600 hover:underline">Create an account</Link></>}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label className="mb-1.5 block">Email</Label>
          <Input type="email" {...register("email")} placeholder="you@university.edu" />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <Label>Password</Label>
            <Link href="/forgot-password" className="text-xs text-brand-600 hover:underline">Forgot?</Link>
          </div>
          <PasswordInput {...register("password")} placeholder="••••••••" />
          {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
        </div>

        {error && <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="size-5 animate-spin" /> Logging in…</> : <>Log in <Lock className="size-4" /></>}
        </Button>

        <div className="rounded-xl border border-dashed border-border p-3">
          <p className="mb-2 text-center text-xs text-muted-foreground">
            Demo accounts (password: <span className="font-mono">Password123</span>)
          </p>
          <div className="flex gap-2">
            {demoRoles.map((r) => (
              <Button
                key={r.email}
                type="button"
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => {
                  setValue("email", r.email);
                  setValue("password", "Password123");
                }}
              >
                {r.label}
              </Button>
            ))}
          </div>
        </div>
      </form>
    </AuthShell>
  );
}
