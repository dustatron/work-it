import { Button, Stack, Text } from "@chakra-ui/react";
import React from "react";
import capitalize from "lodash/capitalize";

type Props = {
  exerciseData?:
    | {
        id: string;
        name: string;
        routineType: string;
        description: string | null;
        dateCreated: Date;
        workoutId: string | null;
      }[]
    | undefined;
};

export default function Exercise({ exerciseData }: Props) {
  return (
    <Stack h="99vh" w="100%">
      <Stack
        minH="90%"
        w="100%"
        border="1px solid black"
        justifyContent="start"
        alignItems="center"
        p="2"
      >
        {exerciseData?.map((exercise) => (
          <Button w="100%">
            <Text textAlign="center">{capitalize(exercise.name)}</Text>
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
