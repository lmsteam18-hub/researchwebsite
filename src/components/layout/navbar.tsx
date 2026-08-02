"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mainNav } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { CurrencySelector } from "./currency-selector";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div className="mx-auto w-full px-5 sm:px-8 lg:px-16 xl:px-[200px]">
          <nav
            className={cn(
              "flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300",
              scrolled
                ? "glass-strong"
                : "border border-transparent bg-transparent",
            )}
            aria-label="Primary"
          >
            <Logo />

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 lg:flex">
              {mainNav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                        active && "text-foreground",
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="hidden items-center gap-2 lg:flex">
              <CurrencySelector />
              <ThemeToggle />
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/order">Get a quote</Link>
              </Button>
            </div>

            {/* Mobile controls */}
            <div className="flex items-center gap-1 lg:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="rounded-full"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2 lg:hidden"
          >
            <div className="glass-strong rounded-3xl p-4">
              <ul className="flex flex-col">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
                <CurrencySelector />
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/order">Get a quote</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
