import { userRouter } from "@/modules/auth/server/procedure";
import { createTRPCRouter } from "../init";
import { homeRouter } from "@/modules/home/server/procedure";
import { profileRouter } from "@/modules/profile/server/procedure";


export const appRouter = createTRPCRouter({
    user:userRouter,
    home:homeRouter,
    profile:profileRouter
})

export type AppRouter = typeof appRouter