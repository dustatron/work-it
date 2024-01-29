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
  title: string;
  workoutId?: string;
  exerciseId?: string;
};

export default function DeleteButton({ title, workoutId, exerciseId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { push } = useRouter();
  const { mutate: deleteWorkout } = api.workout.deleteWorkout.useMutation({
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

  const { mutate: deleteExercise } = api.exercise.deleteExercise.useMutation({
    onSuccess: (data) => {
      toast({
        title: `The Exercise, ${data.name} was removed`,
        status: "success",
      });
      push("/exercise");
    },
    onError: (data) => {
      toast({
        title: "Failed to delete exercise",
        status: "error",
        description: data.message,
      });
    },
  });

  const handleDelete = () => {
    if (workoutId) {
      deleteWorkout({ workoutId });
    }
    if (exerciseId) {
      deleteExercise({ exerciseId });
    }
  };

  const typeToDelete = workoutId ? "workout" : "exercise";
  return (
    <>
      <Button onClick={onOpen} colorScheme="red">
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Delete {title} {typeToDelete}?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this {title} {typeToDelete}?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete {typeToDelete}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
