import { z } from "zod";

export const RoutineTypeValues = {
  Push: "PUSH",
  Pull: "PULL",
  Core: "CORE",
  Full: "FULL",
};
export type RoutineType = keyof typeof RoutineTypeValues;

export const exerciseSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  routineType: z.custom<RoutineType>(),
});

export type ExerciseSchema = z.infer<typeof exerciseSchema>;

export const workoutSchema = z.object({
  name: z.string().min(1),
  routineType: z.custom<RoutineType>(),
});

export type WorkoutSchema = z.infer<typeof workoutSchema>;

export type Exercise = {
  id: string;
  name: string;
  routineType: string;
  description: string | null;
  dateCreated: Date;
  workoutId: string | null;
  userId: string;
};
