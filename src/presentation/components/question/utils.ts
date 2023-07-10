import { Letter } from "@presentation/components";

const mainClass = "btn-primary";
const errorClass = "btn-danger";

export const createElement = (): HTMLElement => {
  const node = document.createElement("div");

  node.classList.add("d-flex");
  node.style.gap = "8px";
  node.style.justifyContent = "center";

  return node;
};

export const createLetters = (
  letters: string[],
  onClick: (node: HTMLElement) => void,
) =>
  letters.map((letter) =>
    Letter({
      letter,
      className: mainClass,
      onClick,
    }),
  );

export const runErrorAnimation = (node?: Element) => {
  if (!node) {
    return;
  }

  node.classList.replace(mainClass, errorClass);

  setTimeout(() => {
    node.classList.replace(errorClass, mainClass);
  }, 300);
};

export const findChildNodeByLetter = (node: HTMLElement, letter: string) =>
  [...node.children].find(({ textContent }) => textContent === letter);

export const findChildIndexByNode = (
  parent: HTMLElement,
  child: Element | undefined,
) => {
  if (!child) {
    return -1;
  }
  return [...parent.children].indexOf(child);
};
