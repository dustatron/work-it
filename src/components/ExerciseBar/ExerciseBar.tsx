import { Box, Button, Card, Center, Flex, Stack, Text } from "@chakra-ui/react";
import { Exercise } from "@prisma/client";
import { capitalize } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  exercise: Exercise;
};

const ExerciseBar = ({ exercise }: Props) => {
  return (
    <Card p="2" w="100%">
      <Stack direction="row" justifyContent="space-between">
        <Center>
          <Text fontSize="lg" fontWeight="bold">
            {capitalize(exercise.name)}
          </Text>
        </Center>
        <Box>
          <Link href={`/exercise/${exercise.id}`}>
            <Button variant="ghost">
              <Text fontSize="lg">⚙️</Text>
            </Button>
          </Link>
        </Box>
      </Stack>
    </Card>
  );
};

export default ExerciseBar;
