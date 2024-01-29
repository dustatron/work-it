import { Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Footer from "../Footer";

type Props = {};

export default function WorkoutList({}: Props) {
  const { push } = useRouter();
  const { isLoading, data: workoutData } = api.workout.listWorkouts.useQuery();

  return (
    <Stack p="3">
      {!workoutData?.length && (
        <Stack justifyContent="center">
          <Heading as="h1" size="md" w="100%" textAlign="center">
            No Workouts
          </Heading>
          <Box>
            <Text textAlign="center">Create a workout to get started</Text>
          </Box>
        </Stack>
      )}
      {workoutData?.map((workout) => (
        <Button onClick={() => push(`/workout/${workout.id}`)} key={workout.id}>
          {workout.name}
        </Button>
      ))}
      <Footer isCenter>
        <Button colorScheme="twitter" onClick={() => push("/add-workout")}>
          Add Workout
        </Button>
      </Footer>
    </Stack>
  );
}
