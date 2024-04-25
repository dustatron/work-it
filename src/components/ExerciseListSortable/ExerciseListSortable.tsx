import { Reorder, useDragControls } from "framer-motion";
import { useState } from "react";
import { api } from "~/utils/api";
import { ExerciseInWorkout } from "~/utils/types";
import ExerciseCard from "./ExerciseCard";
import { Stack } from "@chakra-ui/react";

type Props = {
  workoutItems: ExerciseInWorkout[];
};

export default function ExerciseListSortable({ workoutItems }: Props) {
  const { mutate } = api.workout.updateSortOrder.useMutation();
  const intialList = workoutItems.sort((a, b) => a.sortOrder - b.sortOrder);
  const [exericeList, setExericeList] = useState(intialList);
  const handleNewSort = (sort: ExerciseInWorkout[]) => {
    const newOrder = sort.map((item, index) => ({
      id: item?.id,
      sortOrder: `${index}`,
    }));
    mutate({ newOrder });
  };

  return (
    <Reorder.Group
      axis="y"
      values={exericeList}
      onReorder={(order) => {
        setExericeList(order);
        handleNewSort(order);
      }}
    >
      <Stack>
        {exericeList.map((item) => (
          <ExerciseCard exercise={item} key={item.id} />
        ))}
      </Stack>
    </Reorder.Group>
  );
}
