import {
  BadgePercent,
  Briefcase,
  DollarSign,
  FolderKanban,
  Gift,
  LayoutDashboard,
  LifeBuoy,
  type LucideIcon,
  MessageSquare,
  Newspaper,
  Receipt,
  Search,
  Settings,
  ShoppingCart,
  Star,
  Users,
  Wallet,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export type DashboardRole = "client" | "consultant" | "admin";

export const clientNav: NavItem[] = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "My orders", href: "/dashboard/orders", icon: FolderKanban },
  { title: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { title: "Invoices", href: "/dashboard/invoices", icon: Receipt },
  { title: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const consultantNav: NavItem[] = [
  { title: "Overview", href: "/consultant", icon: LayoutDashboard },
  { title: "Projects", href: "/consultant/projects", icon: Briefcase },
  { title: "Messages", href: "/consultant/messages", icon: MessageSquare },
  { title: "Earnings", href: "/consultant/earnings", icon: DollarSign },
  { title: "Reviews", href: "/consultant/reviews", icon: Star },
  { title: "Settings", href: "/consultant/settings", icon: Settings },
];

export const adminNav: NavItem[] = [
  { title: "Analytics", href: "/admin", icon: LayoutDashboard },
  { title: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { title: "Clients", href: "/admin/clients", icon: Users },
  { title: "Consultants", href: "/admin/consultants", icon: Users },
  { title: "Support", href: "/admin/support", icon: LifeBuoy },
  { title: "Coupons", href: "/admin/coupons", icon: BadgePercent },
  { title: "Referrals", href: "/admin/referrals", icon: Gift },
  { title: "Blog / CMS", href: "/admin/blog", icon: Newspaper },
  { title: "SEO", href: "/admin/seo", icon: Search },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

export const navByRole: Record<DashboardRole, NavItem[]> = {
  client: clientNav,
  consultant: consultantNav,
  admin: adminNav,
};
