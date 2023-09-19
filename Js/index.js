//import { createHtmlElements } from "./createhtmlelements.js";

console.log("running");

export let todoList = [];
const form = document.getElementById("my-forms");
const inputText = document.getElementById("input-text");
const thingsToDo = document.getElementById("thingstodo");
const addTodoButton = document.getElementById("add-btn");
const formContainer = document.querySelector("#form-container");
const inputDate = document.querySelector("#input-date");
displayData();

function handleForm(event) {
  event.preventDefault(); // it prevents from refreshing the page before submitting the data.
  console.log("form submit" + inputDate.value);

  if (inputText.value.length < 4) {
    //if conditions throws alert message when length of the value lessthen 4
    window.alert("give more descriptive");
    inputText.value = ""; //refresh the input
    inputDate.value = "";
    return;
  }

  addToDo(inputText.value, inputDate.value);
  // inputText.value = "";
}

function addToDo(text, date) {
  const toDoId = Date.now();
  todoList.push({
    key: toDoId,
    todoitem: text,
    finishDate: date,
  });
  createHtmlElements(text, todoList.key, date);
  inputText.value = "";
  inputDate.value = "";
  saveData();
}

function editToDo(text, todoid) {
  const itemContainer = document.querySelector(`[data-key="${todoid}"]`);
  const paragraph = itemContainer.querySelector("p");
  const inputField = itemContainer.querySelector("input");
  const editButton = itemContainer.querySelector(".edit-button");
  const saveButton = itemContainer.querySelector(".save-button");
  paragraph.style.display = "none";
  inputField.style.display = "inline-block";
  // inputField.style.borderBottom = " 1px solid #abc4ff";
  //inputField.style.backgroundColor = "#abc4ff";
  editButton.style.display = "none";
  saveButton.style.display = "inline-block";
}

// this function removing to do items from the list
function removeToDo(removingdata, toDoId) {
  console.log(removingdata, toDoId);
  todoList = todoList.filter((todo) => todo.key !== toDoId);
  console.log(todoList);

  removingdata.remove();
  saveData();
}

form.addEventListener("submit", handleForm);
addTodoButton.addEventListener("click", handleForm);

function saveData() {
  localStorage.setItem("data", JSON.stringify(todoList));
}

function displayData() {
  let todo = localStorage.getItem("data");
  if (todo === null) {
    todoList = [];
  } else {
    todoList = JSON.parse(todo);
  }
  thingsToDo.innerHTML = ""; // Clear the existing list before displaying

  todoList.forEach((todoItem) => {
    createHtmlElements(todoItem.todoitem, todoItem.key, todoItem.finishDate);
  });
}

//In addtoDoTo() function i created html elements div,p,button and appending it into things to do container and calling removeToDo() function
function createHtmlElements(text, key, date) {
  const itemContainer = document.createElement("div");
  itemContainer.style.display = "flex";
  itemContainer.classList.add("todo-item");
  itemContainer.setAttribute("data-key", key);

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  const paragraph1 = document.createElement("p");
  paragraph1.textContent = date;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-button");
  editButton.addEventListener("click", () => editToDo(text, key));

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = text;
  inputField.style.display = "none";
  inputField.classList.add("Edit-input");

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
    paragraph1,
    inputField,
    saveButton,
    editButton,
    removeButton
  );
  thingsToDo.appendChild(itemContainer);
}

function saveToDo(text, key) {
  const itemContainer = document.querySelector(`[data-key="${key}"]`);

  const paragraph = itemContainer.querySelector("p");
  const inputField = itemContainer.querySelector("input");
  const editButton = itemContainer.querySelector(".edit-button");
  const saveButton = itemContainer.querySelector(".save-button");
  const newText = inputField.value;

  paragraph.textContent = newText;
  paragraph.style.display = "block";
  inputField.style.display = "none";
  editButton.style.display = "inline-block";
  saveButton.style.display = "none";

  // Update the todoList array with the edited text
  todoList.forEach((todoItem) => {
    if (todoItem.key === key) {
      todoItem.todoitem = newText;
    }
  });

  saveData();
}
