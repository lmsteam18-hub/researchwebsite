/**
 * ─────────────────────────────────────────────────────────────
 * SITE / BRAND CONFIGURATION
 * ─────────────────────────────────────────────────────────────
 * This is the single source of truth for the brand. To rebrand
 * the entire platform, change the values here — the name, tagline,
 * contact details, and social links propagate everywhere.
 */

export const siteConfig = {
  name: "Scholiva",
  legalName: "Scholiva Research Support Ltd.",
  tagline: "Academic research support for Africa & the diaspora",
  description:
    "Scholiva connects students, researchers, lecturers and professionals with vetted academic consultants for research proposals, dissertations, thesis editing, data analysis, proofreading, formatting and publication support.",
  // Used for canonical URLs, Open Graph, sitemap.
  url: "https://scholiva.com",
  ogImage: "/og-image.png",

  contact: {
    email: "hello@scholiva.com",
    supportEmail: "support@scholiva.com",
    phone: "+234 800 000 0000",
    whatsapp: "2348000000000", // international format, no "+"
    address: "Yaba, Lagos, Nigeria",
  },

  socials: {
    twitter: "https://twitter.com/scholiva",
    linkedin: "https://linkedin.com/company/scholiva",
    instagram: "https://instagram.com/scholiva",
    facebook: "https://facebook.com/scholiva",
    youtube: "https://youtube.com/@scholiva",
  },

  // Trust signals surfaced across the marketing site.
  stats: [
    { label: "Projects supported", value: "12,400+" },
    { label: "Vetted consultants", value: "480+" },
    { label: "Disciplines covered", value: "100+" },
    { label: "Average rating", value: "4.9/5" },
  ],

  // Supported currencies for the multi-currency selector.
  currencies: [
    { code: "NGN", symbol: "₦", label: "Nigerian Naira", rate: 1 },
    { code: "USD", symbol: "$", label: "US Dollar", rate: 0.00065 },
    { code: "GBP", symbol: "£", label: "British Pound", rate: 0.00051 },
    { code: "EUR", symbol: "€", label: "Euro", rate: 0.0006 },
    { code: "CAD", symbol: "C$", label: "Canadian Dollar", rate: 0.00089 },
    { code: "ZAR", symbol: "R", label: "South African Rand", rate: 0.012 },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

export const mainNav = [
  { title: "Services", href: "/services" },
  { title: "How it works", href: "/#how-it-works" },
  { title: "Pricing", href: "/pricing" },
  { title: "AI Tools", href: "/ai-tools" },
  { title: "Resources", href: "/blog" },
  { title: "About", href: "/about" },
] as const;

export const footerNav = {
  Company: [
    { title: "About", href: "/about" },
    { title: "How it works", href: "/#how-it-works" },
    { title: "Testimonials", href: "/#testimonials" },
    { title: "Contact", href: "/contact" },
    { title: "Careers", href: "/careers" },
  ],
  Services: [
    { title: "Research Proposal", href: "/services/research-proposal" },
    { title: "Dissertation Support", href: "/services/dissertation-support" },
    { title: "Data Analysis (SPSS/R/Python)", href: "/services/spss-analysis" },
    { title: "Proofreading & Editing", href: "/services/proofreading" },
    { title: "All services", href: "/services" },
  ],
  Tools: [
    { title: "Pricing calculator", href: "/pricing" },
    { title: "Research Topic Generator", href: "/ai-tools#topic-generator" },
    { title: "Citation Generator", href: "/ai-tools#citation-generator" },
    { title: "Resource Library", href: "/resources" },
    { title: "Book a consultation", href: "/consultation" },
  ],
  Legal: [
    { title: "Privacy Policy", href: "/legal/privacy" },
    { title: "Terms of Service", href: "/legal/terms" },
    { title: "Academic Integrity Policy", href: "/legal/academic-integrity" },
    { title: "Refund Policy", href: "/legal/refund" },
  ],
} as const;
