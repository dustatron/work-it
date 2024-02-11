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
    if (user) {
      return ctx.db.workout.findMany({ where: { userId: user?.id } });
    }
    return []
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
      const user = ctx.session.user;
      const { name, exercises } = input;
      const selected = exercises?.map((item) => ({ id: item.id }));

      return ctx.db.workout.create({
        data: {
          name,
          userId: user.id,
          exercises: {
            connect: selected,
          },
        },
      });

    }),
  deleteWorkout: protectedProcedure
    .input(z.object({ workoutId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.workout.delete({ where: { id: input.workoutId } });
    }),
});
