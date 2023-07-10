import { ExerciseEntity } from "@domain";

import {
  createElement,
  createErrorLetters,
  createInputLetters,
  createSuccessLetters,
} from "./utils";

type AnswerProps = {
  exercise: ExerciseEntity;
  animation?: boolean;
};

export const Answer = ({
  exercise,
  animation = true,
}: AnswerProps): HTMLElement => {
  const node = createElement();

  if (exercise.isFailed()) {
    node.replaceChildren(...createErrorLetters(exercise.getWordLetters()));
    return node;
  }

  const letters = exercise.getAnswerLetters();

  if (!animation) {
    node.replaceChildren(...createSuccessLetters(letters));
    return node;
  }

  node.replaceChildren(...createInputLetters(letters));
  return node;
};
