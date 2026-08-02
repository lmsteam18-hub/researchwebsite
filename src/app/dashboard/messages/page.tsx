import { MessageSquare } from "lucide-react";
import { dashDisplayUser } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionPlaceholder } from "@/components/dashboard/section-placeholder";

export const metadata = { title: "Messages" };

export default async function MessagesPage() {
  const user = await dashDisplayUser();
  return (
    <DashboardShell role="client" user={user}>
      <SectionPlaceholder
        title="Messages"
        icon={MessageSquare}
        description="Real-time chat with your consultants is on the way. For now, message threads appear on each order in your overview."
      />
    </DashboardShell>
  );
}
