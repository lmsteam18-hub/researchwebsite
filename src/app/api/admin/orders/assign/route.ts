import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/session";
import { prisma } from "@/lib/prisma";

const assignSchema = z.object({
  orderId: z.string().min(1),
  consultantId: z.string().min(1).nullable(), // null = unassign
});

/** Admin-only: assign (or unassign) a Freelancer to an order. */
export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = assignSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { orderId, consultantId } = parsed.data;

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  if (consultantId) {
    const consultant = await prisma.user.findFirst({
      where: { id: consultantId, role: "CONSULTANT" },
    });
    if (!consultant) {
      return NextResponse.json({ error: "Freelancer not found" }, { status: 404 });
    }
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      consultantId,
      // Advance a fresh order to ASSIGNED; leave later stages untouched.
      ...(consultantId && order.status === "SUBMITTED" ? { status: "ASSIGNED" } : {}),
      ...(!consultantId && order.status === "ASSIGNED" ? { status: "SUBMITTED" } : {}),
    },
  });

  return NextResponse.json({ ok: true });
}
