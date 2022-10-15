import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "../../../prisma/prisma";

export const appRouter = trpc
  .router()
  .query("slugCheck", {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input }) {
      const count = await prisma.shortner.count({
        where: {
          slug: input.slug,
        },
      });

      return { used: count > 0 };
    },
  })
  .mutation("createShortner", {
    input: z.object({
      slug: z.string(),
      url: z.string(),
    }),
    async resolve({ input }) {
      try {
        await prisma.shortner.create({
          data: {
            slug: input.slug,
            url: input.url,
          },
        });
      } catch (e) {
        return { error: (e as Error).message };
      }
    },
  });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
