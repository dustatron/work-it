import { db } from "../src/server/db";
import { exerciseSeedData } from "./seedData/workoutList";


async function main() {
  console.log("started");
  const user = await db.user.findFirst();
  const exercises = exerciseSeedData.map((ex) => ({
    name: ex.name,
    routineType: "FULL",
    muscleGroup: ex.muscleGroup.split(","),
    region: ex.region.split(","),
    description: "this was seed data",
    userId: user?.id ?? "",
  }));
  await db.exercise.createMany({ data: exercises });

}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
