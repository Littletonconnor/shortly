import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url:
          process.env.NODE_ENV === "development"
            ? process.env.DEV_DATABASE_URL
            : process.env.PROD_DATABASE_URL,
      },
    },
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
