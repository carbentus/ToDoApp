import { addHighlight } from './search-bar.js';
import { appElements } from './app-elements.js';
import { showAll, filterTasksAccStatus } from './tabs-filter.js';
const { loupeBtnEl, tabActive, tabCompleted, tabAll } = appElements;

export let tabData = JSON.parse(
  document.querySelector('#data-source').innerHTML
);

const MAX_TAB_HEIGHT = 132; // 3x line height, wrap overflowing text

const state = {
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

  // ----- DELETE TASK on Swipe
  const allTrashBin = document.querySelectorAll(
    'button.task-list__btn-edit-delete.trash'
  );
  allTrashBin.forEach((trashBin) => {
    trashBin.addEventListener('click', showModalDelete);
  });

  // ----- EDIT TASK on Swipe
  const allPencil = document.querySelectorAll(
    'button.task-list__btn-edit-delete.pencil'
  );
  allPencil.forEach((pencil) => {
    pencil.addEventListener('click', handlePencilClick);
  });
};
//  *** initList END

// ----- Switch TABS  (All/Active/Completed)
const allTabs = document.querySelectorAll('.nav-status__btn');
const allTabsArray = [...allTabs];

allTabsArray.forEach((tab) => {
  tab.addEventListener('click', (ev) => {
    const currentItem = ev.currentTarget;

    allTabsArray.forEach((tab) => {
      tab.classList.remove('nav-status__btn--active');
    });
    currentItem.classList.add('nav-status__btn--active');
  });
});

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

// *** DELETE TASK on swipe - Start
const renderTaskAfterDelete = (currentItemId) => {
  tabData.splice(currentItemId, 1);
  for (let i = 0; i < tabData.length; i++) {
    tabData[i].id = i + 1;
  }
  showAll();
  // return tabData;
};

const deleteTask = (ev) => {
  hideModalDelete();
  const currentItemId = state.currentTaskId;
  renderTaskAfterDelete(currentItemId);
  state.currentTaskId = '';
};
// *** DELETE TASK on swipe - End

// Modal
const modalOverlay = document.querySelector('.modal-overlay');
const modalEmpty = document.querySelector('.modal-container-empty');
const modalDelete = document.querySelector('.modal-container-delete');

const modalBtnOk = document.querySelector('.modal-container-empty__btn-ok');
const modalBtnDelete = document.querySelector(
  '.modal-container-delete__btn-delete'
);
const modalBtnCancel = document.querySelector(
  '.modal-container-delete__btn-cancel'
);

const showModalEmpty = () => {
  removeSwipe();
  modalOverlay.classList.add('modal-overlay--active');
  modalEmpty.classList.add('modal-container-empty--active');
};

const hideModalEmpty = () => {
  modalOverlay.classList.remove('modal-overlay--active');
  modalEmpty.classList.remove('modal-container-empty--active');
};

modalBtnOk.addEventListener('click', hideModalEmpty);

const showModalDelete = (ev) => {
  const id = getTaskId(ev);
  removeSwipe();
  modalOverlay.classList.add('modal-overlay--active');
  modalDelete.classList.add('modal-container-delete--active');
};

const hideModalDelete = () => {
  modalOverlay.classList.remove('modal-overlay--active');
  // modalDelete.classList.remove('modal-container-empty--active');
  modalDelete.classList.remove('modal-container-delete--active');
};
modalBtnDelete.addEventListener('click', deleteTask);
modalBtnCancel.addEventListener('click', hideModalDelete);

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

// Add Task - close window
const closeNewTaskWindow = () => {
  const taskContent = document.querySelector('.new-task-container__textarea');
  taskContent.value = '';
  newTaskWindow.classList.add('new-task-container-hide');
  document.body.style.overflow = 'visible';
};

// --- ADD NEW TASK   -
const backToListBtn = document.querySelector(
  '.new-task-container__btn-back-to-list'
);
const addTaskBtn = document.querySelector('.new-task-container__btn-confirm');
const newTaskTextInput = document.querySelector(
  '.new-task-container__textarea'
);
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
addTaskBtn.addEventListener('click', addItem);
backToListBtn.addEventListener('click', closeNewTaskWindow);
//  end ADD TASK

// REMOVE SWIPE
const removeSwipe = () => {
  const allSwipedTasks = document.querySelectorAll('li div.active-swipe');
  allSwipedTasks.forEach((swipedTask) => {
    swipedTask.classList.remove('active-swipe');
  });
};

// *** EDIT TASK ON SWIPE - Start

const backToListSaveBtn = document.querySelector(
  '.edit-task-container__btn-back-to-list'
);
const saveTaskBtn = document.querySelector('.edit-task-container__btn-save');
const closeEditTaskWindowBtn = document.querySelector(
  '.edit-task-container__btn-close-x'
);

const getTaskId = (ev) => {
  const currentTask = ev.currentTarget;
  const taskId = currentTask.parentNode.getAttribute('data-id') - 1;
  state.currentTaskId = taskId;
  return taskId;
};

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

const handlePencilClick = (ev) => {
  const id = getTaskId(ev);
  showEditedTask(id);
};

const editTaskWindow = document.querySelector('.edit-task-container');
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

// Listeners
saveTaskBtn.addEventListener('click', saveEditedTask);
backToListSaveBtn.addEventListener('click', closeEditTaskWindow);
// closeEditTaskWindowBtn.addEventListener('click', closeEditTaskWindow);

// On start
showAll();

// Handle READ MORE on resize
window.addEventListener('resize', filterTasksAccStatus);
