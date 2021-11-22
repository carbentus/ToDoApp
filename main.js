import { addHighlight } from './search-bar.js';
import { addListenerPencils } from './edit-task.js';
import { addListenerTrashBins } from './delete-task.js';
import { removeSwipe } from './helpers.js';
import { shortenLongTask } from './read-more-less.js';

export let tabData = JSON.parse(
  document.querySelector('#data-source').innerHTML
);

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

  // Add Listeners to tasks elements

  const allCheckBox = document.querySelectorAll('input.task-list__checkbox');
  allCheckBox.forEach((checkBox) => {
    checkBox.addEventListener('click', closeTheTask);
  });

  addListenerPencils();
  addListenerTrashBins();
};
//  *** initList END

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

    // // ---- Task SWIPE  START
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

export const showAll = () => {
  renderList(tabData);
  initList();
};

// On start
showAll();
