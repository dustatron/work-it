import { Box, Select, Stack, useToast, Text, Card } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import filter from "lodash/filter";
import includes from "lodash/includes";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
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
import ExerciseBar from "../ExerciseBar";
import useFormPersist from 'react-hook-form-persist'


type Props = {
    onSubmit: (workout: WorkoutSchema) => void
    isLoading: boolean
    initialWorkoutData?: WorkoutSchema
}

export default function WorkoutForm({ onSubmit, isLoading: isCreateWorkoutLoading, initialWorkoutData }: Props) {
    const toast = useToast();
    const [exerciseList, setExerciseList] = useState<Exercise[]>([]);

    const { data: mainExerciseList } = api.exercise.listExercises.useQuery();

    useEffect(() => {
        if (mainExerciseList && !exerciseList.length) {
            setExerciseList(mainExerciseList);
        }
    }, [mainExerciseList]);

    const {
        control,
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        getValues,
        setValue,
        watch,
        reset
    } = useForm<WorkoutSchema>({ defaultValues: { ...initialWorkoutData } });

    useFormPersist("workoutForm", {
        watch,
        setValue,
    });

    const updateFilter = () => {
        const selectedExerciseList = getValues().exercises || []
        const formValues = getValues();
        const muscleGroup = formValues.muscleGroup;
        const region = formValues.region;
        const selectedItemsRemoved = filter(
            mainExerciseList,
            (item: Exercise) => !includes(selectedExerciseList, item)
        );

        const filtered: Exercise[] = filter(
            selectedItemsRemoved,
            (item: Exercise) => {
                if (muscleGroup && region) {
                    return (
                        includes(item.muscleGroup.map(muscle => muscle.toLowerCase()), muscleGroup?.toLowerCase()) &&
                        includes(item.region.map(region => region.toLowerCase()), region?.toLowerCase())
                    );
                } else if (muscleGroup) {
                    return includes(item.muscleGroup.map(muscle => muscle.toLowerCase()), muscleGroup?.toLowerCase());
                } else if (region) {
                    return includes(item.region.map(region => region.toLowerCase()), region?.toLowerCase());
                } else {
                    return true;
                }
            }
        );
        setExerciseList(filtered);
    };

    const addExercise = (exercise: Exercise) => {
        const selectedExerciseList = getValues().exercises || []
        setValue("exercises", [...selectedExerciseList, exercise])

        // filtering out selected
        const selectedIds = selectedExerciseList.map((ex) => ex.id);
        const mainListUpdate = exerciseList?.filter((ex) => ex.id != exercise.id);
        const updateList =
            mainListUpdate?.filter((ex) => !selectedIds.includes(ex.id)) || [];

        setExerciseList(updateList);
    };

    const removeExercise = (exercise: Exercise) => {
        const selectedExerciseList = getValues().exercises || []
        const trimmedList: Exercise[] = selectedExerciseList.filter(
            (item) => item.id != exercise.id
        );
        setExerciseList([...exerciseList, exercise]);
        setValue("exercises", trimmedList)
    };
    const values = getValues()
    return (
        <>
            <form onSubmit={handleSubmit((values) => { onSubmit(values); localStorage.removeItem("workoutForm") })}>
                <Stack spacing={2}>
                    <Card
                        p="4"
                        marginTop="2"
                        boxShadow="md"
                        bg="gray.50"
                        border="2px"
                        borderColor="gray.200"
                    >
                        <FormControl isInvalid={!!errors.name}>
                            <Text as="h2" fontWeight="bold" fontSize="x-large" align="center">
                                Workout Details
                            </Text>
                            <FormLabel htmlFor="name">Workout Name</FormLabel>
                            <Input
                                id="name"
                                placeholder="name"
                                bg="white"
                                borderColor="gray.200"
                                {...register("name", {
                                    required: "This is required",
                                    minLength: { value: 3, message: "Minimum length should be 3" },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.name && errors.name.message}
                            </FormErrorMessage>
                        </FormControl>

                        <Stack direction="row">
                            <FormControl isInvalid={!!errors.muscleGroup}>
                                <FormLabel htmlFor="muscleGroupd">Muscle Group</FormLabel>
                                <Select
                                    bg="white"
                                    borderColor="gray.200"
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
                                    bg="white"
                                    borderColor="gray.200"
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
                        </Stack>
                    </Card>
                    <Stack direction="row" width="fit" justifyContent="space-between">

                        <Button
                            colorScheme="teal"
                            isLoading={isSubmitting || isCreateWorkoutLoading}

                            onClick={() => reset()}
                        >
                            Clear
                        </Button>
                        <Button
                            colorScheme="teal"
                            isLoading={isSubmitting || isCreateWorkoutLoading}
                            type="submit"
                            isDisabled={!values?.exercises?.length}
                        >
                            Create Workout
                        </Button>
                    </Stack>
                    <Stack>
                        <Card
                            p="4"
                            boxShadow="md"
                            bg="gray.50"
                            border="2px"
                            borderColor="gray.200"
                        >
                            <Box>
                                <Text as="h2" fontWeight="bold" fontSize="x-large" align="center">
                                    Selected Exercises
                                </Text>
                            </Box>
                            <Stack>
                                {!values?.exercises?.length && (
                                    <Box>
                                        <Text>No Exercises Selected </Text>
                                    </Box>
                                )}
                                {values?.exercises?.map((exercise) => (
                                    <ExerciseBar
                                        key={exercise.id}
                                        exercise={exercise}
                                        isRemoving
                                        removeExercise={removeExercise}
                                    />
                                ))}
                            </Stack>
                        </Card>
                        {exerciseList.map((exercise) => (
                            <ExerciseBar
                                key={exercise.id}
                                exercise={exercise}
                                isAdding
                                addExercise={addExercise}
                            />
                        ))}
                    </Stack>
                </Stack>
            </form>
            <DevTool control={control} placement="bottom-right" />
        </>
    )
}