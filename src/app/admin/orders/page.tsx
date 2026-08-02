import { auth, dashDisplayUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { statusToStage } from "@/lib/order-display";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import {
  AdminOrdersView,
  type AdminOrder,
  type Freelancer,
} from "@/components/dashboard/admin-orders-view";

export const metadata = { title: "Orders — Admin" };

export default async function AdminOrdersPage() {
  await auth();

  const [orders, consultants, user] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        service: true,
        client: { select: { name: true, email: true } },
        consultant: { select: { id: true, name: true } },
        files: true,
      },
    }),
    prisma.user.findMany({
      where: { role: "CONSULTANT" },
      include: { consultantProfile: true },
      orderBy: { name: "asc" },
    }),
    dashDisplayUser(),
  ]);

  const dashOrders: AdminOrder[] = orders.map((o) => ({
    id: o.id,
    reference: o.reference,
    student: o.client.name ?? o.client.email,
    service: o.service.title,
    subject: o.subject,
    status: statusToStage(o.status),
    amountNgn: o.amountNgn,
    createdAt: o.createdAt.toISOString(),
    consultantId: o.consultantId,
    consultantName: o.consultant?.name ?? null,
    files: o.files.map((f) => ({
      id: f.id,
      filename: f.filename,
      stored: !f.url.startsWith("pending://"),
    })),
  }));

  const freelancers: Freelancer[] = consultants.map((c) => ({
    id: c.id,
    name: c.name ?? c.email,
    disciplines: c.consultantProfile?.disciplines ?? [],
    rating: c.consultantProfile?.rating ?? 0,
  }));

  return (
    <DashboardShell role="admin" user={user}>
      <div>
        <h1 className="font-display text-2xl font-bold">All orders</h1>
        <p className="text-muted-foreground">
          {dashOrders.length} order{dashOrders.length === 1 ? "" : "s"} · open student files and assign Freelancers
        </p>
      </div>
      <div className="mt-6">
        <AdminOrdersView orders={dashOrders} freelancers={freelancers} />
      </div>
    </DashboardShell>
  );
}
