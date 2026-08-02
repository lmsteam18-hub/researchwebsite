import { redirect } from "next/navigation";
import { auth, dashDisplayUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata = { title: "Invoices" };

export default async function InvoicesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const invoices = await prisma.invoice.findMany({
    where: { order: { clientId: session.user.id } },
    orderBy: { issuedAt: "desc" },
    include: { order: { select: { reference: true, payment: { select: { status: true } } } } },
  });
  const user = await dashDisplayUser();

  return (
    <DashboardShell role="client" user={user}>
      <div>
        <h1 className="font-display text-2xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">{invoices.length} invoice{invoices.length === 1 ? "" : "s"}</p>
      </div>

      <Card className="mt-6">
        <CardContent className="p-0">
          {invoices.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground">No invoices yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="p-4 font-medium">Invoice</th>
                    <th className="p-4 font-medium">Order</th>
                    <th className="p-4 font-medium">Issued</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-border/60 last:border-0">
                      <td className="p-4 font-medium">{inv.number}</td>
                      <td className="p-4 text-muted-foreground">{inv.order.reference}</td>
                      <td className="p-4 text-muted-foreground">{formatDate(inv.issuedAt)}</td>
                      <td className="p-4">
                        <Badge variant={inv.order.payment?.status === "SUCCEEDED" ? "success" : "warning"}>
                          {inv.order.payment?.status === "SUCCEEDED" ? "Paid" : "Pending"}
                        </Badge>
                      </td>
                      <td className="p-4 text-right font-medium tabular-nums">{formatCurrency(inv.amount)}</td>
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
