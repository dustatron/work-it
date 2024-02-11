import { Box, Button, Card, Center, Stack, Text } from "@chakra-ui/react";
import { Exercise } from "@prisma/client";
import { capitalize } from "lodash";
import Link from "next/link";
import React from "react";

type Props = {
  exercise: Exercise;
  isAdding?: boolean;
  isRemoving?: boolean;
  addExercise?: (exercise: Exercise) => void;
  removeExercise?: (exercise: Exercise) => void;
};

const ExerciseBar = ({
  exercise,
  isAdding,
  isRemoving,
  addExercise,
  removeExercise
}: Props) => {
  return (
    <Card p="2" w="100%">
      <Stack direction="row" justifyContent="space-between">
        <Center>
          <Text fontSize="lg" fontWeight="bold">
            {capitalize(exercise.name)}
          </Text>
        </Center>
        <Box>
          {!isAdding && (
            <Link href={`/exercise/${exercise.id}`}>
              <Button variant="ghost">
                <Text fontSize="lg">⚙️</Text>
              </Button>
            </Link>
          )}
          {isAdding && (
            <Button
              variant="ghost"
              onClick={() => addExercise && addExercise(exercise)}
            >
              <Text fontSize="lg">➕</Text>
            </Button>
          )}
          {isRemoving && (
            <Button variant="ghost" onClick={() => removeExercise && removeExercise(exercise)}>
              <Text fontSize="lg">🗑️</Text>
            </Button>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default ExerciseBar;
