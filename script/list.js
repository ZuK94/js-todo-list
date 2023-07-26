import { updateId } from "./task.js";
import helper from "./helper.js";
import { tasks as taskArr } from "./index.js";
import { popUp } from "./popUp.js";

// Get task list from local storage
function getTasks(arrName) {
  return JSON.parse(localStorage.getItem(arrName));
}

// Delete task list
function resetList(arrName) {
  localStorage.removeItem(arrName);

  createList(arrName);
  return arrName;
}

// Set new updated array data to local storage
function updateArr(arrName, arr) {
  localStorage.setItem(arrName, JSON.stringify(arr));
}

// Refresh list so there are no duplicates
function refreshList(list) {
  let child = list.firstElementChild;
  while (child) {
    list.removeChild(child);
    child = list.firstElementChild;
  }
}

// Create list items for task list
function createList(arrName) {
  const ul = document.querySelector(".todo-list");

  refreshList(ul);
  checkForTasks(taskArr);
  let tasks = getTasks(arrName);
  // Create list item for each task from array
  tasks?.forEach((task) => {
    // Create li element
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.setAttribute("id", task.id);

    // Create task info div
    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");

    // Create task num and expand icon
    const taskBullet = document.createElement("div");
    taskBullet.classList.add("task-bullet");

    const taskNum = document.createElement("span");
    taskNum.innerText = tasks.indexOf(task) + 1 + ".";

    const showDescriptionBtn = document.createElement("button");
    showDescriptionBtn.classList.add("task-btn");

    const btnIcon = document.createElement("i");
    helper.setAttributes(btnIcon, {
      class: "fa-regular fa-eye-slash",
      style: "color: #00000;",
    });

    showDescriptionBtn.addEventListener("click", () => {
      taskInfo.classList.contains("hidden")
        ? (taskInfo.classList.remove("hidden"),
          btnIcon.classList.replace("fa-eye", "fa-eye-slash"))
        : (taskInfo.classList.add("hidden"),
          btnIcon.classList.replace("fa-eye-slash", "fa-eye"));
    });

    showDescriptionBtn.appendChild(btnIcon);

    taskBullet.append(taskNum, task.description && showDescriptionBtn);

    // Create title
    const header = document.createElement("h3");
    const title = document.createTextNode(task.title);
    header.appendChild(title);

    // Create description
    const description = document.createElement("p");
    const descText = document.createTextNode(task.description);
    description.appendChild(descText);

    // Create delete button
    const btnGroupDiv = document.createElement("div");
    btnGroupDiv.classList.add("btn-group-div");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("task-btn");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can" style="color: #ff0000;"></i>`;
    deleteBtn.onclick = () => {
      deleteTask(arrName, taskArr, task);
    };

    const editBtn = document.createElement("button");
    editBtn.classList.add("task-btn");
    editBtn.innerHTML = `<i class="fa-solid fa-pen" ></i>`;
    editBtn.onclick = () => {
      updateTask("tasks", taskArr, task);
    };

    btnGroupDiv.append(editBtn, deleteBtn);

    // Append children to li element
    taskInfo.append(header, description);
    taskItem.append(taskBullet, taskInfo, btnGroupDiv);

    // Append li to list
    ul.appendChild(taskItem);
  });
}

// Delete selected task
function deleteTask(arrName, arr, task) {
  arr.splice(arr.indexOf(arr.find((t) => t.id === task.id)), 1);
  updateId(arr);
  updateArr(arrName, arr);
  createList(arrName);
}

// Update task
function updateTask(arrName, arr, task) {
  popUp({ arrName, arr, task });
}

// Check if there are tasks in array
function checkForTasks(arr) {
  const listDiv = document.querySelector(".list-div");
  arr?.length
    ? listDiv.classList.contains("hidden") && listDiv.classList.remove("hidden")
    : !listDiv.classList.contains("hidden") && listDiv.classList.add("hidden");
}

const list = { getTasks, createList, resetList, updateArr };
export default list;
