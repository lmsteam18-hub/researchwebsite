import type { OrderStatus } from "@prisma/client";
import { orderStages } from "@/config/content";

type Stage = (typeof orderStages)[number];

const STATUS_TO_STAGE: Record<OrderStatus, Stage> = {
  SUBMITTED: "Submitted",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  QUALITY_CHECK: "Quality Check",
  REVISION: "Revision",
  COMPLETED: "Completed",
  DELIVERED: "Delivered",
  CANCELLED: "Submitted",
};

export function statusToStage(status: OrderStatus): Stage {
  return STATUS_TO_STAGE[status];
}

/** Derive a progress percentage from the order stage if not explicitly set. */
export function stageProgress(status: OrderStatus): number {
  const stage = statusToStage(status);
  const idx = orderStages.indexOf(stage);
  return Math.round(((idx + 1) / orderStages.length) * 100);
}
