import React from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import {
  Box,
  Heading,
  Stack,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Flex,
  Badge,
  Button,
} from "@chakra-ui/react";
import { capitalize } from "lodash";
import { useSession } from "next-auth/react";
import ExerciseListSortable from "~/components/ExerciseListSortable";
import { AddIcon, EditIcon, TriangleDownIcon } from "@chakra-ui/icons";
import MenuItemDeleteWorkout from "~/components/MenuItemDeleteWorkout";

export default function WorkoutDetail() {
  const { query, push } = useRouter();
  const { status } = useSession();
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
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              <Heading>{capitalize(workoutData.name)}</Heading>
              <Flex alignItems="center">
                <Badge colorScheme="purple">
                  {workoutData.exerciseInWorkouts.length}
                </Badge>
              </Flex>
            </Stack>
            <Stack direction="row" pt="2">
              <Button rightIcon={<AddIcon />} colorScheme="twitter">
                Complete
              </Button>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<TriangleDownIcon />}
                  variant="outline"
                />
                {workoutData && (
                  <MenuList>
                    <MenuItem
                      icon={<EditIcon />}
                      onClick={() => push(`/workout/edit/${workoutData.id}`)}
                    >
                      Edit
                    </MenuItem>
                    <MenuItemDeleteWorkout
                      workoutId={workoutData?.id}
                      workoutTitle={workoutData?.name}
                    />
                  </MenuList>
                )}
              </Menu>
            </Stack>
          </Stack>
        </Box>
        <Stack spacing={5} py="2">
          {workoutData?.exerciseInWorkouts && (
            <ExerciseListSortable
              workoutItems={workoutData.exerciseInWorkouts}
            />
          )}
        </Stack>
      </Box>
    );
  }
}
