import { Wallet } from "lucide-react";
import { dashDisplayUser } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionPlaceholder } from "@/components/dashboard/section-placeholder";

export const metadata = { title: "Wallet" };

export default async function WalletPage() {
  const user = await dashDisplayUser();
  return (
    <DashboardShell role="client" user={user}>
      <SectionPlaceholder
        title="Wallet"
        icon={Wallet}
        description="Top up a balance, apply credits and pay for orders from your wallet. This is coming soon."
      />
    </DashboardShell>
  );
}
