import { filterTasksAccStatus } from './tabs-filter.js';

const MAX_TAB_HEIGHT = 132; // 3x line height, wrap overflowing text

const resizeTaskContent = function (ev) {
  const clickedBtn = ev.currentTarget;
  const contentToExpand = clickedBtn.previousElementSibling;
  if (
    contentToExpand.classList.contains('task-list__task-description--shorten')
  ) {
    clickedBtn.innerText = 'read less...';
    contentToExpand.classList.remove('task-list__task-description--shorten');
  } else {
    clickedBtn.innerText = 'read more...';
    contentToExpand.classList.add('task-list__task-description--shorten');
  }
};

export const shortenLongTask = (task) => {
  const itemHeight = task.clientHeight;

  if (itemHeight > MAX_TAB_HEIGHT) {
    const taskParagraph = task.lastElementChild;
    taskParagraph.classList.add('task-list__task-description--shorten');
    const btnReadMore = document.createElement('button');
    task.classList.add('task-list__task--long');
    task.appendChild(btnReadMore);
    btnReadMore.classList.add('task-list__btn-read-more');
    btnReadMore.innerText = 'read more...';
    btnReadMore.addEventListener('click', resizeTaskContent);
  }
};

// Handle READ MORE on resize
window.addEventListener('resize', filterTasksAccStatus);
