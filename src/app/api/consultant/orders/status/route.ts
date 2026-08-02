import { NextResponse } from "next/server";
import { z } from "zod";
import type { OrderStatus } from "@prisma/client";
import { auth } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { stageProgress } from "@/lib/order-display";

const schema = z.object({
  orderId: z.string().min(1),
  status: z.enum([
    "ASSIGNED",
    "IN_PROGRESS",
    "QUALITY_CHECK",
    "REVISION",
    "COMPLETED",
    "DELIVERED",
  ]),
});

/** A Freelancer (or admin) advances the status of an order they own. */
export async function POST(req: Request) {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "CONSULTANT" && role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { orderId, status } = parsed.data;

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (role === "CONSULTANT" && order.consultantId !== session!.user.id) {
    return NextResponse.json({ error: "Not your project" }, { status: 403 });
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: status as OrderStatus, progress: stageProgress(status as OrderStatus) },
  });

  return NextResponse.json({ ok: true });
}
