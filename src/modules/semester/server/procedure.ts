import { db } from "@/db";
import { content } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, eq, getTableColumns } from "drizzle-orm";
import z from "zod";

export const semesterRouter = createTRPCRouter({
  getAllContents: protectedProcedure
    .input(z.object({ branch: z.string(), semester: z.string() }))
    .query(async ({ input }) => {
      const allContent = await db
        .select({ ...getTableColumns(content) })
        .from(content)
        .where(
          and(
            eq(content.branch, input.branch),
            eq(content.semester, input.semester)
          )
        );

      return allContent;
    }),

  getRowOfContentsByRowId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const currentUserId = await ctx.session.user.id;
      if (!currentUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
      }
      const [existingContent] = await db
        .select({ ...getTableColumns(content) })
        .from(content)
        .where(eq(content.id, input.id));
      if (!existingContent) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
      }
      return existingContent;
    }),
});
