import { BadgePercent } from "lucide-react";
import { dashDisplayUser } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionPlaceholder } from "@/components/dashboard/section-placeholder";

export const metadata = { title: "Coupons — Admin" };

export default async function AdminCouponsPage() {
  const user = await dashDisplayUser();
  return (
    <DashboardShell role="admin" user={user}>
      <SectionPlaceholder title="Coupon codes" icon={BadgePercent} description="Create and manage discount codes and their redemption limits here soon." backHref="/admin" />
    </DashboardShell>
  );
}
