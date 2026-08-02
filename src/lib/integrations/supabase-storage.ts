import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Storage integration for order file uploads.
 * Uses the service_role key (server-side only — never exposed to the client).
 * Files land in a private `order-files` bucket; downloads are served via
 * short-lived signed URLs generated on demand.
 */

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const BUCKET = "order-files";

const admin =
  url && serviceKey
    ? createClient(url, serviceKey, { auth: { persistSession: false } })
    : null;

export function isStorageConfigured() {
  return admin !== null;
}

let bucketReady = false;
async function ensureBucket() {
  if (!admin || bucketReady) return;
  const { data: existing } = await admin.storage.getBucket(BUCKET);
  if (!existing) {
    // No fileSizeLimit here — a bucket limit can't exceed the project's global
    // cap (50MB on the Supabase free plan), which would make createBucket fail.
    const { error } = await admin.storage.createBucket(BUCKET, { public: false });
    // Ignore a race where a concurrent request already created it.
    if (error && !/already exists/i.test(error.message)) throw error;
  }
  bucketReady = true;
}

export interface StoredFile {
  filename: string;
  path: string; // storage key, stored on Attachment.url
  sizeBytes: number;
  mimeType: string;
}

/** Upload a single file to the private bucket and return its metadata. */
export async function uploadOrderFile(file: File): Promise<StoredFile> {
  if (!admin) throw new Error("Supabase Storage is not configured.");
  await ensureBucket();

  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const rand = Math.random().toString(36).slice(2, 8);
  const path = `orders/${Date.now()}-${rand}-${safe}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await admin.storage
    .from(BUCKET)
    .upload(path, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });
  if (error) throw error;

  return {
    filename: file.name,
    path,
    sizeBytes: file.size,
    mimeType: file.type || "application/octet-stream",
  };
}

/** Create a short-lived signed download URL for a stored file. */
export async function getSignedDownloadUrl(path: string, expiresIn = 3600) {
  if (!admin) return null;
  const { data } = await admin.storage.from(BUCKET).createSignedUrl(path, expiresIn);
  return data?.signedUrl ?? null;
}
