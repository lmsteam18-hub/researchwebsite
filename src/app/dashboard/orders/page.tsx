import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { auth, dashDisplayUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { statusToStage } from "@/lib/order-display";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { academicLevels } from "@/config/pricing";

export const metadata = { title: "My orders" };
const levelLabel = (id: string) => academicLevels.find((l) => l.id === id)?.label ?? id;

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { clientId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { service: true },
  });
  const user = await dashDisplayUser();

  return (
    <DashboardShell role="client" user={user}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">My orders</h1>
          <p className="text-muted-foreground">{orders.length} order{orders.length === 1 ? "" : "s"} total</p>
        </div>
        <Button asChild><Link href="/order"><Plus className="size-4" /> New project</Link></Button>
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          {orders.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground">
              You haven&apos;t placed any orders yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="p-4 font-medium">Reference</th>
                    <th className="p-4 font-medium">Service</th>
                    <th className="p-4 font-medium">Level</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Due</th>
                    <th className="p-4 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-border/60 last:border-0">
                      <td className="p-4 font-medium">{o.reference}</td>
                      <td className="p-4">{o.service.title}</td>
                      <td className="p-4 text-muted-foreground">{levelLabel(o.academicLevel)}</td>
                      <td className="p-4"><Badge variant="soft">{statusToStage(o.status)}</Badge></td>
                      <td className="p-4 text-muted-foreground">{o.dueAt ? formatDate(o.dueAt) : "—"}</td>
                      <td className="p-4 text-right font-medium tabular-nums">{formatCurrency(o.amountNgn)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
