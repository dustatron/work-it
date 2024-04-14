/*
  Warnings:

  - You are about to drop the column `workoutId` on the `Exercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workoutId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "workoutId";

-- CreateTable
CREATE TABLE "ExerciseInWorkouts" (
    "id" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workoutId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "sortOrder" SERIAL NOT NULL,

    CONSTRAINT "ExerciseInWorkouts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExerciseInWorkouts" ADD CONSTRAINT "ExerciseInWorkouts_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseInWorkouts" ADD CONSTRAINT "ExerciseInWorkouts_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
