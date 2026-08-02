/**
 * Pricing model inputs. All prices computed in NGN (base currency),
 * then converted client-side via siteConfig.currencies rates.
 */

export interface AcademicLevel {
  id: string;
  label: string;
  factor: number;
}

export const academicLevels: AcademicLevel[] = [
  { id: "secondary", label: "Secondary / A-Level", factor: 0.75 },
  { id: "undergraduate", label: "Undergraduate", factor: 1.0 },
  { id: "masters", label: "Master's", factor: 1.35 },
  { id: "phd", label: "PhD / Doctorate", factor: 1.8 },
  { id: "professional", label: "Professional / Industry", factor: 1.5 },
];

export interface DeadlineOption {
  id: string;
  label: string;
  hours: number;
  /** Urgency multiplier — shorter deadlines cost more. */
  factor: number;
}

export const deadlineOptions: DeadlineOption[] = [
  { id: "12h", label: "12 hours", hours: 12, factor: 2.0 },
  { id: "24h", label: "24 hours", hours: 24, factor: 1.7 },
  { id: "2d", label: "2 days", hours: 48, factor: 1.45 },
  { id: "3d", label: "3 days", hours: 72, factor: 1.25 },
  { id: "5d", label: "5 days", hours: 120, factor: 1.1 },
  { id: "7d", label: "1 week", hours: 168, factor: 1.0 },
  { id: "14d", label: "2 weeks", hours: 336, factor: 0.9 },
  { id: "30d", label: "1 month+", hours: 720, factor: 0.82 },
];

/** Base rate per page (≈275 words) in NGN before any factors. */
export const BASE_PRICE_PER_PAGE_NGN = 3500;

/** Base project fee (for non-per-page services like formatting). */
export const BASE_PROJECT_FEE_NGN = 15000;

export const WORDS_PER_PAGE = 275;
