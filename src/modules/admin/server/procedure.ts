import { db } from "@/db";
import { content } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const adminRouter = createTRPCRouter({
  createContent: protectedProcedure
    .input(
      z.object({
        subjectName: z.string(),
        subjectCode: z.string(),
        proffesorName: z.string(),
        semester: z.string(),
        year: z.string(),
        folderId: z.string(),
        uploadedBy: z.string(),
        branch:z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const {
        subjectName,
        subjectCode,
        proffesorName,
        semester,
        year,
        folderId,
        uploadedBy,
        branch
      } = input;

      if (
        !subjectName ||
        !subjectCode ||
        !proffesorName ||
        !semester ||
        !year ||
        !folderId ||
        !uploadedBy ||
        !branch
      ) {
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message: "All fields are required",
        });
      }
      const [createdContent] = await db.insert(content).values({
        subjectName,
        subjectCode,
        professor: proffesorName,
        semester,
        academicYear: year,
        folderId,
        branch:branch,
        uploadedBy,
      }).returning();

      return createdContent;
    }),
});
