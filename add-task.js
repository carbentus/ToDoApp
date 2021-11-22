import { appElements } from './app-elements.js';
import { tabData, showAll } from './main.js';
import { removeSwipe } from './helpers.js';
import { showModalEmpty } from './modal.js';

const { addTaskBtn, backToListBtn, loupeBtnEl, newTaskTextInput } = appElements;

// --- start  ADD TASK - show window
const showNewTaskWindow = () => {
  removeSwipe();
  newTaskWindow.classList.remove('new-task-container-hide');
  document.body.style.overflow = 'hidden';
  if (loupeBtnEl.classList.contains('search__btn-loupe--inactive')) {
    closeSearchInput();
  } else return;
};
const newTaskWindow = document.querySelector('.new-task-container');
const plusBtn = document.querySelector('.footer__btn-add-task');
plusBtn.addEventListener('click', showNewTaskWindow);

// Close "add task" window
const closeNewTaskWindow = () => {
  const taskContent = document.querySelector('.new-task-container__textarea');
  taskContent.value = '';
  newTaskWindow.classList.add('new-task-container-hide');
  document.body.style.overflow = 'visible';
};

// --- ADD NEW TASK   -
const addItem = () => {
  const newTaskText = newTaskTextInput.value;
  if (newTaskText) {
    const id = tabData.length + 1;
    tabData.push({
      id,
      isCompleted: false,
      text: newTaskText,
    });
    newTaskTextInput.value = '';
    closeNewTaskWindow();
    showAll();
  } else {
    showModalEmpty();
  }
};

// Listener
addTaskBtn.addEventListener('click', addItem);
backToListBtn.addEventListener('click', closeNewTaskWindow);
