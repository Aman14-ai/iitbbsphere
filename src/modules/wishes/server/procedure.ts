import { db } from "@/db";
import { birthDayWishes, user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import z from "zod";

export const wishesRouter = createTRPCRouter({
  getWishesForUser: protectedProcedure
    .input(z.object({ toUserId: z.string() }))
    .query(async ({ input }) => {
      const allWishes = await db
        .select({
          fromUser: user,
          ...getTableColumns(birthDayWishes),
        })
        .from(birthDayWishes)
        .innerJoin(user, eq(birthDayWishes.fromUserId, user.id))
        .where(eq(birthDayWishes.toUserId, input.toUserId))
        .orderBy(desc(birthDayWishes.createdAt));
      return allWishes;
    }),
  addWish: protectedProcedure
    .input(z.object({ toUserId: z.string(), message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const fromUserId = await ctx.session.user.id;

      if (!fromUserId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not authenticated.",
        });
      }
      const [createdWish] = await db
        .insert(birthDayWishes)
        .values({
          fromUserId,
          toUserId: input.toUserId,
          message: input.message,
        })
        .returning();

      return createdWish;
    }),
});
