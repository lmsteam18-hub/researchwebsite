import { Gift } from "lucide-react";
import { dashDisplayUser } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionPlaceholder } from "@/components/dashboard/section-placeholder";

export const metadata = { title: "Referrals — Admin" };

export default async function AdminReferralsPage() {
  const user = await dashDisplayUser();
  return (
    <DashboardShell role="admin" user={user}>
      <SectionPlaceholder title="Referral program" icon={Gift} description="Track referral codes, conversions and rewards here soon." backHref="/admin" />
    </DashboardShell>
  );
}
