import { filterTasksAccStatus } from './main.js';

export const loupeBtnEl = document.querySelector('.search__btn-loupe');
const searchBackBtnEl = document.querySelector('.search__btn-back');
const searchClearBtnEl = document.querySelector('.search__btn-clear');
const searchInputEl = document.querySelector('.search__input');

// SEARCH INPUT
const clearSearchInput = () => {
  searchInputEl.value = '';
  filterTasksAccStatus();
};

const showSearchInput = () => {
  searchInputEl.classList.add('search__input--active');
  loupeBtnEl.classList.add('search__btn-loupe--inactive');
  searchBackBtnEl.classList.add('search__btn-back--active');
  searchClearBtnEl.classList.add('search__btn-clear--active');
  searchInputEl.focus();
};

const closeSearchInput = () => {
  searchInputEl.classList.remove('search__input--active');
  loupeBtnEl.classList.remove('search__btn-loupe--inactive');
  searchBackBtnEl.classList.remove('search__btn-back--active');
  searchClearBtnEl.classList.remove('search__btn-clear--active');
  clearSearchInput();
};

// Listeners

loupeBtnEl.addEventListener('click', showSearchInput);
searchBackBtnEl.addEventListener('click', closeSearchInput);
searchClearBtnEl.addEventListener('click', clearSearchInput);
