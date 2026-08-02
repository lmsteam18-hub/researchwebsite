import { NextResponse } from "next/server";
import { auth } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getSignedDownloadUrl } from "@/lib/integrations/supabase-storage";

/**
 * Secure download: signs a short-lived Supabase Storage URL for an attachment,
 * but only for the order's client, its consultant, or an admin.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const att = await prisma.attachment.findUnique({
    where: { id },
    include: { order: { select: { clientId: true, consultantId: true } } },
  });
  if (!att) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { role, id: uid } = session.user;
  const allowed =
    role === "ADMIN" ||
    att.order.clientId === uid ||
    att.order.consultantId === uid;
  if (!allowed) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  if (att.url.startsWith("pending://")) {
    return NextResponse.json({ error: "This file wasn't stored." }, { status: 410 });
  }

  const signed = await getSignedDownloadUrl(att.url);
  if (!signed) {
    return NextResponse.json({ error: "Storage unavailable." }, { status: 503 });
  }
  return NextResponse.redirect(signed);
}
