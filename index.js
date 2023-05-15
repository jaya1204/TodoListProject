console.log("running");
const forms = document.getElementById("my-forms");
const inputText = document.getElementById("input-text");
const thingsToDo = document.getElementById("thingstodo");
const addTodoButton = document.getElementById("add-btn");

function handleForm() {
  console.log("form submit", inputText.value);
  addToDo(inputText.value);
}

function addToDo(text) {
  const itemContainer = document.createElement("div");
  itemContainer.style.display = "flex";

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  const removebutton = document.createElement("button");
  removebutton.textContent = "Remove item from to do";

  itemContainer.append(paragraph, removebutton);
  thingsToDo.appendChild(itemContainer);
}

function removeToDo() {}

//forms.addEventListener("submit", handleForm);
addTodoButton.addEventListener("click", () => handleForm);
