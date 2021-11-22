import { state } from './main.js';

export const getTaskId = (ev) => {
  const currentTask = ev.currentTarget;
  const taskId = currentTask.parentNode.getAttribute('data-id') - 1;
  state.currentTaskId = taskId;
  return taskId;
};

export const removeSwipe = () => {
  const allSwipedTasks = document.querySelectorAll('li div.active-swipe');
  allSwipedTasks.forEach((swipedTask) => {
    swipedTask.classList.remove('active-swipe');
  });
};
