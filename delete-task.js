import { appElements } from './app-elements.js';
import { showModalDelete, hideModalDelete } from './modal.js';
import { showAll } from './tabs-filter.js';
import { state, tabData } from './main.js';

const { modalBtnDelete, modalBtnCancel } = appElements;

export const getTaskId = (ev) => {
  console.log('get task');
  const currentTask = ev.currentTarget;
  const taskId = currentTask.parentNode.getAttribute('data-id') - 1;
  state.currentTaskId = taskId;
  return taskId;
};

const renderTaskAfterDelete = (currentItemId) => {
  tabData.splice(currentItemId, 1);
  for (let i = 0; i < tabData.length; i++) {
    tabData[i].id = i + 1;
  }
  showAll();
  // return tabData;
};

export const deleteTask = (ev) => {
  hideModalDelete();
  const currentItemId = state.currentTaskId;
  renderTaskAfterDelete(currentItemId);
  state.currentTaskId = '';
};

export const addListenerTrashBins = () => {
  const allTrashBin = document.querySelectorAll(
    'button.task-list__btn-edit-delete.trash'
  );
  allTrashBin.forEach((trashBin) => {
    trashBin.addEventListener('click', showModalDelete);
  });
};

modalBtnDelete.addEventListener('click', deleteTask);
modalBtnCancel.addEventListener('click', hideModalDelete);
