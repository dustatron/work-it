import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { workoutSchema } from "~/utils/types";

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
        include: { exerciseInWorkouts: { include: { exercise: true } } },
      });
    }),
  addWorkout: protectedProcedure
    .input(workoutSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const { name, exerciseInWorkout } = input;
      const selected = exerciseInWorkout?.map((item) => ({ id: item.id }));

      return ctx.db.workout.create({
        data: {
          name,
          userId: user.id,
          exerciseInWorkouts: {
            connect: selected,
          },
        },
      });
    }),
  editWorkout: protectedProcedure.input(workoutSchema).mutation(async ({ ctx, input }) => {
    const selected = input.exerciseInWorkout?.map((item) => ({ id: item.id }));
    return await ctx.db.workout.update({
      where: { id: input.id },
      data: { muscleGroup: input.muscleGroup, region: input.region, name: input.name }
    })

  }),
  addExerciseToWorkout: protectedProcedure.input(z.object({ workoutId: z.string(), exerciseId: z.string() })).mutation(async ({ ctx, input }) => {
    return await ctx.db.workout.update({
      where: { id: input.workoutId }, data: {
        exerciseInWorkouts: {
          create: {
            exercise: {
              connect: {
                id: input.exerciseId
              }
            }
          }
        }
      }
    });
  }),
  updateSortOrder: protectedProcedure.input(z.object({ newOrder: z.array(z.object({ id: z.string(), sortOrder: z.string() })) })).mutation(async ({ ctx, input }) => {
    try {
      const updates = input.newOrder.map((exercise) => {
        if (exercise !== undefined) {
          return ctx.db.exerciseInWorkouts.update({
            where: {
              id: exercise.id
            },
            data: {
              sortOrder: + exercise.sortOrder
            }
          });
        }
        throw new Error(`Exercise not found in the existing order.`);
      });

      console.log('Exercises re-ordered successfully.');
      return await ctx.db.$transaction(updates);

    } catch (error) {
      console.error('Failed to reorder exercises:', error);
      throw error;
    }
  }),
  removeExercise: protectedProcedure.input(z.object({ workoutId: z.string(), exerciseInWorkoutId: z.string() })).mutation(async ({ ctx, input }) => {
    return await ctx.db.workout.update({
      where: { id: input.workoutId }, data: {
        exerciseInWorkouts: {
          delete: {
            id: input.exerciseInWorkoutId
          }
        }
      }
    });
  }),
  deleteWorkout: protectedProcedure
    .input(z.object({ workoutId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.workout.delete({ where: { id: input.workoutId } });
    }),
});
