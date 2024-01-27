import { Box, Button, Stack } from "@chakra-ui/react";
import React from "react";
import { api } from "~/utils/api";

type Props = {};

export default function Workout({}: Props) {
  const { isLoading, data: workoutData } = api.workout.listWorkouts.useQuery();
  console.log("workoutData", workoutData);

  const { mutate, isLoading: isCreateWorkoutLoading } =
    api.workout.addWorkout.useMutation({
      onSuccess: (data) => console.log("data", data),
    });

  const onSubmit = () => {
    mutate({ amount: 4, routineType: "Core", name: "test" });
  };

  return (
    <Stack>
      <Button onClick={onSubmit} isLoading={isCreateWorkoutLoading}>
        Add Workout
      </Button>
      {workoutData?.map((workout) => (
        <Box key={workout.id}>{workout.name}</Box>
      ))}
    </Stack>
  );
}
