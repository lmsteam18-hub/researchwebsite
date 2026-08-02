"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { siteConfig } from "@/config/site";

type Currency = (typeof siteConfig.currencies)[number];

interface CurrencyState {
  currency: Currency;
  setCurrency: (code: string) => void;
}

/** Global currency preference, persisted to localStorage. */
export const useCurrency = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: siteConfig.currencies[0],
      setCurrency: (code) =>
        set({
          currency:
            siteConfig.currencies.find((c) => c.code === code) ??
            siteConfig.currencies[0],
        }),
    }),
    { name: "scholiva-currency" },
  ),
);
