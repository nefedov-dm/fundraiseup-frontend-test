import { ExercisesGroupEntity } from "@domain";

import {
  Answer,
  Title,
  Question,
  SubTitle,
  Counter,
  Result,
} from "@presentation/components";
import {
  ExercisesHistoryService,
  ExercisesStoreService,
} from "@presentation/services";

import { createElement, getCurrentExercise } from "./utils";

type TrainerProps = {
  exercisesGroup: ExercisesGroupEntity;
};

const historyService = new ExercisesHistoryService();
const storeService = new ExercisesStoreService();

export const Trainer = ({ exercisesGroup }: TrainerProps): HTMLElement => {
  const title = Title();
  const subTitle = SubTitle();
  const content = document.createElement("div");

  const node = createElement(title, subTitle, content);

  const renderCurrentExersice = (
    exercisesGroup: ExercisesGroupEntity,
    init?: boolean,
  ) => {
    const exercise = exercisesGroup.getCurrentExercise();

    if (exercise?.isFailed()) {
      setTimeout(() => {
        exercisesGroup.nextExercise();
        historyService.push(exercisesGroup);
        renderCurrentExersice(exercisesGroup);
      }, 300);
    }

    if (exercise) {
      content.replaceChildren(
        Counter({ exercisesGroup }),
        Answer({ exercise, animation: init !== true }),
        Question({
          exercise,
          onSuccessInputLetter: () => {
            renderCurrentExersice(
              getCurrentExercise(exercisesGroup, historyService),
            );
          },
        }),
      );
    } else {
      content.replaceChildren(Result({ exercisesGroup }));
    }

    if (exercisesGroup.isDone()) {
      storeService.remove();
    } else {
      storeService.set(exercisesGroup);
    }
  };

  historyService.push(exercisesGroup);
  renderCurrentExersice(exercisesGroup, true);

  addEventListener("popstate", () => {
    renderCurrentExersice(historyService.get(), true);
  });

  return node;
};
