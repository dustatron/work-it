import { z } from "zod";

export const RoutineTypeValues = {
  Push: "PUSH",
  Pull: "PULL",
  Core: "CORE",
  Full: "FULL",
};
export type RoutineType = keyof typeof RoutineTypeValues;

export const exerciseSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  routineType: z.custom<RoutineType>(),
});

export type ExerciseSchema = z.infer<typeof exerciseSchema>;
