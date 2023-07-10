import { ExerciseEntity } from "@domain";

import {
  createElement,
  createLetters,
  findChildIndexByNode,
  findChildNodeByLetter,
  runErrorAnimation,
} from "./utils";

type QuestionProps = {
  exercise: ExerciseEntity;
  onSuccessInputLetter: () => void;
};

export const Question = ({
  exercise,
  onSuccessInputLetter,
}: QuestionProps): HTMLElement => {
  const node = createElement();

  const onInputLetter = (letterNode?: Element) => {
    const success = exercise.inputLetter(
      findChildIndexByNode(node, letterNode),
    );

    if (!success && !exercise.isFailed()) {
      runErrorAnimation(letterNode);
      return;
    }

    document.removeEventListener("keyup", onKeyup);
    onSuccessInputLetter();
  };

  const onKeyup = (event: KeyboardEvent) => {
    const { key: letter, metaKey, shiftKey, altKey, ctrlKey } = event;
    if (metaKey || shiftKey || altKey || ctrlKey || letter.length > 1) {
      return;
    }
    onInputLetter(findChildNodeByLetter(node, letter));
  };

  const onChangeHistory = () => {
    document.removeEventListener("keyup", onKeyup);
    document.removeEventListener("popstate", onChangeHistory);
  };

  addEventListener("popstate", onChangeHistory);
  document.addEventListener("keyup", onKeyup);

  node.replaceChildren(
    ...createLetters(exercise.getQuestionLetters(), onInputLetter),
  );
  return node;
};
