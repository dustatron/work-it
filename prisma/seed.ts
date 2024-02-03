import { db } from "../src/server/db";
import { exerciseSeedData } from "./seedData/workoutList";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

async function main() {
  console.log("started");
  const user = await db.user.findFirst();
  const exercises = exerciseSeedData.map((ex) => ({
    name: ex.name,
    routineType: "FULL",
    muscleGroup: ex.muscleGroup.split(","),
    region: ex.region.split(","),
    description: "this was seed data",
    userId: user?.id || "",
  }));
  await db.exercise.createMany({ data: exercises });
  //   for (let ex of exerciseSeedData) {
  //     console.log("ex", ex.name);
  //     if (user?.id) {
  //       await db.exercise
  //         .create({
  //           data: {
  // name: ex.name,
  // routineType: "FULL",
  // muscleGroup: ex.muscleGroup.split(","),
  // region: ex.region.split(","),
  // description: "this was seed data",
  // userId: user.id,
  //           },
  //         })
  //         .then(() => console.log("save", ex.name));
  //     }
  //   }
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
