import React from "react";
import {
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
import { api } from "~/utils/api";
import { useRouter } from "next/router";

type Props = {
  workoutId: string;
};

export default function DeleteButton({ workoutId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { push } = useRouter();
  const { mutate } = api.workout.deleteWorkout.useMutation({
    onSuccess: (data) => {
      toast({ title: `Workout ${data.name} was removed`, status: "success" });
      push("/workout");
      onClose();
    },
    onError: (data) => {
      toast({
        title: "Failed to delete workout",
        status: "error",
        description: data.message,
      });
    },
  });
  return (
    <>
      <Button onClick={onOpen}>Delete</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Workout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete the workout?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => mutate({ workoutId })}>
              Delete Workout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
