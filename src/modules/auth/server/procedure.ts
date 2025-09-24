import { db } from "@/db";
import { user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq, getTableColumns } from "drizzle-orm";
import z from "zod";

export const userRouter = createTRPCRouter({
  getUserFromId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingUser] = await db
        .select({ ...getTableColumns(user) })
        .from(user)
        .where(eq(user.id, input.id));

      if (!existingUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User does not exist in the database.",
        });
      }
      return existingUser;
    }),
});
