import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { workoutSchema } from "~/utils/types";
import shuffle from "lodash/shuffle";

export const workoutRouter = createTRPCRouter({
  listWorkouts: publicProcedure.query(({ ctx }) => {
    const user = ctx.session?.user;
    return ctx.db.workout.findMany({ where: { userId: user?.id } });
  }),
  getWorkout: publicProcedure
    .input(z.object({ workoutId: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.workout.findFirst({
        where: { id: input.workoutId },
        include: { exercises: true, sets: true },
      });
    }),
  addWorkout: protectedProcedure
    .input(workoutSchema)
    .mutation(async ({ ctx, input }) => {
      let exercise;

      exercise = await ctx.db.exercise.findMany({
        where: { routineType: input.routineType },
      });

      const { name, routineType } = input;
      const selection = shuffle(exercise).slice(0, 4);

      const user = ctx.session.user;

      return ctx.db.workout.create({
        data: {
          name,
          routineType,
          exercises: { connect: selection },
          userId: user.id,
        },
      });
    }),
  deleteWorkout: protectedProcedure
    .input(z.object({ workoutId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.workout.delete({ where: { id: input.workoutId } });
    }),
});
