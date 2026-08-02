"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, Download, FileText, Loader2, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { formatCurrency, formatDate } from "@/lib/utils";

export interface AdminFile {
  id: string;
  filename: string;
  stored: boolean;
}
export interface AdminOrder {
  id: string;
  reference: string;
  student: string;
  service: string;
  subject: string | null;
  status: string;
  amountNgn: number;
  createdAt: string;
  consultantId: string | null;
  consultantName: string | null;
  files: AdminFile[];
}
export interface Freelancer {
  id: string;
  name: string;
  disciplines: string[];
  rating: number;
}

export function AdminOrdersView({
  orders,
  freelancers,
}: {
  orders: AdminOrder[];
  freelancers: Freelancer[];
}) {
  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-sm text-muted-foreground">No orders yet.</CardContent></Card>
      ) : (
        orders.map((order) => (
          <OrderRow key={order.id} order={order} freelancers={freelancers} />
        ))
      )}
    </div>
  );
}

function OrderRow({ order, freelancers }: { order: AdminOrder; freelancers: Freelancer[] }) {
  const router = useRouter();
  const [selected, setSelected] = React.useState(order.consultantId ?? "");
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Rank freelancers: those specialising in the order's subject first.
  const ranked = React.useMemo(() => {
    const subject = order.subject?.toLowerCase();
    const matches = (f: Freelancer) =>
      subject ? f.disciplines.some((d) => d.toLowerCase() === subject) : false;
    return [...freelancers].sort((a, b) => Number(matches(b)) - Number(matches(a)));
  }, [freelancers, order.subject]);

  const isMatch = (f: Freelancer) =>
    order.subject ? f.disciplines.some((d) => d.toLowerCase() === order.subject!.toLowerCase()) : false;

  async function assign() {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/orders/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, consultantId: selected || null }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error ?? "Couldn't assign.");
        return;
      }
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  const changed = selected !== (order.consultantId ?? "");

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          {/* Order info */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display font-semibold">{order.service}</span>
              <Badge variant="soft">{order.reference}</Badge>
              <Badge variant={order.status === "Submitted" ? "warning" : "muted"}>{order.status}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {order.student}{order.subject ? ` · ${order.subject}` : ""} · {formatDate(order.createdAt)} · {formatCurrency(order.amountNgn)}
            </p>

            {/* Student's files */}
            <div className="mt-3">
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Student files</p>
              {order.files.length === 0 ? (
                <p className="text-xs text-muted-foreground">No files uploaded.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {order.files.map((f) =>
                    f.stored ? (
                      <a
                        key={f.id}
                        href={`/api/files/${f.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs transition-colors hover:border-brand-300 hover:text-brand-600"
                      >
                        <FileText className="size-3.5" />
                        <span className="max-w-[200px] truncate">{f.filename}</span>
                        <Download className="size-3.5 opacity-60 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <span key={f.id} title="Not stored (uploaded before storage was enabled)" className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground">
                        <FileText className="size-3.5" />
                        <span className="max-w-[200px] truncate">{f.filename}</span>
                      </span>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Assign control */}
          <div className="w-full shrink-0 lg:w-80">
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Assign to Freelancer</p>
            <Select value={selected} onChange={(e) => setSelected(e.target.value)}>
              <option value="">— Unassigned —</option>
              {ranked.map((f) => (
                <option key={f.id} value={f.id}>
                  {isMatch(f) ? "★ " : ""}{f.name} · {f.disciplines.slice(0, 2).join(", ") || "General"}
                </option>
              ))}
            </Select>
            {order.subject && (
              <p className="mt-1 text-[11px] text-muted-foreground">★ = specialises in {order.subject}</p>
            )}
            <div className="mt-2 flex items-center gap-2">
              <Button size="sm" onClick={assign} disabled={saving || !changed}>
                {saving ? <><Loader2 className="size-4 animate-spin" /> Saving…</> : saved ? <><Check className="size-4" /> Saved</> : <><UserCheck className="size-4" /> {selected ? "Assign" : "Unassign"}</>}
              </Button>
              {order.consultantName && !changed && (
                <span className="text-xs text-muted-foreground">Currently: {order.consultantName}</span>
              )}
            </div>
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
