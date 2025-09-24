import { userRouter } from "@/modules/auth/server/procedure";
import { createTRPCRouter } from "../init";
import { homeRouter } from "@/modules/home/server/procedure";
import { wishesRouter } from "@/modules/wishes/server/procedure";


export const appRouter = createTRPCRouter({
    user:userRouter,
    home:homeRouter,
    wishes:wishesRouter,
})

export type AppRouter = typeof appRouter