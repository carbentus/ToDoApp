import { tabData, renderList } from './main.js';
import { filterTasksAccStatus } from './tabs-filter.js';
import { appElements } from './app-elements.js';

const {
  loupeBtnEl,
  searchBackBtnEl,
  searchClearBtnEl,
  searchInputEl,
  tabActive,
  tabCompleted,
} = appElements;

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

export const closeSearchInput = () => {
  searchInputEl.classList.remove('search__input--active');
  loupeBtnEl.classList.remove('search__btn-loupe--inactive');
  searchBackBtnEl.classList.remove('search__btn-back--active');
  searchClearBtnEl.classList.remove('search__btn-clear--active');
  clearSearchInput();
};

export const addHighlight = (text, searchText) => {
  let re = new RegExp(`(${searchText})`, 'ig');
  return text.replace(re, `<mark>$1</mark>`);
};

const filterSearchTask = (ev) => {
  const searchText = ev.target.value.toLowerCase();
  if (tabActive.classList.contains('nav-status__btn--active')) {
    renderList(
      tabData.filter(
        (item) =>
          item.text.toLowerCase().includes(searchText) && !item.isCompleted
      ),
      searchText
    );
  } else if (tabCompleted.classList.contains('nav-status__btn--active')) {
    renderList(
      tabData.filter(
        (item) =>
          item.text.toLowerCase().includes(searchText) && item.isCompleted
      ),
      searchText
    );
  } else {
    renderList(
      tabData.filter((item) => item.text.toLowerCase().includes(searchText)),
      searchText
    );
  }
};

// Listeners
loupeBtnEl.addEventListener('click', showSearchInput);
searchBackBtnEl.addEventListener('click', closeSearchInput);
searchClearBtnEl.addEventListener('click', clearSearchInput);
searchInputEl.addEventListener('input', filterSearchTask);
