function prt(arr) {
  console.log(arr);
}

const myTodolist = [];

const input = document.getElementById("inp");
const btn = document.getElementById("btn");
const myList = document.getElementById("list");

btn.addEventListener("click", takeInput);

function takeInput() {
  let userInput = input.value;
  if (!userInput) {
    alert("Empty Not Allowed");
    return;
  }

  // store in the localstorage and once this operation is completed succesfully then show the data to user
  myTodolist.push(userInput);
  storeToDoInLocalStorage();
  // show data to user
  createNewLiElement(userInput, myTodolist.length - 1);
  input.value = "";
}

function createNewLiElement(userInput, index) {
  let li = document.createElement("li"); // create  new li element
  let label = document.createElement("label");
  label.textContent = userInput;
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "❌";
  let editButton = document.createElement("button");
  editButton.textContent = "✍🏻";
  deleteButton.addEventListener("click", function () {
    deleteElement(index);
  });
  editButton.addEventListener("click", function () {
    editTodo(index);
  });
  let div = document.createElement("div");
  div.appendChild(label);
  div.appendChild(deleteButton);
  div.appendChild(editButton);
  div.style.width = "180px";
  div.style.display = "flex";
  div.style.justifyContent = "space-between";
  div.style.marginBottom = "20px";
  li.appendChild(div);
  myList.appendChild(li); // append that li element in the OL/UL tag
}

function getOldTodos() {
  const oldTodos = JSON.parse(localStorage.getItem("todolist"));
  if (oldTodos) {
    for (let i = 0; i < oldTodos.length; i++) {
      myTodolist.push(oldTodos[i]);
    }
  }
}

function showOldTodos() {
  for (let i = 0; i < myTodolist.length; i++) {
    createNewLiElement(myTodolist[i], i);
  }
}

function deleteItemFromList(arr, index) {
  arr.splice(index, 1);
}

function deleteElement(index) {
  deleteItemFromList(myTodolist, index);
  storeToDoInLocalStorage();
  myList.innerHTML = "";
  showOldTodos();
}

function editTodo(index) {
  console.log(index);
}

function storeToDoInLocalStorage() {
  localStorage.setItem("todolist", JSON.stringify(myTodolist));
}

getOldTodos(); // calling a fucntion
showOldTodos();
