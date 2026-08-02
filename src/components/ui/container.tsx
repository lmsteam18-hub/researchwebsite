import * as React from "react";
import { cn } from "@/lib/utils";

/** Centered max-width container with responsive gutters. */
export function Container({
  className,
  as: Comp = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: React.ElementType }) {
  return (
    <Comp
      className={cn("mx-auto w-full px-5 sm:px-8 lg:px-16 xl:px-[200px]", className)}
      {...props}
    />
  );
}
