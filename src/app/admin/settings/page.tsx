import { Settings } from "lucide-react";
import { dashDisplayUser } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionPlaceholder } from "@/components/dashboard/section-placeholder";

export const metadata = { title: "Settings — Admin" };

export default async function AdminSettingsPage() {
  const user = await dashDisplayUser();
  return (
    <DashboardShell role="admin" user={user}>
      <SectionPlaceholder title="Platform settings" icon={Settings} description="Global configuration — pricing factors, payment providers, email and integrations — will be managed here soon." backHref="/admin" />
    </DashboardShell>
  );
}
