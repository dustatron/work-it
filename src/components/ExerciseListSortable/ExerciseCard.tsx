import { DragHandleIcon } from "@chakra-ui/icons";
import { Text, Stack, Card, Flex, Icon, Button } from "@chakra-ui/react";
import { Exercise } from "@prisma/client";

type Props = {
  exercise: Exercise;
};

export default function ExerciseCard({ exercise }: Props) {
  return (
    <Card p={1}>
      <Stack direction="row" w="100%">
        <Flex alignContent={"center"} justifyContent={"center"}>
          <Icon display="block" as={DragHandleIcon} h="40px" />
        </Flex>
        <Stack w="100%">
          <Stack direction="row" justifyContent="space-between" w="100%">
            <Text
              fontWeight="bold"
              textTransform="capitalize"
              alignContent="center"
            >
              {exercise.name}
            </Text>
            {/* <Button>
                        Edit
                    </Button> */}
          </Stack>
          <Stack></Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
