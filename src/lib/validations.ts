import { z } from "zod";
import { referenceStyles } from "@/config/subjects";

/** Multi-step order form schema (also reused by the /api/orders endpoint). */
export const orderSchema = z.object({
  // Step 1 — contact
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  country: z.string().min(2, "Select your country"),
  institution: z.string().min(2, "Enter your institution").optional().or(z.literal("")),
  course: z.string().optional().or(z.literal("")),
  department: z.string().optional().or(z.literal("")),

  // Step 2 — project
  service: z.string().min(1, "Choose a service"),
  subject: z.string().optional().or(z.literal("")),
  academicLevel: z.string().min(1, "Choose your academic level"),
  deadline: z.string().min(1, "Choose a deadline"),
  pages: z.coerce.number().int().min(1, "At least 1 page").max(2000),
  wordCount: z.coerce.number().int().min(0).max(600000).optional(),
  referenceStyle: z.enum(referenceStyles).optional(),

  // Step 3 — details
  instructions: z.string().min(10, "Please describe what you need (min 10 characters)"),
  additionalNotes: z.string().max(4000).optional().or(z.literal("")),

  // Add-ons
  plagiarismReport: z.boolean().optional().default(false),
  premiumConsultant: z.boolean().optional().default(false),

  // Consent
  agreeIntegrity: z
    .boolean()
    .refine((v) => v === true, "You must accept the Academic Integrity Policy"),
});

export type OrderInput = z.infer<typeof orderSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/[0-9]/, "Include a number"),
    confirmPassword: z.string(),
    role: z.enum(["CLIENT", "CONSULTANT"]).default("CLIENT"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(2, "Enter a subject"),
  message: z.string().min(10, "Message is too short"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

/** Allowed upload types (mirrors the drag-and-drop uploader). */
export const ACCEPTED_UPLOAD_TYPES: Record<string, string[]> = {
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/pdf": [".pdf"],
  "application/vnd.ms-powerpoint": [".ppt"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
  "text/csv": [".csv"],
  "application/zip": [".zip"],
  "application/x-rar-compressed": [".rar"],
  "application/x-latex": [".tex"],
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
};

export const MAX_UPLOAD_BYTES = 500 * 1024 * 1024; // 500MB
