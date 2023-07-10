type LetterProps = {
  letter: string;
  className?: string;
  onClick?: (node: HTMLElement) => void;
};

export const Letter = ({
  letter,
  className,
  onClick,
}: LetterProps): HTMLElement => {
  const node = document.createElement("button");
  node.classList.add("btn");
  node.style.width = "38px";
  node.style.height = "38px";

  if (className) {
    node.classList.add(className);
  }

  if (onClick) {
    node.addEventListener("click", () => {
      onClick(node);
    });
  }

  node.textContent = letter;

  return node;
};
