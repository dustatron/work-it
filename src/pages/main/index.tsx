import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { api } from "~/utils/api";
import AddExercise from "./AddExercise";
import Workout from "./Workout";
import Exercise from "./Exercise";

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
          <TabPanel>
            <Workout />
          </TabPanel>

          <TabPanel h="100%">
            <Exercise exerciseData={exerciseData} />
          </TabPanel>
          <TabPanel>
            <AddExercise setTabIndex={setTabIndex} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
