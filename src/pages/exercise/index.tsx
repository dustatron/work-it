import React from "react";
import ExerciseList from "~/components/ExerciseList";
import { api } from "~/utils/api";

type Props = {};

function Exercise({}: Props) {
  const { data: exerciseData } = api.exercise.listExercises.useQuery();
  return <ExerciseList exerciseData={exerciseData} />;
}

export default Exercise;
