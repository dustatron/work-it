import { AddIcon, ChevronDownIcon, DragHandleIcon } from "@chakra-ui/icons";
import {
  Text,
  Stack,
  Card,
  Flex,
  Icon,
  Button,
  FormControl,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tag,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import { ExerciseInWorkout } from "~/utils/types";

type Props = {
  exercise: ExerciseInWorkout;
};

export default function ExerciseCard({ exercise }: Props) {
  const controls = useDragControls();
  const [reps, setReps] = useState(0);
  const [repTitle, setRepTitle] = useState("Rep");
  const [unitTitle, setUnitTitle] = useState("lbs");
  const [units, setUnits] = useState(0);
  const [sets, setSets] = useState(0);

  const item = exercise.exercise;

  return (
    <Reorder.Item
      key={exercise.id}
      value={exercise}
      style={{ listStyle: "none" }}
      dragListener={false}
      dragControls={controls}
    >
      <Card p={1} border="1px" borderColor="gray.300">
        <Stack direction="row" w="100%">
          <Stack w="100%" p="0">
            <Stack
              direction="row"
              justifyContent="space-between"
              w="100%"
              p="2"
            >
              <Stack direction="row" spacing={1} cursor="pointer">
                <Flex
                  alignItems="center"
                  onPointerDown={(e) => controls.start(e)}
                  px="2"
                >
                  <Icon as={DragHandleIcon} />
                </Flex>
                <Text
                  fontWeight="bold"
                  textTransform="capitalize"
                  alignContent="center"
                  userSelect="none"
                >
                  {item.name}
                </Text>
              </Stack>
              <Stack direction="row">
                <Tag
                  variant="subtle"
                  colorScheme="cyan"
                  size="md"
                  px="3"
                  userSelect="none"
                >
                  # {sets}
                </Tag>
                <Box display={{ base: "inherit", md: "none" }}>
                  <Button name="log" onClick={() => setSets(sets + 1)} px="3">
                    <Icon display="block" as={AddIcon} h="40px" />
                  </Button>
                </Box>
              </Stack>
            </Stack>
            <Stack
              direction={{ base: "column", sm: "column", md: "row" }}
              justifyContent={{ base: "center", md: "space-between" }}
            >
              <Stack
                direction="row"
                justifyContent={{ base: "center", md: "start" }}
              >
                <Box w={{ base: "50%", md: "40%" }}>
                  <FormControl>
                    <Stack direction="row" spacing="1">
                      <NumberInput
                        value={reps}
                        min={1}
                        max={50}
                        onChange={(e) => setReps(Number(e))}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Box>
                        <Menu>
                          <MenuButton
                            as={Button}
                            aria-label="Options"
                            rightIcon={<ChevronDownIcon />}
                            variant="outline"
                          >
                            {repTitle}{" "}
                          </MenuButton>
                          <MenuList>
                            <MenuItem onClick={() => setRepTitle("Reps")}>
                              Reps
                            </MenuItem>
                            <MenuItem onClick={() => setRepTitle("Min")}>
                              Min
                            </MenuItem>
                            <MenuItem onClick={() => setRepTitle("Sec")}>
                              Sec
                            </MenuItem>
                            <MenuItem onClick={() => setRepTitle("Laps")}>
                              Laps
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Box>
                    </Stack>
                  </FormControl>
                </Box>
                <Box w={{ base: "50%", md: "45%" }}>
                  <FormControl>
                    {/* <FormLabel>{unitTitle}</FormLabel> */}
                    <Stack direction="row" alignItems="center" spacing="1">
                      <NumberInput
                        value={units}
                        min={1}
                        max={500}
                        onChange={(e) => setUnits(Number(e))}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <Box>
                        <Menu>
                          <MenuButton
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                            variant="outline"
                          >
                            {unitTitle}
                          </MenuButton>
                          <MenuList>
                            <MenuItem onClick={() => setUnitTitle("lbs")}>
                              lbs
                            </MenuItem>
                            <MenuItem onClick={() => setUnitTitle("Intesity")}>
                              Intesity
                            </MenuItem>
                            <MenuItem onClick={() => setUnitTitle("None")}>
                              None
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Box>
                    </Stack>
                  </FormControl>
                </Box>
              </Stack>
              <Flex
                h="100%"
                w={{ base: "100%", sm: "100%", md: "auto" }}
                alignItems={{ base: "center", sm: "center", md: "end" }}
                justifyContent={{ base: "center", md: "end" }}
                px="2"
              >
                <Box display={{ base: "none", md: "inherit" }}>
                  <Button name="log" onClick={() => setSets(sets + 1)} py="2">
                    <Icon display="block" as={AddIcon} h="40px" />
                  </Button>
                </Box>
              </Flex>
            </Stack>
            <Stack>Log</Stack>
          </Stack>
        </Stack>
      </Card>
    </Reorder.Item>
  );
}
