import { LifeBuoy } from "lucide-react";
import { dashDisplayUser } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionPlaceholder } from "@/components/dashboard/section-placeholder";

export const metadata = { title: "Support — Admin" };

export default async function AdminSupportPage() {
  const user = await dashDisplayUser();
  return (
    <DashboardShell role="admin" user={user}>
      <SectionPlaceholder title="Support tickets" icon={LifeBuoy} description="A full ticket queue with assignment and replies is being built." backHref="/admin" />
    </DashboardShell>
  );
}
