function prt(arr) {
  console.log(arr);
}

const myTodolist = [];
let tempIndex = -1;
let tempValue = "";

const input = document.getElementById("inp");
const btn = document.getElementById("btn");
const myList = document.getElementById("list");
const Updatebtn = document.getElementById("updateBtn");

btn.addEventListener("click", takeInput);
Updatebtn.addEventListener("click", function () {
  if (tempIndex == -1) {
    // update nothing
    return;
  }
  const newValue = input.value;
  // if value is not changed then no need to update
  if (tempValue === newValue) {
    alert("No Change Detected");
    return;
  }
  myTodolist[tempIndex] = newValue;
  storeToDoInLocalStorage();
  updateDom();
  input.value = "";
  toggleButton("none", "inline");
});

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
  updateDom();
}

function editTodo(index) {
  const valueToBeUpdated = myTodolist[index];
  tempValue = valueToBeUpdated;
  toggleButton("inline", "none");
  input.value = valueToBeUpdated;
  tempIndex = index;
}

function storeToDoInLocalStorage() {
  localStorage.setItem("todolist", JSON.stringify(myTodolist));
}

function updateDom() {
  myList.innerHTML = "";
  showOldTodos();
}

function toggleButton(update, add) {
  ((Updatebtn.style.display = update), (btn.style.display = add));
}

getOldTodos(); // calling a fucntion
showOldTodos();
