var elMovies = document.querySelector('.movies');
// var elMovieMoreButton = document.querySelector('.btn__more');
var elMovieItemTemplete = document.querySelector('#movies-templete').content;
var elMovieFragment = document.createDocumentFragment();


movies.splice(0,10).forEach(function(i, index){
  var elMovieItem = elMovieItemTemplete.cloneNode(true);

  elMovieItem.querySelector('.movie-img').src = `http://i3.ytimg.com/vi/${i.ytid}/maxresdefault.jpg`;
  elMovieItem.querySelector('.movie__name').textContent = i.Title;
  elMovieItem.querySelector('.movie__reting').textContent = i.imdb_rating;
  elMovieItem.querySelector('.movie__year').textContent = i.movie_year;
  elMovieItem.querySelector('.movie__date').textContent = `${Math.floor(i.runtime / 60)} h ${Math.floor(i.runtime % 60)} min`;
  elMovieItem.querySelector('.movie-genre').textContent = i.Categories.split('|').join(', ');
  elMovieItem.querySelector('.btn__more').dataset.index = index;

  elMovieFragment.appendChild(elMovieItem);
});

elMovies.appendChild(elMovieFragment);

var elMovielink = document.querySelectorAll('.btn__more');
var elMovieModal = document.querySelector('#exampleModal');

elMovielink.forEach(function (btn) {
  btn.addEventListener('click', () => {
    var movie = movies[Number(btn.dataset.index)];
    elMovieModal.querySelector('.movie__name').textContent = movie.Title;
    elMovieModal.querySelector('.movie__reting').textContent = movie.imdb_rating;
    elMovieModal.querySelector('.movie__year').textContent = movie.movie_year;
    elMovieModal.querySelector('.movie__date').textContent = Math.floor(Number(movie.runtime / 60)) + 'hr' + ' ' + (movie.runtime % 60) + 'min';
    elMovieModal.querySelector('.movie-genre').textContent = movie.Categories.split('|').join(', ');
    elMovieModal.querySelector('.movie__trailer').src = `https://www.youtube.com/embed/${movie.ytid}`;
    elMovieModal.querySelector('.movie__summary').textContent = movie.summary;
    elMovieModal.querySelector('.movie__imdb-link').href = `https://www.imdb.com/title/${movie.imdb_id}`;
  })
})

