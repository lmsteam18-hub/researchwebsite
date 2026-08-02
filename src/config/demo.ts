import { orderStages } from "./content";

/** Demo data powering the dashboard UIs (until wired to Prisma). */

export interface DemoOrder {
  reference: string;
  service: string;
  subject: string;
  level: string;
  stage: (typeof orderStages)[number];
  progress: number;
  amountNgn: number;
  dueAt: string;
  consultant: string;
  unread: number;
}

export const demoOrders: DemoOrder[] = [
  {
    reference: "SCH-000128",
    service: "SPSS Analysis",
    subject: "Public Health",
    level: "Master's",
    stage: "In Progress",
    progress: 45,
    amountNgn: 84000,
    dueAt: "2026-07-20",
    consultant: "Dr. Amina Okonkwo",
    unread: 2,
  },
  {
    reference: "SCH-000119",
    service: "Proofreading",
    subject: "Law",
    level: "Undergraduate",
    stage: "Quality Check",
    progress: 80,
    amountNgn: 32000,
    dueAt: "2026-07-17",
    consultant: "T. Adeyemi",
    unread: 0,
  },
  {
    reference: "SCH-000102",
    service: "Research Proposal",
    subject: "Business",
    level: "PhD",
    stage: "Delivered",
    progress: 100,
    amountNgn: 156000,
    dueAt: "2026-07-05",
    consultant: "Dr. K. Nwosu",
    unread: 0,
  },
];

export const demoMessages = [
  { from: "Dr. Amina Okonkwo", me: false, body: "I've completed the descriptive statistics — sharing a draft now.", time: "09:24" },
  { from: "You", me: true, body: "Thank you! Could you also include the reliability analysis?", time: "09:31" },
  { from: "Dr. Amina Okonkwo", me: false, body: "Absolutely, Cronbach's alpha is 0.87 — I'll add the table.", time: "09:33" },
];

export const demoInvoices = [
  { number: "INV-2026-0128", ref: "SCH-000128", amountNgn: 84000, status: "Paid", date: "2026-07-12" },
  { number: "INV-2026-0119", ref: "SCH-000119", amountNgn: 32000, status: "Paid", date: "2026-07-10" },
  { number: "INV-2026-0102", ref: "SCH-000102", amountNgn: 156000, status: "Paid", date: "2026-06-28" },
];

// Consultant
export const consultantStats = [
  { label: "Active projects", value: "6" },
  { label: "This month earnings", value: "₦742,000" },
  { label: "Avg. rating", value: "4.9" },
  { label: "On-time delivery", value: "98%" },
];

export const consultantJobs = [
  { reference: "SCH-000128", client: "D. Mensah", service: "SPSS Analysis", stage: "In Progress", due: "2026-07-20", payoutNgn: 58000 },
  { reference: "SCH-000131", client: "A. Bello", service: "Literature Review", stage: "Assigned", due: "2026-07-24", payoutNgn: 71000 },
  { reference: "SCH-000126", client: "C. Eze", service: "Questionnaire Design", stage: "Quality Check", due: "2026-07-16", payoutNgn: 33000 },
];

// Admin
export const adminStats = [
  { label: "Revenue (30d)", value: "₦8.4M", delta: "+12.5%", up: true },
  { label: "Orders (30d)", value: "412", delta: "+8.2%", up: true },
  { label: "Pending jobs", value: "37", delta: "-4.1%", up: false },
  { label: "Active consultants", value: "128", delta: "+3.0%", up: true },
];

export const adminRevenueSeries = [42, 55, 48, 63, 72, 68, 80, 76, 90, 88, 96, 110];

export const adminRecentOrders = [
  { ref: "SCH-000132", client: "F. Bello", service: "Journal Publication", amountNgn: 142000, status: "In Progress" },
  { ref: "SCH-000131", client: "A. Bello", service: "Literature Review", amountNgn: 71000, status: "Assigned" },
  { ref: "SCH-000130", client: "I. Yusuf", service: "Python Analysis", amountNgn: 98000, status: "Submitted" },
  { ref: "SCH-000129", client: "K. Asante", service: "Proofreading", amountNgn: 29000, status: "Delivered" },
];

export const adminTickets = [
  { id: "TK-441", user: "D. Mensah", subject: "Revision request on SCH-000128", status: "Open" },
  { id: "TK-438", user: "A. Bello", subject: "Invoice query", status: "Pending" },
  { id: "TK-430", user: "C. Eze", subject: "Deadline extension", status: "Resolved" },
];
