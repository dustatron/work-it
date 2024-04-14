import { Box, Button, Card, Center, Skeleton, Stack, Text } from "@chakra-ui/react";
import { Exercise } from "@prisma/client";
import { capitalize } from "lodash";
import Link from "next/link";
import React, { useState } from "react";
import { ExerciseInWorkout } from "~/utils/types";

type Props = {
  exercise: Exercise;
  exerciseInWorkoutId: string;
  isAdding?: boolean;
  isRemoving?: boolean;
  addExercise?: (exercise: Exercise) => void;
  removeExercise?: (exerciseInWorkoutId: string, exercise: Exercise) => void;

  isLoading?: boolean
};

const ExerciseBar = ({
  exercise,
  isAdding,
  isRemoving,
  addExercise,
  removeExercise,
  isLoading,
  exerciseInWorkoutId
}: Props) => {
  const [isDeleting, setIsDeleting] = useState(false)

  if (isDeleting && isLoading) {
    return <Skeleton w="100%" h="40px" />
  }
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
            <Button variant="ghost" onClick={() => { removeExercise && removeExercise(exerciseInWorkoutId, exercise); setIsDeleting(true) }}>
              <Text fontSize="lg">🗑️</Text>
            </Button>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default ExerciseBar;
