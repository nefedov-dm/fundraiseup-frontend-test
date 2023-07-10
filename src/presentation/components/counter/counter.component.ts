import { ExercisesGroupEntity } from "@domain";

type CounterProps = {
  exercisesGroup: ExercisesGroupEntity;
};

export const Counter = ({ exercisesGroup }: CounterProps): HTMLElement => {
  const node = document.createElement("p");
  node.classList.add("mb-5");

  node.append(
    `Question ${exercisesGroup.getCurrentExerciseNumber()} of ${exercisesGroup.getSize()}`,
  );

  return node;
};
