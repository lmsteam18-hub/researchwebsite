/**
 * File storage integrations.
 * - AWS S3: large project files (up to 500MB) via presigned PUT URLs so
 *   uploads go browser → S3 directly, never through the Next.js server.
 * - Cloudinary: images and small assets (avatars, blog covers).
 */
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v2 as cloudinary } from "cloudinary";

const s3 =
  process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
    ? new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      })
    : null;

/** Create a presigned URL the browser can PUT a file to directly. */
export async function createUploadUrl(key: string, contentType: string) {
  if (!s3 || !process.env.AWS_S3_BUCKET) {
    return { uploadUrl: null, key, demo: true };
  }
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    ContentType: contentType,
  });
  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
  const publicUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  return { uploadUrl, publicUrl, key };
}

if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

/** Sign parameters for a direct, unsigned-safe Cloudinary upload from the client. */
export function signCloudinaryUpload(paramsToSign: Record<string, string | number>) {
  if (!process.env.CLOUDINARY_API_SECRET) return { signature: null, demo: true };
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET,
  );
  return { signature, cloudName: process.env.CLOUDINARY_CLOUD_NAME, apiKey: process.env.CLOUDINARY_API_KEY };
}
