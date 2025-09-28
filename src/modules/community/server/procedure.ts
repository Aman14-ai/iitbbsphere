import { db } from "@/db";
import { community, user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq, getTableColumns } from "drizzle-orm";
import z from "zod";

export const communityRouter = createTRPCRouter({
  addMessage: protectedProcedure
    .input(z.object({ message: z.string(), branchCode: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = await ctx.session.user.id;

      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
      }

      const [createdMessage] = await db
        .insert(community)
        .values({
          branchCode: input.branchCode,
          userId: userId,
          message: input.message,
        })
        .returning();

      return createdMessage;
    }),

  getCommunityMessage: protectedProcedure
    .input(z.object({ branchCode: z.string() }))
    .query(async ({ input }) => {
      const allMessages = await db
        .select({ ...getTableColumns(community), user: user })
        .from(community)
        .innerJoin(user, eq(community.userId, user.id))
        .where(eq(community.branchCode, input.branchCode))
        .orderBy(asc(community.createdAt));

      return allMessages;
    }),

  removeMessage: protectedProcedure
    .input(z.object({ rowId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const currentUserId = await ctx.session.user.id;
      if (!currentUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
      }

      const [deletedMsgRows] = await db
        .delete(community)
        .where(
          and(
            eq(community.id, input.rowId),
            eq(community.userId, currentUserId)
          )
        )
        .returning();
      if (!deletedMsgRows) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Message not found",
        });
      }
      return deletedMsgRows;
    }),

  editMessage: protectedProcedure
    .input(z.object({ rowId: z.string(), message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const currentUserId = await ctx.session.user.id;
      if (!currentUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
      }

      const [updatedMsgRows] = await db
        .update(community)
        .set({ message: input.message })
        .where(
          and(
            eq(community.id, input.rowId),
            eq(community.userId, currentUserId)
          )
        )
        .returning();
      if (!updatedMsgRows) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Message not found",
        });
      }
      return updatedMsgRows;
    }),
});
