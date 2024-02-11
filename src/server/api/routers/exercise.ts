import { z } from "zod";
import { exerciseSchema } from "../../../utils/types";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const exerciseRouter = createTRPCRouter({
  listExercises: publicProcedure.query(({ ctx }) => {
    return ctx.db.exercise.findMany();
  }),
  addExercise: protectedProcedure
    .input(exerciseSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const muscleGroupFiltered = input.muscleGroup.map(item => item.value)
      const regionFiltered = input.region.map(item => item.value)
      return ctx.db.exercise.create({
        data: {
          name: input.name,
          description: input.description,
          userId: user.id,
          muscleGroup: muscleGroupFiltered,
          region: regionFiltered,
          routineType: input.routineType
        },
      });
    }),
  getExercise: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.exercise.findFirst({
        where: { id: input.id },
        include: { Workout: true, user: true, sets: true },
      });
    }),
  deleteExercise: protectedProcedure
    .input(z.object({ exerciseId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.exercise.delete({ where: { id: input.exerciseId } });
    }),
});
