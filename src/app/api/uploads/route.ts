import { NextResponse } from "next/server";
import { uploadOrderFile, isStorageConfigured } from "@/lib/integrations/supabase-storage";
import { MAX_UPLOAD_BYTES } from "@/lib/validations";

/**
 * Receives project files (multipart form-data) and uploads them to Supabase
 * Storage, returning metadata the order endpoint persists as Attachments.
 */
export async function POST(req: Request) {
  if (!isStorageConfigured()) {
    return NextResponse.json(
      { error: "File storage isn't configured yet. Add SUPABASE_SERVICE_ROLE_KEY to enable uploads." },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload request." }, { status: 400 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ files: [] });
  }

  const uploaded = [];
  for (const file of files) {
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: `"${file.name}" exceeds the 500MB limit.` },
        { status: 413 },
      );
    }
    try {
      uploaded.push(await uploadOrderFile(file));
    } catch (err) {
      console.error("[uploads] failed:", err);
      return NextResponse.json(
        { error: `We couldn't upload "${file.name}". Please try again.` },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ files: uploaded });
}
