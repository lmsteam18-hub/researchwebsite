import { Settings } from "lucide-react";
import { dashDisplayUser } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionPlaceholder } from "@/components/dashboard/section-placeholder";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const user = await dashDisplayUser();
  return (
    <DashboardShell role="client" user={user}>
      <SectionPlaceholder
        title="Settings"
        icon={Settings}
        description="Manage your profile, password, notifications and two-factor authentication here soon."
      />
    </DashboardShell>
  );
}
