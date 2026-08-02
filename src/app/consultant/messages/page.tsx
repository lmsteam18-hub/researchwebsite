import { MessageSquare } from "lucide-react";
import { dashDisplayUser } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionPlaceholder } from "@/components/dashboard/section-placeholder";

export const metadata = { title: "Messages" };

export default async function ConsultantMessagesPage() {
  const user = await dashDisplayUser();
  return (
    <DashboardShell role="consultant" user={user}>
      <SectionPlaceholder
        title="Messages"
        icon={MessageSquare}
        description="Real-time client messaging for consultants is coming soon."
        backHref="/consultant"
      />
    </DashboardShell>
  );
}
