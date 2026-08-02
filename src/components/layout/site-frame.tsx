"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";

/** Marketing chrome (navbar/footer/WhatsApp) is hidden on app + auth routes. */
const BARE_PREFIXES = ["/dashboard", "/consultant", "/admin", "/login", "/register"];

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  return (
    <>
      {!bare && <ScrollProgress />}
      {!bare && <Navbar />}
      <main id="main">{children}</main>
      {!bare && <Footer />}
      {!bare && <WhatsAppButton />}
      {!bare && <BackToTop />}
    </>
  );
}
