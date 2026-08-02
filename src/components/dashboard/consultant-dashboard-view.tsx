"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  CheckCircle2,
  Download,
  FileText,
  FileUp,
  Loader2,
  Star,
  TrendingUp,
  Upload,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { formatCurrency, formatDate } from "@/lib/utils";

export interface CFile { id: string; filename: string; stored: boolean }
export interface ConsultantOrder {
  id: string;
  reference: string;
  student: string;
  service: string;
  subject: string | null;
  status: string; // enum value
  stage: string; // label
  progress: number;
  dueAt: string | null;
  amountNgn: number;
  studentFiles: CFile[];
  deliverables: CFile[];
}
interface Stats { active: number; completed: number; totalValue: number; rating: string }

const STATUS_OPTIONS = [
  { value: "ASSIGNED", label: "Assigned" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "QUALITY_CHECK", label: "Quality Check" },
  { value: "REVISION", label: "Revision" },
  { value: "COMPLETED", label: "Completed" },
  { value: "DELIVERED", label: "Delivered" },
];

export function ConsultantDashboardView({
  user,
  orders,
  stats,
}: {
  user: { name: string; email: string };
  orders: ConsultantOrder[];
  stats: Stats;
}) {
  const firstName = user.name?.split(" ")[0] ?? "there";
  const statCards = [
    { label: "Active projects", value: String(stats.active), icon: Briefcase },
    { label: "Completed", value: String(stats.completed), icon: CheckCircle2 },
    { label: "Total value", value: formatCurrency(stats.totalValue), icon: TrendingUp },
    { label: "Avg. rating", value: stats.rating, icon: Star },
  ];

  return (
    <DashboardShell role="consultant" user={user}>
      <div>
        <h1 className="font-display text-2xl font-bold">Welcome, {firstName} 👋</h1>
        <p className="text-muted-foreground">
          {stats.active} active project{stats.active === 1 ? "" : "s"} assigned to you.
        </p>
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

      <h2 className="mt-8 font-display text-lg font-bold">Assigned projects</h2>
      <div className="mt-4 space-y-4">
        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-14 text-center text-sm text-muted-foreground">
              No projects assigned to you yet. An admin will match you to work in your field.
            </CardContent>
          </Card>
        ) : (
          orders.map((order) => <ProjectCard key={order.id} order={order} />)
        )}
      </div>
    </DashboardShell>
  );
}

function FileChip({ file }: { file: CFile }) {
  if (!file.stored) {
    return (
      <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground">
        <FileText className="size-3.5" /> <span className="max-w-[180px] truncate">{file.filename}</span>
      </span>
    );
  }
  return (
    <a
      href={`/api/files/${file.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-xs transition-colors hover:border-brand-300 hover:text-brand-600"
    >
      <FileText className="size-3.5" />
      <span className="max-w-[180px] truncate">{file.filename}</span>
      <Download className="size-3.5 opacity-60 group-hover:opacity-100" />
    </a>
  );
}

function ProjectCard({ order }: { order: ConsultantOrder }) {
  const router = useRouter();
  const [status, setStatus] = React.useState(order.status);
  const [savingStatus, setSavingStatus] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [msg, setMsg] = React.useState<string | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  async function updateStatus() {
    setSavingStatus(true);
    setMsg(null);
    try {
      const res = await fetch("/api/consultant/orders/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, status }),
      });
      if (!res.ok) setMsg("Couldn't update status.");
      else router.refresh();
    } finally {
      setSavingStatus(false);
    }
  }

  async function onDeliverableSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploading(true);
    setMsg(null);
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append("files", f));
      const up = await fetch("/api/uploads", { method: "POST", body: fd });
      if (!up.ok) {
        const j = await up.json().catch(() => ({}));
        setMsg(j.error ?? "Upload failed.");
        return;
      }
      const uploaded = (await up.json()).files ?? [];
      const attach = await fetch("/api/consultant/orders/deliverable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, files: uploaded }),
      });
      if (!attach.ok) setMsg("Couldn't attach deliverable.");
      else router.refresh();
    } catch {
      setMsg("Network error during upload.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const statusChanged = status !== order.status;

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            {order.service}
            <Badge variant="soft">{order.reference}</Badge>
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            {order.student}{order.subject ? ` · ${order.subject}` : ""}
            {order.dueAt ? ` · Due ${formatDate(order.dueAt)}` : ""}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-lg font-bold text-gradient">{formatCurrency(order.amountNgn)}</p>
          <Badge variant="muted">{order.stage}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-medium">Progress</span>
            <span className="text-muted-foreground">{order.progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-brand-gradient transition-all" style={{ width: `${order.progress}%` }} />
          </div>
        </div>

        {/* Student files */}
        <div>
          <p className="mb-1.5 text-xs font-medium text-muted-foreground">Student files</p>
          {order.studentFiles.length === 0 ? (
            <p className="text-xs text-muted-foreground">No files uploaded.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {order.studentFiles.map((f) => <FileChip key={f.id} file={f} />)}
            </div>
          )}
        </div>

        {/* Deliverables */}
        {order.deliverables.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Your deliverables</p>
            <div className="flex flex-wrap gap-2">
              {order.deliverables.map((f) => <FileChip key={f.id} file={f} />)}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full sm:w-64">
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">Update status</p>
            <div className="flex gap-2">
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </Select>
              <Button size="sm" onClick={updateStatus} disabled={savingStatus || !statusChanged}>
                {savingStatus ? <Loader2 className="size-4 animate-spin" /> : "Update"}
              </Button>
            </div>
          </div>

          <div>
            <input ref={fileRef} type="file" multiple className="hidden" onChange={onDeliverableSelected} />
            <Button size="sm" variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading}>
              {uploading ? <><Loader2 className="size-4 animate-spin" /> Uploading…</> : <><FileUp className="size-4" /> Upload deliverable</>}
            </Button>
          </div>
        </div>
        {msg && <p className="text-xs text-destructive">{msg}</p>}
      </CardContent>
    </Card>
  );
}
