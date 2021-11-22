import { appElements } from './app-elements.js';
import { getTaskId, removeSwipe } from './helpers.js';

const { modalOverlay, modalEmpty, modalDelete, modalBtnOk } = appElements;

export const showModalEmpty = () => {
  removeSwipe();
  modalOverlay.classList.add('modal-overlay--active');
  modalEmpty.classList.add('modal-container-empty--active');
};

export const hideModalEmpty = () => {
  modalOverlay.classList.remove('modal-overlay--active');
  modalEmpty.classList.remove('modal-container-empty--active');
};

modalBtnOk.addEventListener('click', hideModalEmpty);

export const showModalDelete = (ev) => {
  const id = getTaskId(ev);
  removeSwipe();
  modalOverlay.classList.add('modal-overlay--active');
  modalDelete.classList.add('modal-container-delete--active');
};

export const hideModalDelete = () => {
  modalOverlay.classList.remove('modal-overlay--active');
  // modalDelete.classList.remove('modal-container-empty--active');
  modalDelete.classList.remove('modal-container-delete--active');
};
