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
      return ctx.db.exercise.create({
        data: {
          name: input.name,
          description: input.description,
          routineType: input.routineType,
          userId: user.id,
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
