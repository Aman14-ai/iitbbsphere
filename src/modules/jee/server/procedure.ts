import { db } from "@/db";
import { content } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import {  eq, getTableColumns } from "drizzle-orm";
import z from "zod";

export const jeeRouter = createTRPCRouter({
  getAllContents: protectedProcedure
    .input(z.object({ topic: z.string() }))
    .query(async ({ input }) => {
      const allContent = await db
        .select({ ...getTableColumns(content) })
        .from(content)
        .where(eq(content.subjectCode, input.topic));
      return allContent;
    }),
});
