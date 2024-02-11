import { Box, Button, Heading, Stack, Text, Spinner, Center } from "@chakra-ui/react";
import React from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Footer from "../Footer";
import { useSession } from "next-auth/react"

export default function WorkoutList() {
  const { push } = useRouter();
  const { status } = useSession()
  const { data: workoutData, isLoading } = api.workout.listWorkouts.useQuery();

  return (
    <Stack p="3">
      {isLoading && (
        <Stack justifyContent="center">
          <Center>
            <Spinner size="md" />
          </Center>
        </Stack>
      )}
      {!workoutData?.length && !isLoading && (
        <Stack justifyContent="center">
          <Heading as="h1" size="md" w="100%" textAlign="center">
            No Workouts
          </Heading>
          <Box>
            {status === "unauthenticated" && (
              <Center><Text>Login to see your workouts</Text></Center>
            )}
            {status === "authenticated" && (
              <Text textAlign="center">Create a workout to get started</Text>
            )}
          </Box>
        </Stack>
      )}
      {workoutData?.map((workout) => (
        <Button onClick={() => push(`/workout/${workout.id}`)} key={workout.id}>
          {workout.name}
        </Button>
      ))}
      {status === "authenticated" && (
        <Footer isCenter>
          <Button colorScheme="twitter" onClick={() => push("/add-workout")}>
            Add Workout
          </Button>
        </Footer>
      )}
    </Stack>
  );
}
