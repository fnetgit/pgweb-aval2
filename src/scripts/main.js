import { fetchMoviesByPage } from "./app.js";
import { fetchSeriesByPage } from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("nav-open");
      const isExpanded = mainNav.classList.contains("nav-open");
      navToggle.setAttribute("aria-expanded", isExpanded);
      navToggle.setAttribute(
        "aria-label",
        isExpanded ? "Fechar menu" : "Abrir menu"
      );
    });
  }
});

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const filmCollection = document.querySelector("#film-collection");
const btnPrevious = document.querySelector("#btn-previous");
const btnNext = document.querySelector("#btn-next");
const pageInfo = document.querySelector("#page-info");
const loadingSpinner = document.querySelector("#loading-spinner");

let currentPage = 1;
let totalPages = 1;

function displayFilmImages(moviesList) {
  filmCollection.innerHTML = "";
  loadingSpinner.style.display = "none";

  if (totalPages === 1 && moviesList.total_pages) {
    totalPages = moviesList.total_pages;
  }

  const cleanedMovieList = moviesList.results.map((movie) => {
    return {
      title: movie.title,
      poster_url: movie.poster_path
        ? `${IMAGE_BASE_URL}/w400${movie.poster_path}`
        : "https_placehold.co/400x600/0d1117/aaaaaa?text=Sem+Imagem",
    };
  });

  cleanedMovieList.forEach((movie) => {
    const movieItem = document.createElement("li");

    const movieCard = document.createElement("article");
    movieCard.className = "movie-card";

    const filmImageElement = document.createElement("img");
    filmImageElement.src = movie.poster_url;
    filmImageElement.alt = movie.title;
    filmImageElement.onerror = (e) => {
      e.target.src = "https_placehold.co/400x600/0d1117/aaaaaa?text=Erro+Img";
    };

    const movieTitle = document.createElement("h3");
    movieTitle.className = "movie-title";
    movieTitle.textContent = movie.title;

    movieCard.appendChild(filmImageElement);
    movieCard.appendChild(movieTitle);
    movieItem.appendChild(movieCard);

    filmCollection.appendChild(movieItem);
  });

  updatePaginationControls();
}

function displayError(message) {
  loadingSpinner.style.display = "none";
  filmCollection.innerHTML = "";

  const errorElement = document.createElement("p");
  errorElement.className = "error-message";
  errorElement.textContent = `Oops! Algo deu errado. (${message})`;
  filmCollection.appendChild(errorElement);
}

function updatePaginationControls() {
  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
  btnPrevious.disabled = currentPage === 1;
  btnNext.disabled = currentPage >= totalPages;
}

async function loadMovies(page) {
  loadingSpinner.style.display = "block";
  filmCollection.innerHTML = "";
  pageInfo.textContent = "Carregando...";

  try {
    const movies = await fetchMoviesByPage(page);
    displayFilmImages(movies);
  } catch (error) {
    console.error("Falha ao buscar filmes:", error);
    displayError(error.message);
  }
}

btnPrevious.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadMovies(currentPage);
  }
});

btnNext.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    loadMovies(currentPage);
  }
});

loadMovies(currentPage);
