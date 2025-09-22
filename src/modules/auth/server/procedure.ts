import { db } from "@/db";
import { user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import {  eq, getTableColumns } from "drizzle-orm";
import z from "zod";

export const userRouter = createTRPCRouter({
    
});
