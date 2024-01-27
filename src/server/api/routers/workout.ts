import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { workoutSchema } from "~/utils/types";

export const workoutRouter = createTRPCRouter({
  listWorkouts: publicProcedure.query(({ ctx }) => {
    return ctx.db.workout.findMany();
  }),
  addWorkout: protectedProcedure
    .input(workoutSchema)
    .mutation(async ({ ctx, input }) => {
      const exercise = await ctx.db.exercise.findMany();
      const { amount, name, routineType } = input;
      const selection = exercise.slice(0, amount);
      return ctx.db.workout.create({
        data: { name, routineType, exercises: { connect: selection } },
      });
    }),
});
