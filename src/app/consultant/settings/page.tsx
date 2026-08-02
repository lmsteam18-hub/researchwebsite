import { Settings } from "lucide-react";
import { dashDisplayUser } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionPlaceholder } from "@/components/dashboard/section-placeholder";

export const metadata = { title: "Settings" };

export default async function ConsultantSettingsPage() {
  const user = await dashDisplayUser();
  return (
    <DashboardShell role="consultant" user={user}>
      <SectionPlaceholder
        title="Settings"
        icon={Settings}
        description="Manage your consultant profile, disciplines, rates and payout details here soon."
        backHref="/consultant"
      />
    </DashboardShell>
  );
}
