import {
  FileText,
  MessagesSquare,
  Search,
  ShieldCheck,
  UploadCloud,
  Wallet,
} from "lucide-react";

/** Homepage "How it works" steps. */
export const howItWorks = [
  {
    icon: UploadCloud,
    title: "Upload your project",
    description:
      "Share your brief, files and deadline through our secure, encrypted uploader — up to 500MB across 15+ file types.",
  },
  {
    icon: Search,
    title: "Get matched & quoted",
    description:
      "We match you with a vetted consultant in your discipline and send a transparent, itemised quotation instantly.",
  },
  {
    icon: MessagesSquare,
    title: "Collaborate in real time",
    description:
      "Chat directly with your consultant, track milestones and watch progress update live on every order.",
  },
  {
    icon: Wallet,
    title: "Pay securely & download",
    description:
      "Pay with Paystack, Flutterwave, Stripe, Apple Pay or Google Pay. Download deliverables and request revisions.",
  },
];

/** Security & trust pillars. */
export const securityPillars = [
  { icon: ShieldCheck, title: "Bank-grade SSL", description: "All traffic encrypted in transit with TLS 1.3." },
  { icon: FileText, title: "Encrypted uploads", description: "Files encrypted at rest and access-controlled." },
  { icon: ShieldCheck, title: "GDPR & NDPR compliant", description: "Data handled to EU and Nigerian standards." },
  { icon: ShieldCheck, title: "Role-based access", description: "Strict separation of client, consultant & admin." },
  { icon: ShieldCheck, title: "2FA available", description: "Optional two-factor authentication on every account." },
  { icon: Wallet, title: "Secure payments", description: "PCI-DSS compliant processors, never storing your card." },
];

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  avatar: string; // initials-based fallback used in UI
  rating: number;
  quote: string;
  service: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Adaeze Okafor",
    role: "PhD Candidate, Public Health",
    location: "University of Ibadan, Nigeria",
    avatar: "AO",
    rating: 5,
    quote:
      "My SPSS analysis chapter went from overwhelming to defensible. The consultant explained every output so I could own it in my viva.",
    service: "SPSS Analysis",
  },
  {
    name: "Daniel Mensah",
    role: "Master's Student, Economics",
    location: "Diaspora — Manchester, UK",
    avatar: "DM",
    rating: 5,
    quote:
      "The proposal support helped me get approval on the first submission. Clear structure, sharp objectives, and completely original.",
    service: "Research Proposal",
  },
  {
    name: "Fatima Bello",
    role: "Lecturer, Nursing",
    location: "Ahmadu Bello University, Nigeria",
    avatar: "FB",
    rating: 5,
    quote:
      "Journal publication support was worth every naira. They matched me to the right journal and helped me respond to reviewers.",
    service: "Journal Publication Support",
  },
  {
    name: "Kwame Asante",
    role: "Postgraduate, Engineering",
    location: "KNUST, Ghana",
    avatar: "KA",
    rating: 5,
    quote:
      "Fast, professional proofreading with tracked changes. My supervisor noticed the improvement in clarity immediately.",
    service: "Proofreading",
  },
  {
    name: "Chidinma Eze",
    role: "Undergraduate, Psychology",
    location: "Diaspora — Toronto, Canada",
    avatar: "CE",
    rating: 5,
    quote:
      "The pricing was transparent and the progress tracker kept me calm. I always knew exactly where my dissertation stood.",
    service: "Dissertation Support",
  },
  {
    name: "Ibrahim Yusuf",
    role: "Master's Student, Computer Science",
    location: "Bayero University, Nigeria",
    avatar: "IY",
    rating: 5,
    quote:
      "Python analysis delivered as a clean, commented notebook. I finally understood my own methodology.",
    service: "Python Analysis",
  },
];

/** Fictional partner institutions shown as a trust marquee. */
export const universityLogos = [
  "University of Ibadan",
  "University of Lagos",
  "Ahmadu Bello University",
  "University of Nigeria",
  "Covenant University",
  "KNUST",
  "University of Ghana",
  "Makerere University",
];

export interface Faq {
  question: string;
  answer: string;
  category: string;
}

