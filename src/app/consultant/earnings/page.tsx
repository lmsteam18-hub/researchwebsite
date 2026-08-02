import { DollarSign } from "lucide-react";
import { dashDisplayUser } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionPlaceholder } from "@/components/dashboard/section-placeholder";

export const metadata = { title: "Earnings" };

export default async function ConsultantEarningsPage() {
  const user = await dashDisplayUser();
  return (
    <DashboardShell role="consultant" user={user}>
      <SectionPlaceholder
        title="Earnings"
        icon={DollarSign}
        description="Detailed earnings, payout history and withdrawal requests will live here soon."
        backHref="/consultant"
      />
    </DashboardShell>
  );
}
