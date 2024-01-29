import { Box, Select, Stack, useToast } from "@chakra-ui/react";
import React from "react";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { RoutineTypeValues, WorkoutSchema } from "~/utils/types";
import { useRouter } from "next/router";

type Props = {};

function addWorkout({}: Props) {
  const toast = useToast();
  const { push } = useRouter();
  const { mutate, isLoading: isCreateWorkoutLoading } =
    api.workout.addWorkout.useMutation({
      onSuccess: (data) => {
        toast({ title: "Workout Added", status: "success" });
        push(`/workout/${data.id}`);
      },
      onError: (data) => {
        toast({
          title: "Failed to create workout.",
          status: "error",
          description: data.message,
        });
      },
    });

  const onSubmit = (values: WorkoutSchema) => {
    mutate({
      amount: values.amount,
      routineType: values.routineType,
      name: values.name,
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<WorkoutSchema>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Workout Name</FormLabel>
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
        <FormControl isInvalid={!!errors.amount}>
          <FormLabel htmlFor="amount">Amount</FormLabel>
          <Input
            id="amount"
            type="number"
            defaultValue={4}
            placeholder="amount"
            {...register("amount", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.amount && errors.amount.message}
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
          isLoading={isSubmitting || isCreateWorkoutLoading}
          type="submit"
        >
          Create Workout
        </Button>
      </Stack>
    </form>
  );
}

export default addWorkout;
