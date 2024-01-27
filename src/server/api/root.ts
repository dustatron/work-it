import { postRouter } from "~/server/api/routers/post";
import { setRouter } from "~/server/api/routers/set";
import { exerciseRouter } from "~/server/api/routers/exercise";
import { workoutRouter } from "~/server/api/routers/workout";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  set: setRouter,
  exercise: exerciseRouter,
  workout: workoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
