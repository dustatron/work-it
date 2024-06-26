import {
  Button,
  Center,
  Heading,
  Stack,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import DeleteButton from "~/components/DeleteButton";
import Footer from "~/components/Footer";
import { api } from "~/utils/api";

export default function ExerciseDetail() {
  const { query } = useRouter();
  const { data: session, status } = useSession();
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
          <Text fontWeight="bold">region: </Text>
          <Text>{data?.region.map((reg) => <Box key={reg}>{reg}</Box>)}</Text>
        </Stack>
        <Stack direction="row">
          <Text fontWeight="bold">muscle group: </Text>
          <Text>
            {data?.muscleGroup.map((mus) => <Box key={mus}>{mus}</Box>)}
          </Text>
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
          </Table>
        </TableContainer>
      </Stack>
      {status === "authenticated" && (
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
      )}
    </Stack>
  );
}
