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

export const handleGestureX = (touchstartX, touchendX) => {
  if (touchendX - touchstartX > 60) {
    taskEditDelete.classList.remove('active-swipe');
    taskTextContent.classList.remove('active-swipe');
  }
  if (touchendX - touchstartX < -60) {
    removeSwipe();
    taskEditDelete.classList.add('active-swipe');
    taskTextContent.classList.add('active-swipe');
  }
};
