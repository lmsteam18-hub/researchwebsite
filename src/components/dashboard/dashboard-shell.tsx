"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, Search, X } from "lucide-react";
import { cn, initials } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SignOutButton } from "./sign-out-button";
import { navByRole, type DashboardRole, type NavItem } from "@/config/dashboard-nav";

export type { NavItem };

export function DashboardShell({
  role,
  user,
  children,
  nav: navOverride,
}: {
  role: DashboardRole;
  user: { name: string; email: string };
  children: React.ReactNode;
  /** Optional override (e.g. to show live badge counts on an index page). */
  nav?: NavItem[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const nav = navOverride ?? navByRole[role];
  const roleLabel = { client: "Student", consultant: "Freelancer", admin: "Admin" }[role];

  const SidebarInner = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-5">
        <Logo />
        <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
          <X className="size-5" />
        </button>
      </div>
      <Badge variant="soft" className="mx-5 mb-4 w-fit">{roleLabel} workspace</Badge>
      <nav className="flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-brand-gradient text-white shadow-soft" : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-5 shrink-0" />
              <span className="flex-1">{item.title}</span>
              {item.badge ? (
                <span className={cn("grid size-5 place-items-center rounded-full text-[10px] font-bold", active ? "bg-white/20" : "bg-brand-gradient text-white")}>
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white">
            {initials(user.name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-card lg:block">
        {SidebarInner}
      </aside>

      {/* Sidebar (mobile) */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-card shadow-xl">{SidebarInner}</aside>
        </div>
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-card/80 px-4 py-3 backdrop-blur-xl sm:px-6">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </button>
          <div className="relative hidden flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search orders, messages…"
              className="h-10 w-full max-w-md rounded-full border border-input bg-background/60 pl-9 pr-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30"
            />
          </div>
          <div className="ml-auto flex items-center gap-1">
            <button className="relative grid size-10 place-items-center rounded-full hover:bg-muted" aria-label="Notifications">
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-brand-500" />
            </button>
            <ThemeToggle />
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
