/*
  Warnings:

  - You are about to drop the column `excerciseId` on the `Workout` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Set` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workoutId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "excerciseId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
