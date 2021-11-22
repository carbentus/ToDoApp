import { appElements } from './app-elements.js';
import { tabData, state } from './main.js';
import { removeSwipe, getTaskId } from './helpers.js';
import { filterTasksAccStatus } from './tabs-filter.js';
import { showModalEmpty } from './modal.js';

const { saveTaskBtn, backToListSaveBtn, editTaskWindow } = appElements;

const openEditTaskWindow = () => {
  removeSwipe();
  editTaskWindow.classList.remove('edit-task-container-hide');
  document.body.style.overflow = 'hidden';
};

const closeEditTaskWindow = () => {
  removeSwipe();
  editTaskWindow.classList.add('edit-task-container-hide');
  document.body.style.overflow = 'visible';
};

const showEditedTask = (taskId) => {
  const editTaskTextInput = document.querySelector(
    '.edit-task-container__textarea'
  );

  openEditTaskWindow();
  const taskTextBeforeChange = tabData[taskId].text;
  editTaskTextInput.value = taskTextBeforeChange;
};

export const handlePencilClick = (ev) => {
  const id = getTaskId(ev);
  showEditedTask(id);
};

// handlePencilClick();

export const addListenerPencils = () => {
  const allPencil = document.querySelectorAll(
    'button.task-list__btn-edit-delete.pencil'
  );

  allPencil.forEach((pencil) => {
    pencil.addEventListener('click', handlePencilClick);
  });
};

const saveEditedTask = () => {
  const editTaskTextInput = document.querySelector(
    '.edit-task-container__textarea'
  );
  let taskId = state.currentTaskId;
  const taskTextAfterChange = editTaskTextInput.value;
  if (taskTextAfterChange) {
    tabData[taskId].text = taskTextAfterChange;
    filterTasksAccStatus();
    closeEditTaskWindow();
  } else {
    showModalEmpty();
  }
};

saveTaskBtn.addEventListener('click', saveEditedTask);
backToListSaveBtn.addEventListener('click', closeEditTaskWindow);
