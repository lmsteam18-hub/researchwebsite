import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/** The current session (server components / route handlers). */
export function auth() {
  return getServerSession(authOptions);
}

/** The full User record for the logged-in session, or null. */
export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return prisma.user.findUnique({ where: { id: session.user.id } });
}

/** Session user with role, or null (lightweight — no DB round-trip). */
export async function getSessionUser() {
  const session = await auth();
  return session?.user ?? null;
}

/** Name/email for the dashboard sidebar, with safe fallbacks. */
export async function dashDisplayUser() {
  const session = await auth();
  return {
    name: session?.user?.name ?? "User",
    email: session?.user?.email ?? "",
  };
}
