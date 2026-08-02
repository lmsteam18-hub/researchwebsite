import { Newspaper } from "lucide-react";
import { dashDisplayUser } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionPlaceholder } from "@/components/dashboard/section-placeholder";

export const metadata = { title: "Blog / CMS — Admin" };

export default async function AdminBlogPage() {
  const user = await dashDisplayUser();
  return (
    <DashboardShell role="admin" user={user}>
      <SectionPlaceholder title="Blog / CMS" icon={Newspaper} description="A content editor to create and publish blog posts is being built. Posts currently live in the codebase." backHref="/admin" />
    </DashboardShell>
  );
}
