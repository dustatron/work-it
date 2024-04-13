import React from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Box, Button, Container, Heading, Text, Stack } from "@chakra-ui/react";
import Footer from "~/components/Footer";
import { capitalize } from "lodash";
import ExerciseBar from "~/components/ExerciseBar";
import { useSession } from "next-auth/react"

export default function WorkoutDetail() {
  const { query, push } = useRouter();
  const { data: session, status } = useSession()
  const { isLoading, data: workoutData } = api.workout.getWorkout.useQuery(
    { workoutId: query?.workoutId as string },
    { enabled: !!query?.workoutId }
  );

  if (isLoading) {
    return <Container> ...isLoading </Container>;
  }
  if (workoutData) {
    return (
      <Container>
        <Box>
          <Heading>{capitalize(workoutData.name)}</Heading>
          <Stack
            direction="row"
            justifyContent="start"
            spacing={5}
            borderBottom="1px solid black"
            p="2"
          >
            <Text># Exercises: {workoutData.exercises.length}</Text>
          </Stack>
        </Box>
        <Stack spacing={5} p="2">
          {workoutData.exercises.map((exercise) => (
            <ExerciseBar key={exercise.id} exercise={exercise} />
          ))}
        </Stack>
        {status === "authenticated" && (
          <Footer isCenter>
            {workoutData && (
              <>
                <Button onClick={() => push(`/workout/edit/${workoutData.id}`)} colorScheme="facebook">Edit</Button>
              </>
            )}
          </Footer>
        )}
      </Container>
    );
  }
}
