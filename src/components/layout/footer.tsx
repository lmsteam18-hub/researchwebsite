import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { footerNav, siteConfig } from "@/config/site";
import { Logo } from "./logo";
import { NewsletterForm } from "./newsletter-form";

const socialIcons = [
  { icon: Twitter, href: siteConfig.socials.twitter, label: "Twitter" },
  { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: siteConfig.socials.instagram, label: "Instagram" },
  { icon: Facebook, href: siteConfig.socials.facebook, label: "Facebook" },
  { icon: Youtube, href: siteConfig.socials.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-muted/40">
      <div className="mx-auto w-full px-5 py-16 sm:px-8 lg:px-16 xl:px-[200px]">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>

            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold">Join the research newsletter</p>
              <p className="mb-3 text-xs text-muted-foreground">
                Study tips, guides and offers. No spam, unsubscribe anytime.
              </p>
              <NewsletterForm />
            </div>

            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-brand-500" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-foreground">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-brand-500" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-foreground">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-brand-500" />
                {siteConfig.contact.address}
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {Object.entries(footerNav).map(([heading, links]) => (
              <div key={heading}>
                <h3 className="text-sm font-semibold">{heading}</h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socialIcons.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-300 hover:text-brand-600"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-success" /> All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
