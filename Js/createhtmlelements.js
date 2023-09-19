import { todoList } from "./index.js";
export default function createHtmlElements(text, key) {
  const itemContainer = document.createElement("div");
  itemContainer.style.display = "flex";
  itemContainer.classList.add("todo-item");
  itemContainer.setAttribute("data-key", key);

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");
  editButton.addEventListener("click", () => editToDo(text, key));

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = text;
  inputField.style.display = "none";

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.classList.add("save-button");
  saveButton.addEventListener("click", () => saveToDo(text, key));
  saveButton.style.display = "none";

  const removeButton = document.createElement("button");
  removeButton.textContent = "Delete";
  removeButton.classList.add("delete-button");

  removeButton.addEventListener("click", () => removeToDo(itemContainer, key));

  itemContainer.append(
    paragraph,
    inputField,
    saveButton,
    editButton,
    removeButton
  );
  thingsToDo.appendChild(itemContainer);
}
