export const Title = (): HTMLElement => {
  const node = document.createElement("h2");
  node.classList.add("mb-5");

  node.textContent = "English Vocabulary Trainer";

  return node;
};
