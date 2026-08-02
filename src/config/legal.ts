import { siteConfig } from "./site";

export interface LegalDoc {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}

export const legalDocs: LegalDoc[] = [
  {
    slug: "academic-integrity",
    title: "Academic Integrity Policy",
    updated: "2026-07-01",
    intro: `${siteConfig.name} is committed to supporting genuine learning and upholding the highest standards of academic integrity. This policy explains what our services are — and are not.`,
    sections: [
      {
        heading: "Our services are support, not substitution",
        body: [
          "We provide research guidance, coaching, editing, proofreading, formatting, data analysis and consultation. These services are designed to help you learn and produce your own stronger work.",
          "We do not produce ghostwritten assignments, essays or dissertations to be submitted as wholly your own where your institution prohibits it.",
        ],
      },
      {
        heading: "Your responsibilities",
        body: [
          "You are responsible for complying with your institution's rules on collaboration, editing and third-party assistance.",
          "Model answers, samples and analyses we provide are for reference, learning and verification — not for verbatim submission where prohibited.",
        ],
      },
      {
        heading: "How we protect integrity",
        body: [
          "Consultants are trained to coach rather than complete. We include originality checks and encourage proper attribution.",
          "We reserve the right to decline requests that would breach academic-integrity standards.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "2026-07-01",
    intro: `This policy explains how ${siteConfig.name} collects, uses and protects your personal data, in line with the EU GDPR and Nigeria's NDPR.`,
    sections: [
      {
        heading: "Data we collect",
        body: [
          "Account details (name, email, phone), project files and instructions you upload, and payment metadata processed by our providers.",
          "We never store full card details — payments are handled by PCI-DSS compliant processors (Paystack, Flutterwave, Stripe).",
        ],
      },
      {
        heading: "How we use your data",
        body: [
          "To deliver your projects, match you with consultants, process payments, provide support and send transactional emails.",
          "We do not sell your data. Marketing emails are opt-in and you can unsubscribe at any time.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You may request access, correction, export or deletion of your data at any time by contacting " + siteConfig.contact.email + ".",
          "Files are encrypted at rest and in transit, and access is role-restricted.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    updated: "2026-07-01",
    intro: `By using ${siteConfig.name}, you agree to these terms. Please read them carefully.`,
    sections: [
      {
        heading: "Using our platform",
        body: [
          "You must provide accurate information and use the platform lawfully and in line with our Academic Integrity Policy.",
          "Accounts are personal; you are responsible for activity under your account and for keeping your credentials secure.",
        ],
      },
      {
        heading: "Orders, payments & escrow",
        body: [
          "Quotes are estimates until confirmed. Payments are held in escrow and released to consultants upon your approval of delivery.",
          "Prices are shown in your selected currency; you are charged in the currency supported by your payment provider.",
        ],
      },
      {
        heading: "Revisions & refunds",
        body: [
          "Free revisions are provided within the agreed scope. Refunds are governed by our Refund Policy.",
          "We may suspend accounts that breach these terms or our integrity standards.",
        ],
      },
    ],
  },
  {
    slug: "refund",
    title: "Refund Policy",
    updated: "2026-07-01",
    intro: `We want you to be confident when you order. This policy explains when and how refunds are issued.`,
    sections: [
      {
        heading: "Eligibility",
        body: [
          "If a deliverable does not meet the agreed brief and cannot be corrected through revisions, you may be eligible for a partial or full refund.",
          "Refund requests should be raised from your dashboard within the revision window.",
        ],
      },
      {
        heading: "How refunds work",
        body: [
          "Funds are held securely in escrow until you approve delivery, protecting you throughout the process.",
          "Approved refunds are returned to your original payment method, typically within 5–10 business days.",
        ],
      },
      {
        heading: "Exclusions",
        body: [
          "Refunds are not available where work meets the agreed brief, or where a breach of our Academic Integrity Policy is involved.",
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}
