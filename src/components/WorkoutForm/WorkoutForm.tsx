import { Box, Select, Stack, Text, Card, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import filter from "lodash/filter";
import includes from "lodash/includes";
import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import Fuse from 'fuse.js'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
} from "@chakra-ui/react";
import {
    Exercise,
    ExerciseInWorkout,
    MuscleGroup,
    MusicGroupType,
    Region,
    RegionType,
    WorkoutSchema,
} from "~/utils/types";
import ExerciseBar from "../ExerciseBar";


type Props = {
    onSubmit: (workout: WorkoutSchema) => void
    isLoading: boolean
    initialWorkoutData?: ExerciseInWorkout[]
    workoutValues?: WorkoutSchema
    isEdit?: boolean
    workoutId?: string
    refetch: () => void
}

export default function WorkoutForm({ onSubmit, isLoading: isCreateWorkoutLoading, workoutValues, initialWorkoutData, isEdit, workoutId, refetch }: Props) {
    const [exerciseList, setExerciseList] = useState<Exercise[]>([]);

    const { data: mainExerciseList } = api.exercise.listExercises.useQuery();

    const { isLoading: isRemoveLoading, mutate: removeThisExercise } = api.workout.removeExercise.useMutation({ onSettled: () => refetch() })
    const { isLoading: isAddingLoading, mutate: addExerciseToWorkout } = api.workout.addExerciseToWorkout.useMutation({ onSettled: () => refetch() })

    useEffect(() => {
        if (mainExerciseList && !exerciseList.length) {
            setExerciseList(mainExerciseList);
            updateFilter()
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
    } = useForm<WorkoutSchema>({ defaultValues: workoutValues });


    const updateFilter = () => {
        const formValues = getValues();
        const selectedExerciseList = getValues().exerciseInWorkout ?? []
        const muscleGroup = formValues.muscleGroup ?? ""
        const region = formValues.region ?? ""
        const selectedItemsRemoved = filter(
            mainExerciseList,
            (item: Exercise) => !includes(selectedExerciseList, item)
        );


        const fuse = new Fuse(selectedItemsRemoved, {
            keys: ["name", 'muscleGroup', 'routineType', 'description', 'region'],
            threshold: 0.5,
            isCaseSensitive: false,
        })

        if (region || muscleGroup || formValues.searchTerm) {
            console.log("search", formValues.searchTerm)
            const filtered = fuse.search(`${formValues.searchTerm} ${muscleGroup} ${region}`).map(item => item.item) as unknown as Exercise[]
            setExerciseList(filtered as Exercise[]);
        } else {
            setExerciseList(selectedItemsRemoved as Exercise[]);

        }
    };

    const addExercise = (exercise: Exercise) => {
        const selectedExerciseList = getValues().exerciseInWorkout ?? []
        if (isEdit && workoutId) {
            addExerciseToWorkout({ workoutId, exerciseId: exercise.id })
        } else {
            setValue("exerciseInWorkout", [...selectedExerciseList, exercise])
        }

        // filtering out selected
        const selectedIds = selectedExerciseList.map((ex) => ex.id);
        const mainListUpdate = exerciseList?.filter((ex) => ex.id != exercise.id);
        const updateList =
            mainListUpdate?.filter((ex) => !selectedIds.includes(ex.id)) ?? [];

        setExerciseList(updateList);
    };

    const removeExercise = (exerciseInWorkoutId: string, exercise: Exercise) => {
        const selectedExerciseList = getValues().exerciseInWorkout ?? []
        const trimmedList: Exercise[] = selectedExerciseList.filter(
            (item) => item.id != exerciseInWorkoutId
        );
        setExerciseList([...exerciseList, exercise]);
        setValue("exerciseInWorkout", trimmedList)

        const isInInitialData = !!initialWorkoutData?.find(item => item.id === exerciseInWorkoutId)

        if (isEdit && isInInitialData) {
            removeThisExercise({ workoutId: workoutId ?? "", exerciseInWorkoutId: exerciseInWorkoutId })
        }
    };
    const values = getValues()
    console.log("init data", initialWorkoutData)
    const initialWorkoutDataSorted = initialWorkoutData?.sort((a, b) => a.sortOrder - b.sortOrder)
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                            <FormLabel htmlFor="name" fontWeight="bold">Workout Name *</FormLabel>
                            <Input
                                id="name"
                                placeholder="name"
                                bg="white"
                                borderColor="gray.200"
                                isRequired
                                {...register("name", {
                                    required: "This is required",
                                    minLength: { value: 3, message: "Minimum length should be 3" },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.name && errors.name.message}
                            </FormErrorMessage>
                        </FormControl>

                        <Stack direction="row" pt="4">
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
                            <FormControl isInvalid={!!errors.region} >
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
                        <Stack>
                            <FormControl isInvalid={!!errors.searchTerm} >
                                <FormLabel htmlFor="searchTerm">Search</FormLabel>
                                <Input
                                    bg="white"
                                    borderColor="gray.200"
                                    placeholder="Select option"
                                    {...register("searchTerm")}
                                    onChange={(e) => {
                                        setValue("searchTerm", e.target.value);
                                        updateFilter();
                                    }}
                                />

                                <FormErrorMessage>
                                    {errors.region && errors.region.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Stack>
                        <Stack direction="row" width="fit" justifyContent="end" pt="4">

                            <Button
                                colorScheme="facebook"
                                isLoading={isSubmitting ?? isCreateWorkoutLoading}
                                type="submit"
                            >
                                {isEdit ? "Update" : "Create Workout"}
                            </Button>
                        </Stack>
                    </Card>
                    {isEdit && (

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
                                    {/* {!values?.exerciseInWorkout?.length && (
                                    <Box>
                                        <Text>No Exercises Selected </Text>
                                    </Box>
                                )} */}

                                    {initialWorkoutDataSorted?.map(({ exercise, id }) => (
                                        <ExerciseBar
                                            key={exercise.id}
                                            exercise={exercise}
                                            isRemoving
                                            exerciseInWorkoutId={id}
                                            removeExercise={removeExercise}
                                            isLoading={isRemoveLoading}

                                        />
                                    ))}

                                    {isAddingLoading && (
                                        <Skeleton w="100%" h="45px" />
                                    )}
                                </Stack>
                            </Card>
                            {exerciseList.map((exercise) => (
                                <ExerciseBar
                                    key={exercise.id}
                                    exerciseInWorkoutId=""
                                    exercise={exercise}
                                    isAdding
                                    addExercise={addExercise}
                                />
                            ))}
                        </Stack>
                    )}

                </Stack>
            </form>
            <DevTool control={control} placement="bottom-right" />
        </>
    )
}

