export class TaskObject {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
  getTask = () => {
    return { id: this.id, title: this.title, description: this.description };
  };
}

export function createNewTask(arr, title, description) {
  if (!title) {
    throw new Error("title must be provided");
  } else {
    let newId = "task" + (arr.length + 1);
    const newTask = new TaskObject(newId, title, description);
    arr.push(newTask.getTask());
    localStorage.setItem("tasks", JSON.stringify(arr));
  }
}

export function updateId(arr) {
  arr.forEach((task) => {
    task.id = "task" + (arr.indexOf(task) + 1);
  });
}

const task = { TaskObject, createNewTask, updateId };

export default task;