export const faqs: Faq[] = [
  {
    category: "Academic Integrity",
    question: "Is using Scholiva ethical? Will you write my assignment for me?",
    answer:
      "Scholiva provides research support, coaching, editing and analysis — not ghostwritten work for submission as your own. Our services (proofreading, formatting, data analysis, structural guidance and consultation) are designed to help you learn and produce your own stronger work. We uphold a strict Academic Integrity Policy.",
  },
  {
    category: "Delivery Time",
    question: "How fast can you deliver?",
    answer:
      "Turnaround depends on scope and service. We offer deadlines from 12 hours to a month or more. Urgent options are available on most services, and your live progress tracker shows real-time status.",
  },
  {
    category: "Payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept Paystack and Flutterwave (cards, bank transfer, USSD across Africa), Stripe (international cards, Apple Pay and Google Pay), and direct bank transfer. All payments are processed by PCI-DSS compliant providers.",
  },
  {
    category: "Revisions",
    question: "Do you offer revisions?",
    answer:
      "Yes. Every order includes free revisions within the agreed scope. Simply request a revision from your dashboard and your consultant will address it within the revision window.",
  },
  {
    category: "Refund Policy",
    question: "What is your refund policy?",
    answer:
      "If a deliverable doesn't meet the agreed brief and can't be corrected through revisions, you're eligible for a partial or full refund per our Refund Policy. Funds are held securely until you approve delivery.",
  },
  {
    category: "Confidentiality",
    question: "Is my work kept confidential?",
    answer:
      "Absolutely. Your identity, files and communications are private and encrypted. We never share your data, and consultants operate under strict confidentiality agreements. We are GDPR and NDPR compliant.",
  },
  {
    category: "Privacy",
    question: "How is my personal data handled?",
    answer:
      "We collect only what's needed to deliver your project, store it encrypted, and process it in line with GDPR and Nigeria's NDPR. You can request export or deletion of your data at any time.",
  },
  {
    category: "Payment",
    question: "Can I pay in my local currency?",
    answer:
      "Yes. Prices display in Naira by default, and you can switch to USD, GBP, EUR, CAD or ZAR. You'll be charged in the currency your payment provider supports.",
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
  author: string;
  cover: string; // gradient key used by UI
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-write-a-thesis",
    title: "How to Write a Thesis: A Chapter-by-Chapter Guide",
    excerpt:
      "A practical roadmap from proposal to defense — structuring each chapter, staying on schedule, and keeping your argument coherent.",
    category: "Dissertation Tips",
    readingTime: "12 min read",
    date: "2026-06-28",
    author: "Dr. A. Okonkwo",
    cover: "from-brand-500 to-accent-500",
  },
  {
    slug: "apa-7-referencing-guide",
    title: "The Complete APA 7th Edition Referencing Guide",
    excerpt:
      "In-text citations, reference lists, DOIs and common mistakes — everything you need to reference flawlessly in APA 7.",
    category: "Referencing",
    readingTime: "9 min read",
    date: "2026-06-15",
    author: "Scholiva Editorial",
    cover: "from-accent-500 to-brand-400",
  },
  {
    slug: "research-methodology-explained",
    title: "Research Methodology Explained (With Examples)",
    excerpt:
      "Qualitative, quantitative and mixed methods — how to choose, justify and describe your methodology with confidence.",
    category: "Research Methodology",
    readingTime: "14 min read",
    date: "2026-05-30",
    author: "Dr. F. Bello",
    cover: "from-brand-600 to-accent-400",
  },
  {
    slug: "spss-tutorial-beginners",
    title: "SPSS for Beginners: Your First Analysis in 30 Minutes",
    excerpt:
      "From importing data to running a t-test and interpreting the output — a gentle, screenshot-free walkthrough.",
    category: "SPSS Tutorials",
    readingTime: "11 min read",
    date: "2026-05-18",
    author: "Scholiva Data Team",
    cover: "from-accent-600 to-brand-500",
  },
  {
    slug: "dissertation-tips-that-work",
    title: "10 Dissertation Tips That Actually Work",
    excerpt:
      "Battle-tested advice from consultants who've guided thousands of dissertations to successful completion.",
    category: "Dissertation Tips",
    readingTime: "8 min read",
    date: "2026-05-02",
    author: "Scholiva Editorial",
    cover: "from-brand-400 to-accent-600",
  },
  {
    slug: "journal-publication-guide",
    title: "Getting Published: A Guide to Academic Journals",
    excerpt:
      "How to select the right journal, format your manuscript, and respond to reviewers without losing your mind.",
    category: "Journal Publication Guide",
    readingTime: "13 min read",
    date: "2026-04-20",
    author: "Dr. A. Okonkwo",
    cover: "from-accent-500 to-brand-600",
  },
  {
    slug: "research-ethics-essentials",
    title: "Research Ethics Essentials Every Student Should Know",
    excerpt:
      "Informed consent, data protection, plagiarism and integrity — the ethical foundations of credible research.",
    category: "Research Ethics",
    readingTime: "10 min read",
    date: "2026-04-05",
    author: "Scholiva Editorial",
    cover: "from-brand-500 to-accent-500",
  },
];

/** Order lifecycle stages used by the tracking timeline. */
export const orderStages = [
  "Submitted",
  "Assigned",
  "In Progress",
  "Quality Check",
  "Revision",
  "Completed",
  "Delivered",
] as const;
