import { auth, dashDisplayUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { initials } from "@/lib/utils";

export const metadata = { title: "Consultants — Admin" };

export default async function AdminConsultantsPage() {
  await auth();
  const consultants = await prisma.user.findMany({
    where: { role: "CONSULTANT" },
    orderBy: { createdAt: "desc" },
    include: { consultantProfile: true, _count: { select: { assignedOrders: true } } },
  });
  const user = await dashDisplayUser();

  return (
    <DashboardShell role="admin" user={user}>
      <div>
        <h1 className="font-display text-2xl font-bold">Consultants</h1>
        <p className="text-muted-foreground">{consultants.length} consultant{consultants.length === 1 ? "" : "s"}</p>
      </div>
      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Headline</th>
                  <th className="p-4 font-medium">Vetted</th>
                  <th className="p-4 text-right font-medium">Rating</th>
                  <th className="p-4 text-right font-medium">Assigned</th>
                </tr>
              </thead>
              <tbody>
                {consultants.map((c) => (
                  <tr key={c.id} className="border-b border-border/60 last:border-0">
                    <td className="p-4">
                      <span className="flex items-center gap-2.5">
                        <span className="grid size-8 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                          {initials(c.name ?? c.email)}
                        </span>
                        <span className="font-medium">{c.name ?? "—"}</span>
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{c.consultantProfile?.headline ?? "—"}</td>
                    <td className="p-4">
                      {c.consultantProfile?.isVetted ? <Badge variant="success">Vetted</Badge> : <Badge variant="warning">Pending</Badge>}
                    </td>
                    <td className="p-4 text-right tabular-nums">{c.consultantProfile?.rating?.toFixed(1) ?? "—"}</td>
                    <td className="p-4 text-right font-medium tabular-nums">{c._count.assignedOrders}</td>
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
