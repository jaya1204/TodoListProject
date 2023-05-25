//let item = "value";
//localStorage.setItem("key", item);

console.log("running");

let todoList = [];
const form = document.getElementById("my-forms");
const inputText = document.getElementById("input-text");
const thingsToDo = document.getElementById("thingstodo");
const addTodoButton = document.getElementById("add-btn");

displayData();

function handleForm(event) {
  event.preventDefault(); // it prevents from refreshing the page before submitting the data.
  console.log("form submit" + inputText.value);

  if (inputText.value.length < 4) {
    //if conditions throws alert message when length of the value lessthen 4
    window.alert("give more descriptive");
    inputText.value = ""; //refresh the input
    return;
  }

  addToDo(inputText.value);
  // inputText.value = "";
}
//In addtoDoTo() function i created html elements div,p,button and appending it into things to do container and calling removeToDo() function
function addToDo(text) {
  const toDoId = Date.now();
  todoList.push({
    key: toDoId,
    todoitem: text,
  });

  const itemContainer = document.createElement("div");
  itemContainer.style.display = "flex";
  itemContainer.classList.add("todo-item");

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  editButton.addEventListener("click", () => editToDo(itemContainer, toDoId));

  const removeButton = document.createElement("button");
  removeButton.textContent = "Delete";

  removeButton.addEventListener("click", () =>
    removeToDo(itemContainer, toDoId)
  );

  itemContainer.append(paragraph, editButton, removeButton);

  inputText.value = "";
  saveData();
}

function editToDo(text, todoid) {
  inputText.value = text;
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
    const itemContainer = document.createElement("div");
    itemContainer.style.display = "flex";
    itemContainer.classList.add("todo-item");

    const paragraph = document.createElement("p");
    paragraph.textContent = todoItem.todoitem;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => editToDo(itemContainer));

    const removeButton = document.createElement("button");
    removeButton.textContent = "Delete";

    removeButton.addEventListener("click", () =>
      removeToDo(itemContainer, todoItem.key)
    );

    itemContainer.append(paragraph, editButton, removeButton);
    thingsToDo.appendChild(itemContainer);
  });
}
