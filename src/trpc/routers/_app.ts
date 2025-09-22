import { userRouter } from "@/modules/auth/server/procedure";
import { createTRPCRouter } from "../init";
import { homeRouter } from "@/modules/home/server/procedure";


export const appRouter = createTRPCRouter({
    user:userRouter,
    home:homeRouter
})

export type AppRouter = typeof appRouter