import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import { Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import MenuItemDeleteWorkout from "~/components/MenuItemDeleteWorkout";
import ProtectedRoute from "~/components/ProtectedRoute";
import WorkoutForm from "~/components/WorkoutForm";
import { api } from "~/utils/api";
import { WorkoutSchema } from "~/utils/types";


export default function EditWorkout() {
    const { query, push } = useRouter();
    const { isLoading, data: workoutData, refetch } = api.workout.getWorkout.useQuery(
        { workoutId: query?.editWorkoutId as string },
        { enabled: !!query?.editWorkoutId }
    );


    const { isLoading: isEditLoading, mutate: editMutate } = api.workout.editWorkout.useMutation({
        onSuccess: (values) => {
            push(`/workout/${values.id}`)
        }
    })


    const onSubmit = (values: WorkoutSchema) => {
        console.log("value submit", values)
        editMutate({ ...values, id: query?.editWorkoutId as string || "" })
    }

    return (
        <ProtectedRoute>
            <Stack>
                <Stack direction="row" padding="2" justifyContent="space-between">
                    <Heading>{workoutData?.name}</Heading>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                            variant='outline'
                        />
                        {workoutData &&
                            <MenuList>
                                <MenuItem icon={<SettingsIcon />} onClick={() => push(`/workout/${workoutData.id}`)} >
                                    Cancel Edit
                                </MenuItem>
                                <MenuItemDeleteWorkout workoutId={workoutData?.id} workoutTitle={workoutData?.name} />
                            </MenuList>
                        }
                    </Menu>
                </Stack>
                <WorkoutForm isLoading={isEditLoading} onSubmit={onSubmit} initialWorkoutData={workoutData as WorkoutSchema || {}} isEdit workoutId={workoutData?.id} refetch={refetch} />
            </Stack>
        </ProtectedRoute>
    )
}