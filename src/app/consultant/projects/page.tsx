import { Briefcase } from "lucide-react";
import { dashDisplayUser } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionPlaceholder } from "@/components/dashboard/section-placeholder";

export const metadata = { title: "Projects" };

export default async function ConsultantProjectsPage() {
  const user = await dashDisplayUser();
  return (
    <DashboardShell role="consultant" user={user}>
      <SectionPlaceholder
        title="Projects"
        icon={Briefcase}
        description="Your full assigned-projects workspace with milestones and deliverable uploads is being built."
        backHref="/consultant"
      />
    </DashboardShell>
  );
}
