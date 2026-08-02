import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { orderStages } from "@/config/content";

export function OrderTimeline({ current }: { current: (typeof orderStages)[number] }) {
  const currentIndex = orderStages.indexOf(current);
  return (
    <ol className="relative flex flex-col gap-0 sm:flex-row sm:items-start sm:gap-0">
      {orderStages.map((stage, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li key={stage} className="relative flex flex-1 items-center gap-3 sm:flex-col sm:text-center">
            {/* Connector */}
            {i < orderStages.length - 1 && (
              <span
                className={cn(
                  "absolute left-3.5 top-8 h-full w-px sm:left-auto sm:top-3.5 sm:h-px sm:w-full sm:translate-x-1/2",
                  done ? "bg-brand-500" : "bg-border",
                )}
              />
            )}
            <span
              className={cn(
                "relative z-10 grid size-7 shrink-0 place-items-center rounded-full border-2 text-xs font-bold transition-colors sm:mx-auto",
                done && "border-brand-500 bg-brand-500 text-white",
                active && "border-brand-500 bg-brand-gradient text-white shadow-glow",
                !done && !active && "border-border bg-card text-muted-foreground",
              )}
            >
              {done ? <Check className="size-4" /> : i + 1}
            </span>
            <span className={cn("py-2 text-xs font-medium sm:py-0", active ? "text-foreground" : "text-muted-foreground")}>
              {stage}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
