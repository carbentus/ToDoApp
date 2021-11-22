export const appElements = {
  // search bar
  loupeBtnEl: document.querySelector('.search__btn-loupe'),
  searchBackBtnEl: document.querySelector('.search__btn-back'),
  searchClearBtnEl: document.querySelector('.search__btn-clear'),
  searchInputEl: document.querySelector('.search__input'),

  // Tabs
  tabActive: document.getElementById('tab-active'),
  tabCompleted: document.getElementById('tab-completed'),
  tabAll: document.getElementById('tab-all'),
  allTabs: document.querySelectorAll('.nav-status__btn'),

  // Add Task
  backToListBtn: document.querySelector(
    '.new-task-container__btn-back-to-list'
  ),
  addTaskBtn: document.querySelector('.new-task-container__btn-confirm'),
  newTaskTextInput: document.querySelector('.new-task-container__textarea'),

  // Edit Task
  backToListSaveBtn: document.querySelector(
    '.edit-task-container__btn-back-to-list'
  ),
  saveTaskBtn: document.querySelector('.edit-task-container__btn-save'),
  closeEditTaskWindowBtn: document.querySelector(
    '.edit-task-container__btn-close-x'
  ),

  editTaskWindow: document.querySelector('.edit-task-container'),

  // Icons
  allTrashBin: document.querySelectorAll(
    'button.task-list__btn-edit-delete.trash'
  ),
  allPencil: document.querySelectorAll(
    'button.task-list__btn-edit-delete.pencil'
  ),

  // Modal
  modalOverlay: document.querySelector('.modal-overlay'),
  modalEmpty: document.querySelector('.modal-container-empty'),
  modalDelete: document.querySelector('.modal-container-delete'),

  modalBtnOk: document.querySelector('.modal-container-empty__btn-ok'),
  modalBtnDelete: document.querySelector('.modal-container-delete__btn-delete'),
  modalBtnCancel: document.querySelector('.modal-container-delete__btn-cancel'),
};
