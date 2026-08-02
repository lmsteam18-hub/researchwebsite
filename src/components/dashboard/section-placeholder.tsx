import Link from "next/link";
import { Rocket, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Consistent "in progress" panel for dashboard sections that are routed and
 * navigable but not yet fully built out.
 */
export function SectionPlaceholder({
  title,
  description,
  icon: Icon = Rocket,
  backHref = "/dashboard",
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
  backHref?: string;
}) {
  return (
    <>
      <h1 className="font-display text-2xl font-bold">{title}</h1>
      <Card className="mt-6">
        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-brand-gradient-soft text-brand-600 dark:text-brand-300">
            <Icon className="size-7" />
          </span>
          <p className="font-display text-lg font-semibold">We&apos;re building this</p>
          <p className="max-w-md text-sm text-muted-foreground">{description}</p>
          <Button asChild variant="outline" className="mt-2">
            <Link href={backHref}>Back to overview</Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
