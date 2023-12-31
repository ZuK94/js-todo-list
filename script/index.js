import task from "./task.js";
import list from "./list.js";
import helper from "./helper.js";

const body = document.body;

// Task array configuration
export let tasks = list.getTasks("tasks") || [];

// Todo page creation
createPage();
list.createList("tasks");

// Page elements creation

function createPage() {
  // Container
  const container = document.createElement("div");
  container.classList.add("container");

  const todoList = document.createElement("ul");
  todoList.classList.add("todo-list");

  // Form inputs
  const taskForm = document.createElement("div");
  taskForm.classList.add("form-div");

  const listDiv = document.createElement("div");
  listDiv.classList.add("list-div");
  listDiv.innerHTML += `<h3>My tasks</h3>`;

  const inputArea = document.createElement("form");
  inputArea.classList.add("input-area");

  const titleInput = document.createElement("input");
  helper.setAttributes(titleInput, {
    id: "title-input",
    placeholder: "title",
    class: "task-input",
  });

  const descriptionInput = document.createElement("input");
  helper.setAttributes(descriptionInput, {
    id: "description-input",
    placeholder: "description",
    class: "task-input",
  });

  // Form buttons
  const buttonArea = document.createElement("div");
  buttonArea.classList.add("btn-group-div");

  const addButton = document.createElement("button");
  addButton.classList.add("add-btn");
  addButton.onclick = () => {
    try {
      handleCreate("tasks", tasks, titleInput.value, descriptionInput.value);
      titleInput.value = "";
      descriptionInput.value = "";
    } catch (error) {
      error.message === "title must be provided"
        ? alert(error.message)
        : console.error(error);
    }
  };

  addButton.textContent = "add Task";

  const resetButton = document.createElement("button");
  resetButton.classList.add("reset-btn");
  resetButton.textContent = "delete all";
  resetButton.onclick = () => handleReset();

  buttonArea.append(addButton, resetButton);

  inputArea.append(titleInput, descriptionInput);
  listDiv.append(todoList);
  body.append(container);
  taskForm.append(inputArea, buttonArea);
  container.append(taskForm, listDiv);
}

// Handle reset
function handleReset() {
  list.resetList("tasks");
  tasks = [];
  list.createList("tasks");
}

// Handle create
function handleCreate(arrName, arr, title, description) {
  task.createNewTask(arr, title, description);
  list.createList(arrName);
}

export default tasks;
