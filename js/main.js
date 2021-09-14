const genres = [];

const elMovieSearchForm = document.querySelector('.js-movie-search-form');
const elMovieSearchInput = elMovieSearchForm.querySelector('.js-movie-search-input');
const elMovieSearchYear = document.querySelector('.js-do-year');
const elMovieSearchYearEnd = document.querySelector('.js-end-year');
const elGenresSelect = elMovieSearchForm.querySelector('select');
const elMoviesList = document.querySelector('.movies__list');

const elMoviesItemTemplate = document.querySelector('#movies-item-template').content;


// MODAL
const elMovieInfoModal = document.querySelector('.movie-info-modal');
const elMovieInfoModalTitle = elMovieInfoModal.querySelector('.movie-info-modal__title');
const elMovieInfoModalRating = elMovieInfoModal.querySelector('.movie-info-modal__rating');
const elMovieInfoModalYear = elMovieInfoModal.querySelector('.movie-info-modal__year');
const elMovieInfoModalDuration = elMovieInfoModal.querySelector('.movie-info-modal__duration');
const elMovieInfoModalIFrame = elMovieInfoModal.querySelector('.movie-info-modal__iframe');
const elMovieInfoModalCategories = elMovieInfoModal.querySelector('.movie-info-modal__categories');
const elMovieInfoModalSummary = elMovieInfoModal.querySelector('.movie-info-modal__summary');
const elMovieInfoModalImdbLink = elMovieInfoModal.querySelector('.movie-info-modal__imdb-link');


function getUniqueGenres () {
  movies.forEach(movie => {
    movie.categories.forEach(category => {
      if (!genres.includes(category)) {
        genres.push(category);
      }
    });
  });
  genres.sort();
}

function showGenreOptions() {
  const elGenresFragment = document.createDocumentFragment();
  genres.forEach(genre => {
    const elGenreOption = document.createElement('option');
    elGenreOption.textContent = genre;
    elGenreOption.value = genre;
    elGenresFragment.appendChild(elGenreOption);
  });
  elGenresSelect.appendChild(elGenresFragment);
}

function getHoursStringFromMinutes (minutes) {
  return `${Math.floor(minutes / 60)} hrs ${minutes % 60} mins`;
}

function showMovies (movies) {
  elMoviesList.innerHTML = '';
  const elMoviesFragment = document.createDocumentFragment();

  for (let movie of movies) {
    const elNewMoviesItem = elMoviesItemTemplate.cloneNode(true);
    elNewMoviesItem.querySelector('.movie__img').src = movie.youtubePoster;
    elNewMoviesItem.querySelector('.movie__img').alt = `${movie.title} poster`;
    elNewMoviesItem.querySelector('.movie__title').textContent = movie.title;
    elNewMoviesItem.querySelector('.movie__rating').textContent = movie.imdbRating;
    elNewMoviesItem.querySelector('.movie__year').textContent = movie.year;
    elNewMoviesItem.querySelector('.movie__duration').textContent = getHoursStringFromMinutes(movie.runtime);
    elNewMoviesItem.querySelector('.movie__categories').textContent = movie.categories.join(', ');
    elNewMoviesItem.querySelector('.js-more-info-button').dataset.imdbId = movie.imdbId;

    elMoviesFragment.appendChild(elNewMoviesItem);
  }

  elMoviesList.appendChild(elMoviesFragment);
}

function updateMovieInfoModal (imdbId) {
  const movie = movies.find(movie => movie.imdbId === imdbId);

  elMovieInfoModalTitle.textContent = movie.title;
  elMovieInfoModalRating.textContent = movie.imdbRating;
  elMovieInfoModalYear.textContent = movie.year;
  elMovieInfoModalDuration.textContent = getHoursStringFromMinutes(movie.runtime);
  elMovieInfoModalIFrame.src = `https://www.youtube-nocookie.com/embed/${movie.youtubeId}`;
  elMovieInfoModalCategories.textContent = movie.categories.join(', ');
  elMovieInfoModalSummary.textContent = movie.summary;
  elMovieInfoModalImdbLink.href = `https://www.imdb.com/title/${movie.imdbId}`;
}

elMoviesList.addEventListener('click', evt => {
  if (evt.target.matches('.js-more-info-button')) {
    updateMovieInfoModal(evt.target.dataset.imdbId);
  }
});

elMovieInfoModal.addEventListener('hidden.bs.modal', () => {
  elMovieInfoModalIFrame.src = '';
});

function findMovies (titleRegex,yearDo,yearEnd) {
     let resultYearDo = String(yearDo).split('/')
     let resultYearEnd = String(yearEnd).split('/')
     if(resultYearDo[1] === '(?:)' && resultYearEnd[1] === '(?:)'){
        let result =  movies.filter(movie => movie.title.match(titleRegex) &&
        (elGenresSelect.value === 'All' || movie.categories.includes(elGenresSelect.value)))
        return result
     }
      let result =  movies.filter(movie => movie.title.match(titleRegex) &&
      (elGenresSelect.value === 'All' || movie.categories.includes(elGenresSelect.value)))
      let answer = result.filter(val => (+resultYearDo[1] ? val.year >= +resultYearDo[1] : val.year <= +resultYearEnd[1] ) && (+resultYearEnd[1] ? val.year <= +resultYearEnd[1] : val.year >= +resultYearDo[1] ))
      return answer.sort((a,b) => a.year - b.year)
}



function onMovieSearchFormSubmit (evt) {
  evt.preventDefault();

  const titleRegex = new RegExp(elMovieSearchInput.value, 'gi');
  const yearDo = new RegExp(elMovieSearchYear.value, 'gi');
  const yearEnd = new RegExp(elMovieSearchYearEnd.value, 'gi');
  const foundMovies = findMovies(titleRegex,yearDo,yearEnd);

  if (foundMovies.length > 0) {
    showMovies(foundMovies);
  } else {
    elMoviesList.innerHTML = '<div class="col-12">No film found</div>';
  }
}

if (elMovieSearchForm) {
  elMovieSearchForm.addEventListener('submit', onMovieSearchFormSubmit);
}

getUniqueGenres();
showGenreOptions();
showMovies(movies.slice(0, 50));

// Janr
// Yil ...dan ...gacha
// Reyting ...dan baland
