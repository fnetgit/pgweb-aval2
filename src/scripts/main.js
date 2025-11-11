import { fetchMoviesByPage } from "./app.js";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const divFilmes = document.querySelector("#film-collection");

function displayFilmImages(moviesList) {
  const cleanedMovieList = moviesList.results.map((movie) => {
    return {
      title: movie.title,
      poster_url: `${IMAGE_BASE_URL}/w400${movie.poster_path}`,
    };
  });

  cleanedMovieList.forEach((movie) => {
    const filmImageElement = document.createElement("img");

    filmImageElement.src = movie.poster_url;

    divFilmes.appendChild(filmImageElement);
  });
}

let currentPage = 1;

const loadMoreButton = document.querySelector("#btn-load-more");

loadMoreButton.addEventListener("click", () => {
  currentPage++;

  fetchMoviesByPage(currentPage).then((movies) => {
    displayFilmImages(movies);
  });
});

fetchMoviesByPage(currentPage).then((movies) => {
  displayFilmImages(movies);
});
