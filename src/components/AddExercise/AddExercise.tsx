import {
  Heading,
  Stack,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import React from "react";
import { api } from "~/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExerciseSchema,
  MuscleGroup,
  Region,
  exerciseSchema,
} from "~/utils/types";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReactSelect, { GroupBase, Options } from 'react-select'

const AddExercise = () => {
  const toast = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, },
    reset,
    control,
    getValues
  } = useForm<ExerciseSchema>({ resolver: zodResolver(exerciseSchema) });
  const { mutate } = api.exercise.addExercise.useMutation({
    onSuccess: (data) => {
      toast({
        title: `Exercise created`,
        description: `${data.name} was created.`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      reset();
      router.push("/exercise");
    },
    onError: (data) => {
      toast({
        title: `Error`,
        description: `${data.message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (values: ExerciseSchema) => {
    console.log("test")
    mutate({
      name: values.name,
      routineType: values.routineType || "",
      description: values.description,
      muscleGroup: values.muscleGroup,
      region: values.region
    });
  };

  const muscleOptions = Object.values(MuscleGroup).map((option) => ({ value: option, label: option }))
  const regionOptions = Object.values(Region).map((option) => ({ value: option, label: option }))

  console.log("errors", errors)
  console.log("values", getValues())
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
          <FormControl isInvalid={!!errors.muscleGroup}>
            <FormLabel htmlFor="name">Muscle Group</FormLabel>
            <Controller
              name="muscleGroup"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  isMulti
                  id="muscleGroup"
                  {...field}
                  placeholder="Select option"
                  options={muscleOptions}
                />
              )}
              rules={{ required: true }}
            />

            <FormErrorMessage>
              {errors.muscleGroup && errors.muscleGroup.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.region}>
            <FormLabel htmlFor="name">Region</FormLabel>
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <ReactSelect
                  isMulti
                  id="region"
                  {...field}
                  placeholder="Select option"
                  options={regionOptions}
                />
              )}
              rules={{ required: true }}
            />

            <FormErrorMessage>
              {errors.region && errors.region.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.description}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              size='md'
              id="description"
              placeholder="description"
              {...register("description")}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
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
