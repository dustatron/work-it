import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { ExerciseSchema, exerciseSchema } from "~/utils/types";
import { DevTool } from "@hookform/devtools";


export default function EditWorkout() {
    const { query } = useRouter();
    const { data: session, status } = useSession()
    const { isLoading, data: workoutData } = api.workout.getWorkout.useQuery(
        { workoutId: query?.id as string },
        { enabled: !!query?.id }
    );

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
        control,
        getValues
    } = useForm<ExerciseSchema>({ resolver: zodResolver(exerciseSchema), defaultValues: { name: workoutData?.name } });

    const [isEditing, setIsEditing] = useState(false)

    return (
        <Stack>
            <Stack direction="row" padding="2" justifyContent="space-between">
                <Heading>{workoutData?.name}</Heading>
                <Button variant="ghost" onClick={() => setIsEditing(!isEditing)}> ⚙️ Settings </Button>
            </Stack>
            {isEditing && <form>
                <Stack spacing="6">

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
                </Stack>
            </form>}
            <DevTool control={control} />
        </Stack>
    )
}