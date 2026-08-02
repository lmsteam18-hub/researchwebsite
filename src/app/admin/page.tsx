"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  BadgePercent,
  FileText,
  Gift,
  LayoutDashboard,
  LifeBuoy,
  Newspaper,
  Search,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import {
  adminStats,
  adminRevenueSeries,
  adminRecentOrders,
  adminTickets,
} from "@/config/demo";

const nav: NavItem[] = [
  { title: "Analytics", href: "/admin", icon: LayoutDashboard },
  { title: "Orders", href: "/admin/orders", icon: ShoppingCart, badge: 37 },
  { title: "Clients", href: "/admin/clients", icon: Users },
  { title: "Consultants", href: "/admin/consultants", icon: Users },
  { title: "Support", href: "/admin/support", icon: LifeBuoy, badge: 5 },
  { title: "Coupons", href: "/admin/coupons", icon: BadgePercent },
  { title: "Referrals", href: "/admin/referrals", icon: Gift },
  { title: "Blog / CMS", href: "/admin/blog", icon: Newspaper },
  { title: "SEO", href: "/admin/seo", icon: Search },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

const statusVariant: Record<string, "soft" | "warning" | "success" | "muted"> = {
  Submitted: "muted",
  Assigned: "warning",
  "In Progress": "soft",
  Delivered: "success",
};

export default function AdminDashboard() {
  const max = Math.max(...adminRevenueSeries);
  const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  return (
    <DashboardShell nav={nav} role="admin" user={{ name: "Scholiva Admin", email: "admin@scholiva.com" }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Platform analytics</h1>
          <p className="text-muted-foreground">Last 30 days overview</p>
        </div>
        <Button variant="outline" size="sm">Export report</Button>
      </div>

      {/* KPI cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {adminStats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-display text-2xl font-bold">{s.value}</p>
              <p className={cn("mt-1 inline-flex items-center gap-1 text-xs font-medium", s.up ? "text-success" : "text-destructive")}>
                {s.up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                {s.delta} vs last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Revenue chart */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Revenue trend</CardTitle></CardHeader>
          <CardContent>
            <div className="flex h-56 items-end gap-2">
              {adminRevenueSeries.map((v, i) => (
                <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-lg bg-brand-gradient transition-all group-hover:opacity-80"
                      style={{ height: `${(v / max) * 100}%` }}
                    />
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-foreground px-1.5 py-0.5 text-[10px] text-background opacity-0 transition-opacity group-hover:opacity-100">
                      ₦{v}0k
                    </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{months[i]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support tickets */}
        <Card>
          <CardHeader><CardTitle>Support tickets</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {adminTickets.map((t) => (
              <div key={t.id} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">{t.id}</span>
                  <Badge variant={t.status === "Open" ? "warning" : t.status === "Resolved" ? "success" : "soft"}>{t.status}</Badge>
                </div>
                <p className="mt-1 text-sm">{t.subject}</p>
                <p className="text-xs text-muted-foreground">{t.user}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent orders */}
      <Card className="mt-6">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2"><FileText className="size-4" /> Recent orders</CardTitle>
          <Button size="sm" variant="ghost">View all</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="pb-3 font-medium">Reference</th>
                  <th className="pb-3 font-medium">Client</th>
                  <th className="pb-3 font-medium">Service</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {adminRecentOrders.map((o) => (
                  <tr key={o.ref} className="border-b border-border/60 last:border-0">
                    <td className="py-3 font-medium">{o.ref}</td>
                    <td className="py-3 text-muted-foreground">{o.client}</td>
                    <td className="py-3">{o.service}</td>
                    <td className="py-3"><Badge variant={statusVariant[o.status] ?? "soft"}>{o.status}</Badge></td>
                    <td className="py-3 text-right font-medium tabular-nums">{formatCurrency(o.amountNgn)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
