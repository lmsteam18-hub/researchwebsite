import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/session";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  orderId: z.string().min(1),
  files: z.array(
    z.object({
      filename: z.string(),
      path: z.string(),
      sizeBytes: z.number().optional(),
      mimeType: z.string().optional(),
    }),
  ).min(1),
});

/** Attach uploaded files to an order as Freelancer deliverables. */
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
  const { orderId, files } = parsed.data;

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  if (role === "CONSULTANT" && order.consultantId !== session!.user.id) {
    return NextResponse.json({ error: "Not your project" }, { status: 403 });
  }

  await prisma.attachment.createMany({
    data: files.map((f) => ({
      orderId,
      filename: f.filename,
      url: f.path,
      sizeBytes: f.sizeBytes ?? 0,
      mimeType: f.mimeType ?? "application/octet-stream",
      isDeliverable: true,
      uploadedById: session!.user.id,
    })),
  });

  return NextResponse.json({ ok: true });
}
