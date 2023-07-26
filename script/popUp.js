import helper from "./helper.js";
import list from "./list.js";

export const popUp = (params) => {
  // Params destructure
  const { arr, arrName, task } = params;
  const popUp = document.createElement("div");
  // popUp.classList.add("pop-up");
  helper.setAttributes(popUp, { class: "container pop-up" });

  const popUpContainer = document.createElement("div");
  popUpContainer.classList.add("pop-up-container");

  const inputArea = document.createElement("form");
  helper.setAttributes(inputArea, { class: "input-area pop" });

  const titleInput = document.createElement("input");
  helper.setAttributes(titleInput, {
    value: task.title,
    id: "title-update-input",
    placeholder: "title",
    class: "task-input",
  });

  const descriptionInput = document.createElement("input");
  helper.setAttributes(descriptionInput, {
    value: task.description,
    id: "description-update-input",
    placeholder: "description",
    class: "task-input",
  });

  inputArea.append(titleInput, descriptionInput);

  const btnArea = document.createElement("div");
  btnArea.classList.add("btn-area");
  const closeBtn = document.createElement("button");
  const submitBtn = document.createElement("button");

  closeBtn.innerText = "close";
  submitBtn.innerText = "update";

  // Submit update
  submitBtn.onclick = () => {
    try {
      const newArr = updateTask();
      list.updateArr(arrName, newArr);
      handleClose();
      list.createList(arrName);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Close pop-up
  closeBtn.onclick = () => {
    handleClose();
  };

  // Update task fn
  function updateTask() {
    if (!titleInput.value) {
      throw new Error("title must be provided");
    } else {
      const taskIndex = arr.indexOf(arr.find((t) => t.id === task.id));
      arr[taskIndex].title = titleInput.value;
      arr[taskIndex].description = descriptionInput.value;
      return arr;
    }
  }

  // Handle close fn
  function handleClose() {
    popUp.remove();
  }

  btnArea.append(submitBtn, closeBtn);
  popUpContainer.append(inputArea, btnArea);

  popUp.appendChild(popUpContainer);
  document.body.append(popUp);
};
