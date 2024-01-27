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
      return ctx.db.exercise.create({
        data: {
          name: input.name,
          description: input.description,
          routineType: input.routineType,
        },
      });
    }),
});
