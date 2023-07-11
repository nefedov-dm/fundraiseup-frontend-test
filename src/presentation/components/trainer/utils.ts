import { ExerciseEntity, ExercisesGroupEntity } from "@domain";

import { ExercisesHistoryService } from "@presentation/services/exercises-history";

export const createElement = (
  title: HTMLElement,
  subTitle: HTMLElement,
  content: HTMLElement,
): HTMLElement => {
  const node = document.createElement("div");

  node.classList.add(
    "d-flex",
    "flex-column",
    "align-items-center",
    "w-100",
    "text-center",
    "mx-auto",
  );

  node.appendChild(title);
  node.appendChild(subTitle);
  node.appendChild(content);

  return node;
};

export const getCurrentExercise = (
  exercisesGroup: ExercisesGroupEntity,
  historyService: ExercisesHistoryService,
): ExercisesGroupEntity => {
  const currentExercise = exercisesGroup.getCurrentExercise();
  historyService.replace(exercisesGroup);

  if (currentExercise?.isSuccessed()) {
    exercisesGroup.nextExercise();
    historyService.push(exercisesGroup);
    return exercisesGroup;
  }

  return exercisesGroup;
};
