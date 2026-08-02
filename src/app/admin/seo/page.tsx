import { Search } from "lucide-react";
import { dashDisplayUser } from "@/lib/session";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionPlaceholder } from "@/components/dashboard/section-placeholder";

export const metadata = { title: "SEO — Admin" };

export default async function AdminSeoPage() {
  const user = await dashDisplayUser();
  return (
    <DashboardShell role="admin" user={user}>
      <SectionPlaceholder title="SEO manager" icon={Search} description="Edit meta titles, descriptions and social images per page here soon. Sitemap and robots are already generated automatically." backHref="/admin" />
    </DashboardShell>
  );
}
