"use client";

import { useCurrency } from "@/lib/store";
import { siteConfig } from "@/config/site";
import { Select } from "@/components/ui/select";

export function CurrencySelector({ className }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  return (
    <Select
      aria-label="Select currency"
      value={currency.code}
      onChange={(e) => setCurrency(e.target.value)}
      className={className ?? "h-9 w-[92px] rounded-full text-xs"}
    >
      {siteConfig.currencies.map((c) => (
        <option key={c.code} value={c.code}>
          {c.symbol} {c.code}
        </option>
      ))}
    </Select>
  );
}
