import { db } from "@/db";
import { user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq } from "drizzle-orm";
import z from "zod";


export const profileRouter = createTRPCRouter({
     updateBirthDate: protectedProcedure
    .input(z.object({ birthDate: z.string() })) // "YYYY-MM-DD"
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      if (!userId) throw new Error("Not authenticated");

      await db
        .update(user)
        .set({ birthDate: input.birthDate })
        .where(eq(user.id, userId));

      return { success: true };
    }),
})