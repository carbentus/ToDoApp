import { appElements } from './app-elements.js';
import { addHighlight } from './search-bar.js';
import { addListenerTrashBins } from './delete-task.js';
import { addListenerPencils } from './edit-task.js';
import { showAll, filterTasksAccStatus } from './tabs-filter.js';
import { removeSwipe } from './helpers.js';

export let tabData = JSON.parse(
  document.querySelector('#data-source').innerHTML
);

const MAX_TAB_HEIGHT = 132; // 3x line height, wrap overflowing text

// const { editTaskWindow } = appElements;

export const state = {
  currentTaskId: '',
};

export const initList = () => {
  const renderClosedTasks = (currentItem, currentItemId) => {
    tabData = tabData.map((item) => {
      if (item.id.toString() === currentItemId) {
        return {
          ...item,
          isCompleted: currentItem.checked,
        };
      }
      return item;
    });
  };
  const closeTheTask = (ev) => {
    const currentItem = ev.currentTarget;
    currentItem.parentNode.parentNode.classList.toggle('task-list__task-done');
    const currentItemId = currentItem.getAttribute('data-id');
    renderClosedTasks(currentItem, currentItemId);
  };

  const allCheckBox = document.querySelectorAll('input.task-list__checkbox');
  allCheckBox.forEach((checkBox) => {
    checkBox.addEventListener('click', closeTheTask);
  });

  addListenerPencils();
  addListenerTrashBins();
};
//  *** initList END

//READ MORE / READ LESS
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

const shortenLongTask = (task) => {
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

export const renderList = (items, searchText = '') => {
  const listContainer = document.querySelector('#list-container');
  listContainer.innerHTML = '';

  items.forEach((item) => {
    const newChild = document.createElement('li');
    newChild.classList.add('task-list__task');

    const taskEditDelete = document.createElement('div');
    taskEditDelete.classList.add('task-list__task-edit-delete');
    taskEditDelete.setAttribute('data-id', item.id);
    taskEditDelete.innerHTML = `
    <button class="task-list__btn-edit-delete pencil"><i class="fa fa-pencil" aria-hidden="true"></i></button>
    <button class="task-list__btn-edit-delete trash">
    <i class="fa fa-trash-o" aria-hidden="true"></i></button>`;

    if (item.isCompleted) {
      newChild.classList.add('task-list__task-done');
    }

    // ---- Task SWIPE  START
    let touchstartX = 0;
    let touchendX = 0;
    function handleGestureX() {
      if (touchendX - touchstartX > 60) {
        taskEditDelete.classList.remove('active-swipe');
        taskTextContent.classList.remove('active-swipe');
      }
      if (touchendX - touchstartX < -60) {
        removeSwipe();
        taskEditDelete.classList.add('active-swipe');
        taskTextContent.classList.add('active-swipe');
      }
    }

    newChild.addEventListener('touchstart', (ev) => {
      touchstartX = ev.changedTouches[0].screenX;
    });

    newChild.addEventListener('touchend', (ev) => {
      touchendX = ev.changedTouches[0].screenX;
      handleGestureX();
    });
    // ---- Task swipe END

    // highlight
    let itemText = item.text;
    if (searchText) {
      itemText = addHighlight(itemText, searchText);
    }
    newChild.innerHTML = `
    <div class="task-list__text-container">
			<input type="checkbox" class="task-list__checkbox" id="task_checkbox${
        item.id
      }"${item.isCompleted ? ' checked' : ''} data-id="${item.id}"/>
			<label for="task_checkbox${
        item.id
      }"><i class="fa fa-check" aria-hidden="true"></i></label>
			<p class="task-list__task-description">${itemText}</p>
    </div>
		`;

    const taskTextContent = newChild.firstElementChild;
    listContainer.appendChild(newChild);
    shortenLongTask(taskTextContent);
    newChild.appendChild(taskEditDelete);
  });
};

// Handle READ MORE on resize
window.addEventListener('resize', filterTasksAccStatus);
