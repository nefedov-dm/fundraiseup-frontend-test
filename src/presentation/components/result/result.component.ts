import { ExercisesGroupEntity } from "@domain";

type ResultProps = {
  exercisesGroup: ExercisesGroupEntity;
};

export const Result = ({ exercisesGroup }: ResultProps): HTMLElement => {
  const node = document.createElement("div");

  const wordsWithoutMistakes =
    exercisesGroup.getSuccessedExercisesWithoutErrorsCount();
  const mistakesCount = exercisesGroup.getErrorsCount();
  const wordWithMostMistakes = exercisesGroup
    .getExerciseWithMostErrorsCount()
    ?.getWord();

  const nodeWordsWithoutMistakes = document.createElement("p");
  nodeWordsWithoutMistakes.classList.add("mb-1", "mt-2");
  nodeWordsWithoutMistakes.textContent = `Number of words without mistakes: ${wordsWithoutMistakes}`;

  const nodeMistakes = document.createElement("p");
  nodeMistakes.classList.add("mb-1");
  nodeMistakes.textContent = `Number of mistakes: ${mistakesCount}`;

  const nodeWordsWithMostMistakes = document.createElement("p");
  nodeWordsWithMostMistakes.classList.add("mb-1");
  nodeWordsWithMostMistakes.textContent = `The word with the most mistakes: ${
    wordWithMostMistakes || "-"
  }`;

  node.replaceChildren(
    nodeWordsWithoutMistakes,
    nodeMistakes,
    nodeWordsWithMostMistakes,
  );

  return node;
};
