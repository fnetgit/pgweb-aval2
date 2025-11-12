import { fetchMoviesByPage } from "./app.js";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const divFilmes = document.querySelector("#film-collection");
const btnPrevious = document.querySelector("#btn-previous");
const btnNext = document.querySelector("#btn-next");
const pageInfo = document.querySelector("#page-info");

let currentPage = 1;
let totalPages = 1;

function displayFilmImages(moviesList) {
  divFilmes.innerHTML = "";

  if (totalPages === 1 && moviesList.total_pages) {
    totalPages = moviesList.total_pages;
  }

  const cleanedMovieList = moviesList.results.map((movie) => {
    return {
      title: movie.title,
      poster_url: `${IMAGE_BASE_URL}/w400${movie.poster_path}`,
    };
  });

  cleanedMovieList.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    const filmImageElement = document.createElement("img");
    filmImageElement.src = movie.poster_url;
    filmImageElement.alt = movie.title;

    const movieTitle = document.createElement("h3");
    movieTitle.className = "movie-title";
    movieTitle.textContent = movie.title;

    movieCard.appendChild(filmImageElement);
    movieCard.appendChild(movieTitle);

    divFilmes.appendChild(movieCard);
  });

  updatePaginationControls();
}

function updatePaginationControls() {
  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

  btnPrevious.disabled = currentPage === 1;

  btnNext.disabled = currentPage >= totalPages;
}

btnPrevious.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchMoviesByPage(currentPage).then((movies) => {
      displayFilmImages(movies);
    });
  }
});

btnNext.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchMoviesByPage(currentPage).then((movies) => {
      displayFilmImages(movies);
    });
  }
});

fetchMoviesByPage(currentPage).then((movies) => {
  displayFilmImages(movies);
});
