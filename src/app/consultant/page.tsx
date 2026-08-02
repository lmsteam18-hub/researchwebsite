import { auth, dashDisplayUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { statusToStage } from "@/lib/order-display";
import {
  ConsultantDashboardView,
  type ConsultantOrder,
} from "@/components/dashboard/consultant-dashboard-view";

export const metadata = { title: "Freelancer dashboard" };

export default async function ConsultantDashboardPage() {
  const session = await auth();
  const userId = session!.user.id;

  const orders = await prisma.order.findMany({
    where: { consultantId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      service: true,
      client: { select: { name: true, email: true } },
      files: true,
    },
  });

  const reviews = await prisma.review.findMany({
    where: { order: { consultantId: userId } },
    select: { rating: true },
  });

  const dashOrders: ConsultantOrder[] = orders.map((o) => ({
    id: o.id,
    reference: o.reference,
    student: o.client.name ?? o.client.email,
    service: o.service.title,
    subject: o.subject,
    status: o.status,
    stage: statusToStage(o.status),
    progress: o.progress,
    dueAt: o.dueAt ? o.dueAt.toISOString() : null,
    amountNgn: o.amountNgn,
    studentFiles: o.files
      .filter((f) => !f.isDeliverable)
      .map((f) => ({ id: f.id, filename: f.filename, stored: !f.url.startsWith("pending://") })),
    deliverables: o.files
      .filter((f) => f.isDeliverable)
      .map((f) => ({ id: f.id, filename: f.filename, stored: !f.url.startsWith("pending://") })),
  }));

  const active = orders.filter(
    (o) => !["DELIVERED", "COMPLETED", "CANCELLED"].includes(o.status),
  ).length;
  const completed = orders.filter((o) =>
    ["DELIVERED", "COMPLETED"].includes(o.status),
  ).length;
  const totalValue = orders.reduce((sum, o) => sum + o.amountNgn, 0);
  const rating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "—";

  const user = await dashDisplayUser();

  return (
    <ConsultantDashboardView
      user={user}
      orders={dashOrders}
      stats={{ active, completed, totalValue, rating }}
    />
  );
}
