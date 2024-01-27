import {
  Heading,
  Stack,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React from "react";
import { api } from "~/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExerciseSchema,
  RoutineTypeValues,
  exerciseSchema,
} from "~/utils/types";
import { useToast } from "@chakra-ui/react";

type Props = {
  setTabIndex: (num: number) => void;
};

const AddExercise = ({ setTabIndex }: Props) => {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ExerciseSchema>({ resolver: zodResolver(exerciseSchema) });
  const { mutate } = api.exercise.addExercise.useMutation({
    onSuccess: (data) =>
      toast({
        title: `Exercise created`,
        description: `${data.name} was created.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
    onSettled: () => {
      setTabIndex(1);
      reset();
    },
  });

  const onSubmit = (values: ExerciseSchema) => {
    mutate({
      name: values.name,
      routineType: values.routineType,
      description: values.description,
    });
  };
  return (
    <Stack>
      <Heading>Add Exercise</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Exercise Name</FormLabel>
            <Input
              id="name"
              placeholder="name"
              {...register("name", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.description}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
              id="description"
              placeholder="description"
              {...register("description")}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">Routine Type</FormLabel>
            <Select placeholder="Select option" {...register("routineType")}>
              <option value={RoutineTypeValues.Pull}>Pull</option>
              <option value={RoutineTypeValues.Push}>Push</option>
              <option value={RoutineTypeValues.Core}>Core</option>
              <option value={RoutineTypeValues.Full}>Full</option>
            </Select>
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            w="100%"
          >
            Create Exercise
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default AddExercise;
