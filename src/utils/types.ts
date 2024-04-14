import { z } from "zod";

// Depreciated
export const RoutineTypeValues = {
  Push: "PUSH",
  Pull: "PULL",
  Core: "CORE",
  Full: "FULL",
};
export type RoutineType = keyof typeof RoutineTypeValues;


export const MuscleGroup = {
  Push: "PUSH",
  Pull: "PULL",
  Core: "CORE",
  Cardio: "CARDIO",
};

export type MusicGroupType = keyof typeof MuscleGroup;

export const Region = {
  Upper: "UPPER",
  Lower: "LOWER",
  Core: "CORE",
  FullBody: "FULL_BODY",
};

export type RegionType = keyof typeof Region;

export const exerciseSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  muscleGroup: z.array(z.object({ value: z.string(), label: z.string() })),
  region: z.array(z.object({ value: z.string(), label: z.string() })),
  routineType: z.string().optional()
});

export type ExerciseSchema = z.infer<typeof exerciseSchema>;

export const workoutSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  muscleGroup: z.custom<MusicGroupType>().optional(),
  region: z.custom<RegionType>().optional(),
  exercises: z.array(z.custom<Exercise>()).optional(),
});

export type WorkoutSchema = z.infer<typeof workoutSchema>;


export type Exercise = {
  id: string;
  name: string;
  routineType: string | null;
  description: string | null;
  dateCreated: Date;
  workoutId: string | null;
  userId: string;
  muscleGroup: string[];
  region: string[];
  sets?: Set[];
};

export type Set = {
  id: string
  workoutId: string
  excerciseId: string
  rep: number
  weight: number
  workout: WorkoutSchema
  exercise: Exercise
  dateCreated: string
  userId: string
}
