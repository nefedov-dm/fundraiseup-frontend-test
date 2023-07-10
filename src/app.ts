import { ExercisesGroupEntity } from "@domain";

import { WordsRepository } from "@infrastructure";

import { Trainer } from "@presentation/components";
import { ExercisesStoreService } from "@presentation/services";

const storeService = new ExercisesStoreService();

export const initApp = (container: HTMLElement) => {
  const savedExercisesGroup = storeService.get();

  const isSavedExerciseGroup =
    savedExercisesGroup &&
    !savedExercisesGroup.isDone() &&
    confirm("Do you want to continue the exercise?");

  const exercisesGroup = isSavedExerciseGroup
    ? savedExercisesGroup
    : ExercisesGroupEntity.create({
        repository: new WordsRepository(),
        size: 6,
        errorLimit: 3,
      });

  const trainer = Trainer({ exercisesGroup });

  container.replaceChildren(trainer);
};
