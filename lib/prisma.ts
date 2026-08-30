import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

// Safe diagnostic: only show the database hostname, never the password.
try {
  const url = new URL(connectionString);
  console.log("DATABASE HOST:", url.hostname);
} catch {
  console.log("DATABASE_URL is malformed");
}

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({
  adapter,
});