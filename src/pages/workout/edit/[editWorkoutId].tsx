import { Button, Heading, Stack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import WorkoutForm from "~/components/WorkoutForm";
import { api } from "~/utils/api";
import { WorkoutSchema } from "~/utils/types";


export default function EditWorkout() {
    const { query } = useRouter();
    const { data: session, status } = useSession()
    const { isLoading, data: workoutData } = api.workout.getWorkout.useQuery(
        { workoutId: query?.editWorkoutId as string },
        { enabled: !!query?.editWorkoutId }
    );



    const [isEditing, setIsEditing] = useState(false)

    return (
        <Stack>
            <Stack direction="row" padding="2" justifyContent="space-between">
                <Heading>{workoutData?.name}</Heading>
                <Button variant="ghost" onClick={() => setIsEditing(!isEditing)}> ⚙️ {isEditing ? "Cancel" : "Edit"}  </Button>
            </Stack>
            {isEditing && <form>
                <WorkoutForm isLoading={false} onSubmit={() => { }} initialWorkoutData={workoutData as WorkoutSchema || {}} isEdit />
            </form>}
        </Stack>
    )
}