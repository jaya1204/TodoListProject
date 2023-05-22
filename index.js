//let item = "value";
//localStorage.setItem("key", item);

console.log("running");

let todoList = [];
const form = document.getElementById("my-forms");
const inputText = document.getElementById("input-text");
const thingsToDo = document.getElementById("thingstodo");
const addTodoButton = document.getElementById("add-btn");
//showData();

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

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Delete";

  removeButton.addEventListener("click", () =>
    removeToDo(itemContainer, toDoId)
  );

  itemContainer.append(paragraph, removeButton);
  thingsToDo.appendChild(itemContainer);
  inputText.value = "";
  saveData();
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
//form.addEventListener("submit", (event) => event.preventDefault());

function saveData() {
  localStorage.setItem("data", JSON.stringify(todoList));
}

/*function showData() {
  thingsToDo.textContent = localStorage.getItem("data");
}*/
