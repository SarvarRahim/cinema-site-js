let TOTAL_PAGES = 10;
let CURRENT_PAGE = 1;
let NEIGHBOR_PAGELINKS_COUNT = 3;

function displayPagination() {
  for (let i = CURRENT_PAGE - NEIGHBOR_PAGELINKS_COUNT; i <= CURRENT_PAGE + NEIGHBOR_PAGELINKS_COUNT; i++) {
    if (i < 1) {
      continue;
    }

    if (i > TOTAL_PAGES) {
      break;
    }

    if (i === CURRENT_PAGE) {
      console.log(i + ' Active');
    }else {
      console.log(i);
    }
  }
}

function goToPage (pageNumber) {
  if (pageNumber < 1){
    pageNumber = 1;
  }
  if (pageNumber > 10) {
    pageNumber = TOTAL_PAGES;
  }

  CURRENT_PAGE = pageNumber;
  displayPagination();
}

function goToNextPage() {
  CURRENT_PAGE++;
  goToPage(CURRENT_PAGE);
}

function goToPrevievPage() {
  CURRENT_PAGE--;
  goToPage(CURRENT_PAGE);
}

function goToLastPage() {
  CURRENT_PAGE = TOTAL_PAGES;
  goToPage(CURRENT_PAGE)
}

function goToFirstPage() {
  CURRENT_PAGE = 1;
  goToPage(CURRENT_PAGE)
}

const elPagination = document.querySelector('.pagination');
const elPrevPageLink = document.querySelector('.js-prev-page-link');
const elNextPageLink = document.querySelector('.js-next-page-link');

displayPagination(CURRENT_PAGE);