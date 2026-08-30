import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

let databaseHost = "unknown";

try {
  databaseHost = new URL(connectionString).hostname;
} catch {
  console.error("DATABASE_URL is malformed");
}

console.log("DATABASE HOST:", databaseHost);

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({
  adapter,
});