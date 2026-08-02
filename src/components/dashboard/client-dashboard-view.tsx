"use client";

import Link from "next/link";
import {
  CreditCard,
  Download,
  FileText,
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  Paperclip,
  Plus,
  Receipt,
  Send,
  Settings,
  Star,
  Wallet,
} from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard/dashboard-shell";
import { OrderTimeline } from "@/components/dashboard/order-timeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { orderStages } from "@/config/content";

export interface DashOrder {
  reference: string;
  service: string;
  subject: string;
  level: string;
  stage: (typeof orderStages)[number];
  progress: number;
  amountNgn: number;
  dueAt: string | null;
  consultant: string;
  unread: number;
  files: DashFile[];
}
export interface DashFile { id: string; filename: string; stored: boolean }
export interface DashMessage { from: string; me: boolean; body: string; time: string }
export interface DashInvoice { number: string; ref: string; amountNgn: number; status: string; date: string }

interface Props {
  user: { name: string; email: string };
  orders: DashOrder[];
  messages: DashMessage[];
  invoices: DashInvoice[];
  stats: { active: number; delivered: number; totalInvested: number; avgRating: string };
}

export function ClientDashboardView({ user, orders, messages, invoices, stats }: Props) {
  const nav: NavItem[] = [
    { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { title: "My orders", href: "/dashboard/orders", icon: FolderKanban, badge: orders.length || undefined },
    { title: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { title: "Invoices", href: "/dashboard/invoices", icon: Receipt },
    { title: "Wallet", href: "/dashboard/wallet", icon: Wallet },
    { title: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const statCards = [
    { label: "Active orders", value: String(stats.active), icon: FolderKanban },
    { label: "Delivered", value: String(stats.delivered), icon: FileText },
    { label: "Total invested", value: formatCurrency(stats.totalInvested), icon: CreditCard },
    { label: "Avg. rating given", value: stats.avgRating, icon: Star },
  ];

  const firstName = user.name?.split(" ")[0] ?? "there";

  return (
    <DashboardShell nav={nav} role="client" user={user}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Welcome back, {firstName} 👋</h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your research.</p>
        </div>
        <Button asChild>
          <Link href="/order"><Plus className="size-4" /> New project</Link>
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-gradient-soft text-brand-600 dark:text-brand-300">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="font-display text-xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-gradient-soft text-brand-600 dark:text-brand-300">
                  <FolderKanban className="size-6" />
                </span>
                <p className="font-medium">No orders yet</p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Upload your first project to get a quote and matched with a specialist.
                </p>
                <Button asChild className="mt-2"><Link href="/order">Start a project</Link></Button>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order.reference}>
                <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {order.service}
                      <Badge variant="soft">{order.reference}</Badge>
                    </CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {order.subject ? `${order.subject} · ` : ""}{order.level}
                      {order.dueAt ? ` · Due ${formatDate(order.dueAt)}` : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-bold text-gradient">{formatCurrency(order.amountNgn)}</p>
                    <p className="text-xs text-muted-foreground">{order.consultant}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="font-medium">Progress</span>
                      <span className="text-muted-foreground">{order.progress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-brand-gradient transition-all" style={{ width: `${order.progress}%` }} />
                    </div>
                  </div>
                  <OrderTimeline current={order.stage} />
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="size-4" /> Message {order.unread > 0 && <Badge className="ml-1">{order.unread}</Badge>}
                    </Button>
                    <Button size="sm" variant="ghost">Request revision</Button>
                  </div>

                  {order.files.length > 0 && (
                    <div className="mt-4 border-t border-border pt-4">
                      <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <Paperclip className="size-3.5" /> Files ({order.files.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {order.files.map((f) =>
                          f.stored ? (
                            <a
                              key={f.id}
                              href={`/api/files/${f.id}`}
                              className="group inline-flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs transition-colors hover:border-brand-300 hover:text-brand-600"
                            >
                              <FileText className="size-3.5" />
                              <span className="max-w-[180px] truncate">{f.filename}</span>
                              <Download className="size-3.5 opacity-60 group-hover:opacity-100" />
                            </a>
                          ) : (
                            <span
                              key={f.id}
                              title="This file wasn't stored (uploaded before storage was enabled)."
                              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground"
                            >
                              <FileText className="size-3.5" />
                              <span className="max-w-[180px] truncate">{f.filename}</span>
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="size-4" /> Messages</CardTitle></CardHeader>
            <CardContent>
              {messages.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">No messages yet.</p>
              ) : (
                <div className="space-y-3">
                  {messages.map((m, i) => (
                    <div key={i} className={m.me ? "flex justify-end" : "flex justify-start"}>
                      <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.me ? "bg-brand-gradient text-white" : "bg-muted"}`}>
                        {!m.me && <p className="mb-0.5 text-xs font-semibold opacity-70">{m.from}</p>}
                        {m.body}
                        <span className={`mt-0.5 block text-[10px] ${m.me ? "text-white/70" : "text-muted-foreground"}`}>{m.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 flex gap-2">
                <input placeholder="Type a message…" className="h-10 flex-1 rounded-full border border-input bg-background/60 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30" />
                <Button size="icon" aria-label="Send"><Send className="size-4" /></Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Receipt className="size-4" /> Recent invoices</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {invoices.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">No invoices yet.</p>
              ) : (
                invoices.map((inv) => (
                  <div key={inv.number} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{inv.number}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(inv.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium tabular-nums">{formatCurrency(inv.amountNgn)}</p>
                      <Badge variant={inv.status === "Paid" ? "success" : "warning"}>{inv.status}</Badge>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
