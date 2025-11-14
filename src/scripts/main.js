import {
  fetchMoviesByPage,
  fetchSeriesByPage,
  searchContent,
  fetchGenres,
} from "./app.js";
import { initMobileMenu } from "./ui.js";


const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const filmCollection = document.querySelector("#film-collection");
const btnPrevious = document.querySelector("#btn-previous");
const btnNext = document.querySelector("#btn-next");
const pageInfo = document.querySelector("#page-info");
const loadingSpinner = document.querySelector("#loading-spinner");

const headerSearchInput = document.querySelector("#header-search");
const headerSearchBtn = document.querySelector(".header-search-btn");

const typeFilter = document.querySelector("#type-filter");
const genreFilter = document.querySelector("#genre-filter");

let currentPage = 1;
let totalPages = 1;
let currentType = "movie";
let currentGenre = "all";
let currentSearchQuery = "";

function displayFilmImages(moviesList) {
  filmCollection.innerHTML = "";
  loadingSpinner.style.display = "none";

  if (!moviesList.results || moviesList.results.length === 0) {
    const noResults = document.createElement("p");
    noResults.className = "error-message";
    noResults.textContent = "Nenhum resultado encontrado. Tente outra busca!";
    filmCollection.appendChild(noResults);
    totalPages = 1;
    updatePaginationControls();
    return;
  }

  totalPages = moviesList.total_pages;

  const cleanedMovieList = moviesList.results.map((item) => {
    return {
      title: item.title || item.name,
      poster_url: item.poster_path
        ? `${IMAGE_BASE_URL}/w400${item.poster_path}`
        : "https://placehold.co/400x600/0d1117/aaaaaa?text=Sem+Imagem",
    };
  });

  cleanedMovieList.forEach((item) => {
    const movieItem = document.createElement("li");

    const movieCard = document.createElement("article");
    movieCard.className = "movie-card";

    const filmImageElement = document.createElement("img");
    filmImageElement.src = item.poster_url;
    filmImageElement.alt = item.title;
    filmImageElement.onerror = (e) => {
      e.target.src = "https://placehold.co/400x600/0d1117/aaaaaa?text=Erro+Img";
    };

    const movieTitle = document.createElement("h3");
    movieTitle.className = "movie-title";
    movieTitle.textContent = item.title;

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

async function loadContent(page = 1) {
  loadingSpinner.style.display = "block";
  filmCollection.innerHTML = "";
  pageInfo.textContent = "Carregando...";
  currentPage = page;

  try {
    let results;

    if (currentSearchQuery.trim()) {
      results = await searchContent(currentSearchQuery, currentType, page);
    } else {
      if (currentType === "series") {
        results = await fetchSeriesByPage(page, currentGenre);
      } else {
        results = await fetchMoviesByPage(page, currentGenre);
      }
    }

    displayFilmImages(results);
  } catch (error) {
    console.error("Falha ao buscar conteúdo:", error);
    displayError(error.message);
  }
}

async function loadGenres(type) {
  const genres = await fetchGenres(type);

  genreFilter.innerHTML = '<option value="all">Todos os gêneros</option>';

  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.name;
    genreFilter.appendChild(option);
  });

  currentGenre = "all";
}

typeFilter.addEventListener("change", async (e) => {
  currentType = e.target.value;
  currentPage = 1;
  currentSearchQuery = "";
  headerSearchInput.value = "";
  await loadGenres(currentType);
  loadContent(1);
});

genreFilter.addEventListener("change", (e) => {
  currentGenre = e.target.value;
  currentPage = 1;
  currentSearchQuery = "";
  headerSearchInput.value = "";
  loadContent(1);
});

headerSearchBtn.addEventListener("click", () => {
  const query = headerSearchInput.value.trim();
  if (query) {
    currentSearchQuery = query;
    currentPage = 1;
    currentGenre = "all";
    genreFilter.value = "all";
    loadContent(1);
  }
});

headerSearchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const query = headerSearchInput.value.trim();
    if (query) {
      currentSearchQuery = query;
      currentPage = 1;
      currentGenre = "all";
      genreFilter.value = "all";
      loadContent(1);
    }
  }
});

headerSearchInput.addEventListener("input", (e) => {
  if (e.target.value.trim() === "" && currentSearchQuery) {
    currentSearchQuery = "";
    currentPage = 1;
    loadContent(1);
  }
});

btnPrevious.addEventListener("click", () => {
  if (currentPage > 1) {
    loadContent(currentPage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

btnNext.addEventListener("click", () => {
  if (currentPage < totalPages) {
    loadContent(currentPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

(async function init() {
  initMobileMenu();
  await loadGenres(currentType);
  loadContent(1);
})();
