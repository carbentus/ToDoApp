import { appElements } from './app-elements.js';
import { closeSearchInput } from './search-bar.js';
import { tabData, initList, renderList } from './main.js';

const { loupeBtnEl, tabActive, tabCompleted, tabAll } = appElements;

const filterActive = () => {
  renderList(tabData.filter((item) => !item.isCompleted));
  initList();
};

const filterCompleted = () => {
  renderList(tabData.filter((item) => item.isCompleted));
  initList();
};

export const showAll = () => {
  renderList(tabData);
  initList();
};

export const filterTasksAccStatus = () => {
  if (tabActive.classList.contains('nav-status__btn--active')) {
    filterActive();
  } else if (tabCompleted.classList.contains('nav-status__btn--active')) {
    filterCompleted();
  } else {
    showAll();
  }
};

tabActive.addEventListener('click', function () {
  if (loupeBtnEl.classList.contains('search__btn-loupe--inactive')) {
    closeSearchInput();
  } else {
    filterActive();
  }
});

tabCompleted.addEventListener('click', function () {
  if (loupeBtnEl.classList.contains('search__btn-loupe--inactive')) {
    closeSearchInput();
  } else {
    filterCompleted();
  }
});

tabAll.addEventListener('click', function () {
  if (loupeBtnEl.classList.contains('search__btn-loupe--inactive')) {
    closeSearchInput();
  } else {
    showAll();
  }
});
