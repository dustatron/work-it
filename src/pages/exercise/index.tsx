import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Box,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { api } from "~/utils/api";
import capitalize from "lodash/capitalize";
import AddExercise from "./AddExercise";

type Props = {};

export default function index({}: Props) {
  const [tabIndex, setTabIndex] = useState(0);
  const { isLoading, data: exerciseData } =
    api.exercise.listExercises.useQuery();
  return (
    <Container height="100%">
      <Tabs
        height="100%"
        variant="enclosed"
        index={tabIndex}
        onChange={(index) => setTabIndex(index)}
      >
        <TabList>
          <Tab>Workouts</Tab>
          <Tab>Exercises</Tab>
          <Tab>Add Exercise</Tab>
        </TabList>

        <TabPanels h="100%">
          <TabPanel>workout</TabPanel>

          <TabPanel h="100%">
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
          </TabPanel>
          <TabPanel>
            <AddExercise setTabIndex={setTabIndex} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
