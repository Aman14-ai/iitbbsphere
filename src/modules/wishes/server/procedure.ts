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

      const today = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
      const istDate = new Date(today.getTime() + istOffset);
      const yyyy = istDate.getFullYear();
      const mm = String(istDate.getMonth() + 1).padStart(2, "0");
      const dd = String(istDate.getDate()).padStart(2, "0");
      const todayStr = `${yyyy}-${mm}-${dd}`;

      // check if the user already wished today
      const alreadyWished = await db
        .select()
        .from(birthDayWishes)
        .where(
          sql`
            from_user_id = ${fromUserId} 
            AND to_user_id = ${input.toUserId} 
            AND DATE(created_at) = ${todayStr}
          `
        );

      if (alreadyWished.length > 0) {
        throw new Error("You have already wished this user today!");
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
