const stage = {
  0: "todo",
  1: "doing",
  2: "done",
};
const stagesByIndex = Object.values(stage);
let todoList = [];

// Function to save todo lists to local storage
function saveListsToLocalStorage() {
  const data = {
    todo: todoList,
  };
  localStorage.setItem("todo_lists", JSON.stringify(data));
}

// Function to load todo lists from local storage
function loadListsFromLocalStorage() {
  const data = localStorage.getItem("todo_lists");
  if (data) {
    const parsedData = JSON.parse(data);
    todoList = parsedData.todo;
    renderLists();
  }
}

// Call loadListsFromLocalStorage when the page loads
loadListsFromLocalStorage();

function addItem() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const endDate = document.getElementById("endDate").value;
  const item = { title, description, endDate, status: "todo" };
  todoList.push(item);
  closeAddModal();
  saveListsToLocalStorage();
  renderLists();
}

function deleteItem(list, index) {
  list.splice(index, 1);
  saveListsToLocalStorage();
  renderLists();
}

function editItem(list, index) {
  const item = list[index];
  document.getElementById("editTitle").value = item.title;
  document.getElementById("editDescription").value = item.description;
  document.getElementById("editEndDate").value = item.endDate;

  const modal = document.getElementById("editModal");
  modal.classList.add("show");
  modal.style.display = "block";
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  window.editIndex = index;
}

function saveEditedItem() {
  const newTitle = document.getElementById("editTitle").value;
  const newDescription = document.getElementById("editDescription").value;
  const newEndDate = document.getElementById("editEndDate").value;
  todoList[window.editIndex].title = newTitle;
  todoList[window.editIndex].description = newDescription;
  todoList[window.editIndex].endDate = newEndDate;
  saveListsToLocalStorage();
  renderLists();

  const modal = document.getElementById("editModal");
  modal.classList.remove("show");
  modal.style.display = "none";
  modal.setAttribute("aria-modal", "false");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function completeItem(list, index) {
  list[index].status = "done";
  saveListsToLocalStorage();
  renderLists();
}

function moveItem(list, index) {
  list[index].status = "doing";
  saveListsToLocalStorage();
  renderLists();
}
function moveBack(list, index) {
  let stageIndex = stagesByIndex.indexOf(list[index].status);
  list[index].status = stagesByIndex[stageIndex - 1];
  saveListsToLocalStorage();
  renderLists();
}

function renderLists() {
  const todoListElement = document.getElementById("todoList");
  const doingListElement = document.getElementById("doingList");
  const doneListElement = document.getElementById("doneList");

  todoListElement.innerHTML = "";
  doingListElement.innerHTML = "";
  doneListElement.innerHTML = "";

  const todoItems = todoList.filter((item) => item.status === "todo");
  const doingItems = todoList.filter((item) => item.status === "doing");
  const doneItems = todoList.filter((item) => item.status === "done");

  todoItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
      <div class="task-details">
        <strong>${item.title}</strong>
        <p class="description">${item.description}</p>
        <p class="end-date">End Date: ${item.endDate}</p>
      </div>
      <div class="task-actions">
    <button onclick="deleteItem(todoList, ${index})" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
    <button onclick="editItem(todoList, ${index})" class="btn btn-warning"><i class="fas fa-edit"></i></button>
    <button onclick="moveItem(todoList, ${index})" class="btn btn-success"><i class="fas fa-arrow-right"></i></button>
</div>

    `;
    todoListElement.appendChild(li);
  });

  doingItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
      <div class="task-details">
        <strong>${item.title}</strong>
        <p class="description">${item.description}</p>
        <p class="end-date">End Date: ${item.endDate}</p>
      </div>
      <div class="task-actions">
    <button onclick="moveBack(todoList, ${index})" class="btn btn-danger"><i class="fas fa-arrow-left"></i></button>
    <button onclick="deleteItem(todoList, ${index})" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
    <button onclick="editItem(todoList, ${index})" class="btn btn-warning"><i class="fas fa-edit"></i></button>
    <button onclick="completeItem(todoList, ${index})" class="btn btn-success"><i class="fas fa-check"></i></button>
</div>
    `;
    doingListElement.appendChild(li);
  });

  doneItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
      <div class="task-details">
        <strong>${item.title}</strong>
        <p class="description">${item.description}</p>
        <p class="end-date">End Date: ${item.endDate}</p>
      </div>
      <div class="task-actions">
    <button onclick="moveBack(todoList, ${index})" class="btn btn-danger"><i class="fas fa-arrow-left"></i></button>
    <button onclick="deleteItem(todoList, ${index})" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
    <button onclick="editItem(todoList, ${index})" class="btn btn-warning"><i class="fas fa-edit"></i></button>
</div>

    `;
    doneListElement.appendChild(li);
  });
}
