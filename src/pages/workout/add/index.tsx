import { useToast } from "@chakra-ui/react";
import React from "react";

import { api } from "~/utils/api";
import { useForm } from "react-hook-form";

import {
  WorkoutSchema,
} from "~/utils/types";
import { useRouter } from "next/router";
import ProtectedRoute from "~/components/ProtectedRoute";
import WorkoutForm from "~/components/WorkoutForm";

export default function AddWorkout() {
  const toast = useToast();
  const { push } = useRouter();


  const { mutate, isLoading: isCreateWorkoutLoading } =
    api.workout.addWorkout.useMutation({
      onSuccess: (data) => {
        toast({ title: "Workout Added", status: "success" });
        push(`/workout/${data.id}`);
      },
      onError: (data) => {
        toast({
          title: "Failed to create workout.",
          status: "error",
          description: data.message,
        });
      },

    });

  const onSubmit = (values: WorkoutSchema) => {
    if (!!values?.exercises?.length) {
      mutate({
        name: values.name,
        muscleGroup: values.muscleGroup,
        region: values.region,
        exercises: values.exercises,
      });

    }
  };


  return (
    <ProtectedRoute>
      <WorkoutForm onSubmit={onSubmit} isLoading={isCreateWorkoutLoading} />

    </ProtectedRoute>
  );
}
