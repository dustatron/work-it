import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const workoutRouter = createTRPCRouter({
  listWorkouts: publicProcedure.query(({ ctx }) => {
    return ctx.db.workout.findMany();
  }),
});
