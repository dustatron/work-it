import { Button, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import ExerciseBar from "../ExerciseBar";
import { Exercise } from "@prisma/client";
import Footer from "../Footer";

type Props = {
  exerciseData?: Exercise[];
};

export default function ExerciseList({ exerciseData }: Props) {
  return (
    <Stack h="99vh" w="100%">
      <Stack
        minH="90%"
        w="100%"
        justifyContent="start"
        alignItems="center"
        p="2"
      >
        {exerciseData?.map((exercise) => (
          <ExerciseBar key={exercise.id} exercise={exercise} />
        ))}
      </Stack>
      <Footer>
        <Link href="/add-workout">
          <Button colorScheme="twitter">Add Exercise</Button>{" "}
        </Link>
      </Footer>
    </Stack>
  );
}
