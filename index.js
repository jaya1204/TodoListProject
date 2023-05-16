console.log("running");

let todoList = [];
const form = document.getElementById("my-forms");
const inputText = document.getElementById("input-text");
const thingsToDo = document.getElementById("thingstodo");
const addTodoButton = document.getElementById("add-btn");

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
  inputText.value = "";
}
//In addtoDoTo() function i created html elements div,p,button and appending it into things to do container and calling removeToDo() function
function addToDo(text) {
  const toDoId = Date.now();
  todoList.push({
    key: toDoId,
    todoitem: text,
  });

  console.log(todoList);

  const itemContainer = document.createElement("div");
  itemContainer.style.display = "flex";

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove item from to do";

  removeButton.addEventListener("click", () =>
    removeToDo(itemContainer, toDoId)
  );

  itemContainer.append(paragraph, removeButton);
  thingsToDo.appendChild(itemContainer);
}
// this function removing to do items from the list
function removeToDo(removingdata, toDoId) {
  removingdata.remove();
}

form.addEventListener("submit", handleForm);
addTodoButton.addEventListener("click", handleForm);
//form.addEventListener("submit", (event) => event.preventDefault());
