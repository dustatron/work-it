import React from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Box, Button, Heading, Text, Stack } from "@chakra-ui/react";
import Footer from "~/components/Footer";
import { capitalize } from "lodash";
import { useSession } from "next-auth/react"
import ExerciseListSortable from "~/components/ExerciseListSortable";


export default function WorkoutDetail() {
  const { query, push } = useRouter();
  const { status } = useSession()
  const { isLoading, data: workoutData } = api.workout.getWorkout.useQuery(
    { workoutId: query?.workoutId as string },
    { enabled: !!query?.workoutId }
  );

  if (isLoading) {
    return <Box> ...isLoading </Box>;
  }
  if (workoutData) {
    return (
      <Box p="0">
        <Box>
          <Heading>{capitalize(workoutData.name)}</Heading>
          <Stack
            direction="row"
            justifyContent="start"
            spacing={5}
            borderBottom="1px solid black"
            p="0"
          >
            <Text># Exercises: {workoutData.exerciseInWorkouts.length}</Text>
          </Stack>
        </Box>
        <Stack spacing={5} py="2">
          {workoutData?.exerciseInWorkouts &&
            <ExerciseListSortable workoutItems={workoutData.exerciseInWorkouts} />
          }
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
      </Box>
    );
  }
}
