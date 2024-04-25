import React from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Center,
  Flex,
  Badge,
} from "@chakra-ui/react";
import Footer from "~/components/Footer";
import { capitalize } from "lodash";
import { useSession } from "next-auth/react";
import ExerciseListSortable from "~/components/ExerciseListSortable";
import { AddIcon, HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import MenuItemDeleteWorkout from "~/components/MenuItemDeleteWorkout";

export default function WorkoutDetail() {
  const { query, push } = useRouter();
  const { status } = useSession();
  const { isLoading, data: workoutData } = api.workout.getWorkout.useQuery(
    { workoutId: query?.workoutId as string },
    { enabled: !!query?.workoutId },
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
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              {workoutData && (
                <MenuList>
                  <MenuItem
                    icon={<AddIcon />}
                    onClick={() => alert("coming soon...")}
                  >
                    Log Workout
                  </MenuItem>
                  <MenuItem
                    icon={<SettingsIcon />}
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
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={5}
            borderBottom="1px solid black"
            p="0"
          ></Stack>
        </Box>
        <Stack spacing={5} py="2" h="fit" overflow="auto">
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
