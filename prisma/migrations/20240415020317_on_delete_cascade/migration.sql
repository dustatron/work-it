-- DropForeignKey
ALTER TABLE "ExerciseInWorkouts" DROP CONSTRAINT "ExerciseInWorkouts_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseInWorkouts" DROP CONSTRAINT "ExerciseInWorkouts_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_workoutId_fkey";

-- AddForeignKey
ALTER TABLE "ExerciseInWorkouts" ADD CONSTRAINT "ExerciseInWorkouts_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseInWorkouts" ADD CONSTRAINT "ExerciseInWorkouts_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
