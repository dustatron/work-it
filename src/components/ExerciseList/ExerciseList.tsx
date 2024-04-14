import { Box, Button, Link, Stack } from "@chakra-ui/react";
import React from "react";
import ExerciseBar from "../ExerciseBar";
import { Exercise } from "@prisma/client";
import Footer from "../Footer";
import { useSession } from "next-auth/react"

type Props = {
  exerciseData?: Exercise[];
};

export default function ExerciseList({ exerciseData }: Props) {
  const { status } = useSession()
  return (
    <Stack h="99vh" w="100%" marginBottom="25px">
      <Stack
        minH="90%"
        w="100%"
        justifyContent="start"
        alignItems="center"
        p="2"
      >
        {exerciseData?.map((exercise) => (
          <ExerciseBar key={exercise.id} exercise={exercise} exerciseInWorkoutId="" />
        ))}
        <Box p="10"></Box>
      </Stack>
      {status === "authenticated" && (
        <Footer isCenter>
          <Link href="/add-exercise">
            <Button colorScheme="twitter">Add Exercise</Button>
          </Link>
        </Footer>
      )}
    </Stack>
  );
}
