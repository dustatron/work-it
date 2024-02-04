import { Box, Select, Stack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import {
  Exercise,
  MuscleGroup,
  MusicGroupType,
  Region,
  RegionType,
  WorkoutSchema,
} from "~/utils/types";
import { useRouter } from "next/router";
import ExerciseBar from "~/components/ExerciseBar";

export default function AddWorkout() {
  const toast = useToast();
  const { push } = useRouter();

  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);
  const [selectedExerciseList, setSelectedExerciseList] = useState<Exercise[]>(
    []
  );

  const { data: mainExerciseList } = api.exercise.listExercises.useQuery();

  useEffect(() => {
    if (mainExerciseList && !exerciseList.length) {
      setExerciseList(mainExerciseList);
    }
  }, [mainExerciseList]);

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
      name: values.name,
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useForm<WorkoutSchema>();

  const updateFilter = () => {
    const formValues = getValues();
    const muscleGroup = formValues.muscleGroup;
    const region = formValues.region;
    let result: Exercise[] = mainExerciseList || [];

    const muscleGroupFilter: Exercise[] =
      mainExerciseList?.filter((exercise) => {
        return exercise.muscleGroup.includes(muscleGroup?.toLowerCase() || "");
      }) || [];

    const regionFilter: Exercise[] =
      mainExerciseList?.filter((exercise) =>
        exercise.region.includes(region?.toLowerCase() || "")
      ) || [];
    result = [...regionFilter];

    if (muscleGroup && region) {
      setExerciseList([...muscleGroupFilter, ...regionFilter]);
    } else if (muscleGroup) {
      setExerciseList([...muscleGroupFilter]);
    } else if (region) {
      setExerciseList([...regionFilter]);
    } else {
      setExerciseList(mainExerciseList || []);
    }
  };

  const addExercise = (exercise: Exercise) => {
    setSelectedExerciseList([...selectedExerciseList, exercise]);
    const selectedIds = selectedExerciseList.map((ex) => ex.id);
    const mainListUpdate = mainExerciseList?.filter(
      (ex) => ex.id != exercise.id
    );
    const updateList =
      mainListUpdate?.filter((ex) => !selectedIds.includes(ex.id)) || [];

    console.log(updateList);
    setExerciseList(updateList);
  };

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
              minLength: { value: 3, message: "Minimum length should be 3" },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.muscleGroup}>
          <FormLabel htmlFor="muscleGroupd">Muscle Group</FormLabel>
          <Select
            placeholder="Select option"
            {...register("muscleGroup")}
            onChange={(e) => {
              setValue("muscleGroup", e.target.value as MusicGroupType);
              updateFilter();
            }}
          >
            <option value={MuscleGroup.Pull}>Pull</option>
            <option value={MuscleGroup.Push}>Push</option>
            <option value={MuscleGroup.Core}>Core</option>
            <option value={MuscleGroup.Cardio}>Cardio</option>
          </Select>
          <FormErrorMessage>
            {errors.muscleGroup && errors.muscleGroup.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.region}>
          <FormLabel htmlFor="Region">Region</FormLabel>
          <Select
            placeholder="Select option"
            {...register("region")}
            onChange={(e) => {
              setValue("region", e.target.value as RegionType);
              updateFilter();
            }}
          >
            <option value={Region.Core}>Core</option>
            <option value={Region.Upper}>Upper</option>
            <option value={Region.Lower}>Lower</option>
            <option value={Region.FullBody}>Full Body</option>
          </Select>
          <FormErrorMessage>
            {errors.region && errors.region.message}
          </FormErrorMessage>
        </FormControl>
        <Stack>
          {selectedExerciseList.map((exercise) => (
            <ExerciseBar key={exercise.id} exercise={exercise} isRemoving />
          ))}
          {exerciseList.map((exercise) => (
            <ExerciseBar
              key={exercise.id}
              exercise={exercise}
              isAdding
              addExercise={addExercise}
            />
          ))}
        </Stack>

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
