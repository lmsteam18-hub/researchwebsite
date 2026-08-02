import { auth, dashDisplayUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, initials } from "@/lib/utils";

export const metadata = { title: "Clients — Admin" };

export default async function AdminClientsPage() {
  await auth();
  const clients = await prisma.user.findMany({
    where: { role: "CLIENT" },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true } } },
  });
  const user = await dashDisplayUser();

  return (
    <DashboardShell role="admin" user={user}>
      <div>
        <h1 className="font-display text-2xl font-bold">Clients</h1>
        <p className="text-muted-foreground">{clients.length} registered client{clients.length === 1 ? "" : "s"}</p>
      </div>
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Country</th>
                  <th className="p-4 font-medium">Joined</th>
                  <th className="p-4 text-right font-medium">Orders</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id} className="border-b border-border/60 last:border-0">
                    <td className="p-4">
                      <span className="flex items-center gap-2.5">
                        <span className="grid size-8 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                          {initials(c.name ?? c.email)}
                        </span>
                        <span className="font-medium">{c.name ?? "—"}</span>
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{c.email}</td>
                    <td className="p-4 text-muted-foreground">{c.country ?? "—"}</td>
                    <td className="p-4 text-muted-foreground">{formatDate(c.createdAt)}</td>
                    <td className="p-4 text-right font-medium tabular-nums">{c._count.orders}</td>
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
