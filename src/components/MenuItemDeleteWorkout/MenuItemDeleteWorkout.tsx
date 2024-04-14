import { CloseIcon } from "@chakra-ui/icons";
import {
    MenuItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

type Props = {
    workoutId: string
    workoutTitle: string
}


export default function MenuItemDeleteWorkout({ workoutId, workoutTitle }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { push } = useRouter()
    const { isLoading, mutate } = api.workout.deleteWorkout.useMutation({
        onSuccess: () => {
            toast({
                title: `Workout Delete`,
                description: `${workoutTitle} was deleted.`,
                status: "success",
                duration: 9000,
                isClosable: true,
            });
            push("/workout")
        }
    })
    const toast = useToast();

    const handleDelete = () => {
        mutate({ workoutId })
    }

    return <>
        <MenuItem icon={<CloseIcon />} onClick={onOpen}>
            Delete
        </MenuItem>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete workout</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Do you want to delete {workoutTitle}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' variant="outline" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="red" isLoading={isLoading} onClick={handleDelete}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}