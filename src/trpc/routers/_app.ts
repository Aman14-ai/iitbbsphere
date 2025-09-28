import { userRouter } from "@/modules/auth/server/procedure";
import { createTRPCRouter } from "../init";
import { homeRouter } from "@/modules/home/server/procedure";
import { wishesRouter } from "@/modules/wishes/server/procedure";
import { communityRouter } from "@/modules/community/server/procedure";


export const appRouter = createTRPCRouter({
    user:userRouter,
    home:homeRouter,
    wishes:wishesRouter,
    community: communityRouter
})

export type AppRouter = typeof appRouter