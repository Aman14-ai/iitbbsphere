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
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

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
    console.log(month, day);
    console.log("today birthday from procedure , ", todaysBirthDay);

    return todaysBirthDay;
  }),
});
