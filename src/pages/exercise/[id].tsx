import {
  Button,
  Center,
  Heading,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { capitalize } from "lodash";
import { useRouter } from "next/router";
import React from "react";
import DeleteButton from "~/components/DeleteButton";
import Footer from "~/components/Footer";
import { api } from "~/utils/api";

export default function ExerciseDetail() {
  const { query } = useRouter();
  const { data } = api.exercise.getExercise.useQuery({
    id: query.id as string,
  });

  return (
    <Stack spacing={2} p="2" width="100%">
      <Center>
        <Heading as="h1" size="md">
          {data?.name}
        </Heading>
      </Center>
      <Stack>
        <Stack direction="row">
          <Text fontWeight="bold">Name: </Text>
          <Text>{data?.name}</Text>
        </Stack>
        <Stack direction="row">
          <Text fontWeight="bold">Routine Type: </Text>
          <Text>{data?.routineType}</Text>
        </Stack>
        {data?.description && (
          <Stack direction="row">
            <Text fontWeight="bold">Description: </Text>
            <Text>{data.description}</Text>
          </Stack>
        )}
        <Stack direction="row">
          <Text fontWeight="bold">Created on: </Text>
          <Text>
            {data?.dateCreated.getMonth()}/{data?.dateCreated.getDate()}/
            {data?.dateCreated.getFullYear()}
          </Text>
        </Stack>
        <Stack direction="row">
          <Text fontWeight="bold">Use in: </Text>
          <Text>{capitalize(data?.Workout?.name)}</Text>
        </Stack>
      </Stack>
      <Stack>
        <Center>
          <Heading as="h2" size="md">
            Logs
          </Heading>
        </Center>

        <TableContainer>
          <Table variant="simple">
            <TableCaption>Exercise Details</TableCaption>
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Weight</Th>
                <Th>Count</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.sets.map((set) => (
                <Tr key={set.id}>
                  <Td>{set.dateCreated.toDateString()}</Td>
                  <Td>{set.weight}</Td>
                  <Td isNumeric>{set.rep}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
      <Footer isCenter>
        {data?.id && <DeleteButton exerciseId={data.id} title={data.name} />}
        <Button colorScheme="twitter">
          Log{" "}
          <Text fontSize="lg" pl="2">
            {" "}
            📝
          </Text>
        </Button>
      </Footer>
    </Stack>
  );
}
