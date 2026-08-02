import { NextResponse } from "next/server";
import { z } from "zod";
import { createUploadUrl } from "@/lib/integrations/storage";
import { MAX_UPLOAD_BYTES } from "@/lib/validations";

const presignSchema = z.object({
  filename: z.string().min(1),
  contentType: z.string().min(1),
  size: z.number().int().max(MAX_UPLOAD_BYTES, "File exceeds the 500MB limit"),
});

/**
 * Returns a presigned S3 URL so the browser uploads large files directly
 * to storage (bypassing the serverless request-size limit).
 */
export async function POST(req: Request) {
  const parsed = presignSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { filename, contentType } = parsed.data;
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `orders/${Date.now()}-${safeName}`;

  const result = await createUploadUrl(key, contentType);
  return NextResponse.json(result);
}
