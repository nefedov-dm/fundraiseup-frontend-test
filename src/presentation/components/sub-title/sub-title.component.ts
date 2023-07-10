export const SubTitle = (): HTMLElement => {
  const node = document.createElement("p");
  node.classList.add("lead", "mb-1");

  node.textContent = "Form a valid English word using the given letters";

  return node;
};
