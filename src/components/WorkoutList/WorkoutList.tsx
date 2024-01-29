import { Box, Button, Stack } from "@chakra-ui/react";
import React from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Footer from "../Footer";

type Props = {};

export default function WorkoutList({}: Props) {
  const { push } = useRouter();
  const { isLoading, data: workoutData } = api.workout.listWorkouts.useQuery();

  return (
    <Stack>
      {workoutData?.map((workout) => (
        <Button onClick={() => push(`/workout/${workout.id}`)} key={workout.id}>
          {workout.name}
        </Button>
      ))}
      <Footer>
        <Button colorScheme="twitter" onClick={() => push("/add-workout")}>
          Add Workout
        </Button>
      </Footer>
    </Stack>
  );
}
