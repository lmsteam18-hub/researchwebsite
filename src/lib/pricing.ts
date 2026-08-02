import {
  BASE_PRICE_PER_PAGE_NGN,
  BASE_PROJECT_FEE_NGN,
  academicLevels,
  deadlineOptions,
} from "@/config/pricing";
import { getService } from "@/config/services";
import { getSubject } from "@/config/subjects";

export interface QuoteInput {
  serviceSlug: string;
  levelId: string;
  deadlineId: string;
  pages: number;
  subject?: string;
  /** Additional add-ons, each with a flat NGN cost. */
  addons?: { plagiarismReport?: boolean; premiumConsultant?: boolean };
}

export interface QuoteResult {
  base: number;
  subtotal: number;
  urgencyMultiplier: number;
  levelMultiplier: number;
  subjectMultiplier: number;
  serviceMultiplier: number;
  addonsTotal: number;
  total: number;
  pricePerPage: number;
  breakdown: { label: string; amount: number }[];
}

const ADDON_PLAGIARISM_NGN = 5000;
const ADDON_PREMIUM_NGN = 12000;

/**
 * Deterministic pricing engine used by both the client calculator and
 * the server order endpoint so quotes always match.
 */
export function computeQuote(input: QuoteInput): QuoteResult {
  const service = getService(input.serviceSlug);
  const level = academicLevels.find((l) => l.id === input.levelId);
  const deadline = deadlineOptions.find((d) => d.id === input.deadlineId);
  const subject = input.subject ? getSubject(input.subject) : undefined;

  const serviceMultiplier = service?.priceFactor ?? 1;
  const levelMultiplier = level?.factor ?? 1;
  const urgencyMultiplier = deadline?.factor ?? 1;
  const subjectMultiplier = subject?.complexity ?? 1;
  const perPage = service?.perPage ?? true;

  const pages = Math.max(1, Math.floor(input.pages || 1));

  // Per-page services scale with page count; project services use a flat base.
  const base = perPage
    ? BASE_PRICE_PER_PAGE_NGN * pages
    : BASE_PROJECT_FEE_NGN;

  const subtotal =
    base *
    serviceMultiplier *
    levelMultiplier *
    urgencyMultiplier *
    subjectMultiplier;

  let addonsTotal = 0;
  if (input.addons?.plagiarismReport) addonsTotal += ADDON_PLAGIARISM_NGN;
  if (input.addons?.premiumConsultant) addonsTotal += ADDON_PREMIUM_NGN;

  const total = Math.round((subtotal + addonsTotal) / 100) * 100; // round to ₦100

  const breakdown = [
    {
      label: perPage ? `Base (${pages} page${pages > 1 ? "s" : ""})` : "Base project fee",
      amount: Math.round(base),
    },
    { label: `Service: ${service?.title ?? "—"}`, amount: Math.round(base * (serviceMultiplier - 1)) },
    { label: `Level: ${level?.label ?? "—"}`, amount: Math.round(base * serviceMultiplier * (levelMultiplier - 1)) },
    {
      label: `Urgency: ${deadline?.label ?? "—"}`,
      amount: Math.round(base * serviceMultiplier * levelMultiplier * (urgencyMultiplier - 1)),
    },
    ...(subjectMultiplier !== 1
      ? [
          {
            label: `Subject complexity: ${input.subject}`,
            amount: Math.round(
              base * serviceMultiplier * levelMultiplier * urgencyMultiplier * (subjectMultiplier - 1),
            ),
          },
        ]
      : []),
    ...(input.addons?.plagiarismReport
      ? [{ label: "Plagiarism report", amount: ADDON_PLAGIARISM_NGN }]
      : []),
    ...(input.addons?.premiumConsultant
      ? [{ label: "Premium consultant", amount: ADDON_PREMIUM_NGN }]
      : []),
  ];

  return {
    base: Math.round(base),
    subtotal: Math.round(subtotal),
    urgencyMultiplier,
    levelMultiplier,
    subjectMultiplier,
    serviceMultiplier,
    addonsTotal,
    total,
    pricePerPage: perPage ? Math.round(subtotal / pages) : 0,
    breakdown,
  };
}

/** Convert a base-NGN amount to another supported currency. */
export function convertCurrency(amountNgn: number, rate: number) {
  return amountNgn * rate;
}
