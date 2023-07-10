import { Letter } from "@presentation/components";

const transitionClass = "btn-primary";
const successClass = "btn-success";
const errorClass = "btn-danger";

export const createElement = (): HTMLElement => {
  const node = document.createElement("div");
  node.style.gap = "8px";
  node.style.alignItems = "center";
  node.style.justifyContent = "center";
  node.style.height = "46px";
  node.style.borderRadius = "6px";
  node.classList.add("d-flex", "bg-light", "mb-3", "p-1");

  return node;
};

export const createErrorLetters = (letters: string[]) => {
  return letters.map((letter) => Letter({ letter, className: errorClass }));
};

export const createSuccessLetters = (letters: string[]) => {
  return letters.map((letter) => Letter({ letter, className: successClass }));
};

export const createInputLetters = (letters: string[]) => {
  return letters.map((letter, index) => {
    if (index !== letters.length - 1) {
      return Letter({ letter, className: successClass });
    }
    const letterNode = Letter({ letter, className: transitionClass });
    setTimeout(() => {
      letterNode.classList.replace(transitionClass, successClass);
    }, 100);
    return letterNode;
  });
};
