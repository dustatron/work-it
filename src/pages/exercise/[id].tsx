import { useRouter } from "next/router";
import React from "react";
import { api } from "~/utils/api";

export default function ExerciseDetail() {
  const { query } = useRouter();
  const { data } = api.exercise.getExercise.useQuery({
    id: query.id as string,
  });

  return (
    <div>
      ExerciseDetail
      {data?.name}
    </div>
  );
}
