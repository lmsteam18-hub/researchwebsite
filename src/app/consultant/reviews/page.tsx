import { Star } from "lucide-react";
import { dashDisplayUser } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionPlaceholder } from "@/components/dashboard/section-placeholder";

export const metadata = { title: "Reviews" };

export default async function ConsultantReviewsPage() {
  const user = await dashDisplayUser();
  return (
    <DashboardShell role="consultant" user={user}>
      <SectionPlaceholder
        title="Reviews"
        icon={Star}
        description="Client ratings and reviews of your work will appear here soon."
        backHref="/consultant"
      />
    </DashboardShell>
  );
}
