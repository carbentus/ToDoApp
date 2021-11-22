import { appElements } from './app-elements.js';
import { closeSearchInput } from './search-bar.js';
import { tabData, initList, showAll, renderList } from './main.js';

const { loupeBtnEl, tabActive, tabCompleted, tabAll, allTabs } = appElements;

//  Switch TABS  (All/Active/Completed)

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

const filterActive = () => {
  renderList(tabData.filter((item) => !item.isCompleted));
  initList();
};

const filterCompleted = () => {
  renderList(tabData.filter((item) => item.isCompleted));
  initList();
};

// export const showAll = () => {
//   renderList(tabData);
//   initList();
// };

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
