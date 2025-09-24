import { db } from "@/db";
import { user } from "@/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { eq, sql } from "drizzle-orm";
import z from "zod";

export const homeRouter = createTRPCRouter({
  getAllBirthDay: baseProcedure.query(async () => {
    // Convert to IST (UTC+5:30)
    const today = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    const istDate = new Date(today.getTime() + istOffset);

    const month = istDate.getMonth() + 1;
    const day = istDate.getDate();

    const todaysBirthDay = await db
      .select()
      .from(user)
      .where(
        sql`
        birth_date IS NOT NULL
        AND EXTRACT(MONTH FROM birth_date) = ${month}
        AND EXTRACT(DAY FROM birth_date) = ${day}
        `
      );

    return todaysBirthDay;
  }),

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
});
