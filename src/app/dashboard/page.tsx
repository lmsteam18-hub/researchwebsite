import { redirect } from "next/navigation";
import { auth } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { statusToStage } from "@/lib/order-display";
import {
  ClientDashboardView,
  type DashInvoice,
  type DashMessage,
  type DashOrder,
} from "@/components/dashboard/client-dashboard-view";
import { academicLevels } from "@/config/pricing";

const timeFmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" });
const levelLabel = (id: string) => academicLevels.find((l) => l.id === id)?.label ?? id;

export default async function ClientDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const orders = await prisma.order.findMany({
    where: { clientId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      service: true,
      consultant: true,
      invoice: true,
      payment: true,
      files: true,
      messages: { orderBy: { createdAt: "asc" }, include: { sender: true } },
    },
  });

  const dashOrders: DashOrder[] = orders.map((o) => ({
    reference: o.reference,
    service: o.service.title,
    subject: o.subject ?? "",
    level: levelLabel(o.academicLevel),
    stage: statusToStage(o.status),
    progress: o.progress,
    amountNgn: o.amountNgn,
    dueAt: o.dueAt ? o.dueAt.toISOString() : null,
    consultant: o.consultant?.name ?? "Awaiting assignment",
    unread: o.messages.filter((m) => m.senderId !== userId && !m.readAt).length,
    files: o.files.map((f) => ({
      id: f.id,
      filename: f.filename,
      stored: !f.url.startsWith("pending://"),
    })),
  }));

  // Messages from the most recent order that has any.
  const withMsgs = orders.find((o) => o.messages.length > 0);
  const messages: DashMessage[] = (withMsgs?.messages ?? []).map((m) => ({
    from: m.sender.name ?? "Consultant",
    me: m.senderId === userId,
    body: m.body,
    time: timeFmt.format(m.createdAt),
  }));

  const invoices: DashInvoice[] = orders
    .filter((o) => o.invoice)
    .map((o) => ({
      number: o.invoice!.number,
      ref: o.reference,
      amountNgn: o.invoice!.amount,
      status: o.payment?.status === "SUCCEEDED" ? "Paid" : "Pending",
      date: o.invoice!.issuedAt.toISOString(),
    }));

  const active = orders.filter(
    (o) => !["DELIVERED", "COMPLETED", "CANCELLED"].includes(o.status),
  ).length;
  const delivered = orders.filter((o) =>
    ["DELIVERED", "COMPLETED"].includes(o.status),
  ).length;
  const totalInvested = orders
    .filter((o) => o.payment?.status === "SUCCEEDED")
    .reduce((sum, o) => sum + o.amountNgn, 0);

  const stats = { active, delivered, totalInvested, avgRating: "—" };

  return (
    <ClientDashboardView
      user={{ name: session.user.name ?? "Client", email: session.user.email ?? "" }}
      orders={dashOrders}
      messages={messages}
      invoices={invoices}
      stats={stats}
    />
  );
}
