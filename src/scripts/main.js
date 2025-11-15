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
      id: item.id,
      title: item.title || item.name,
      year: item.release_date
        ? new Date(item.release_date).getFullYear()
        : item.first_air_date
        ? new Date(item.first_air_date).getFullYear()
        : "N/A",
      rating: item.vote_average ? item.vote_average.toFixed(1) : "N/A",
      poster_url: item.poster_path
        ? `${IMAGE_BASE_URL}/w400${item.poster_path}`
        : "https://placehold.co/400x600/0d1117/aaaaaa?text=Sem+Imagem",
    };
  });

  cleanedMovieList.forEach((item) => {
    const movieItem = document.createElement("li");

    const movieCard = document.createElement("article");
    movieCard.className = "movie-card";

    // Adiciona link para a página de detalhes
    movieCard.addEventListener("click", () => {
      window.location.href = `./pages/details.html?id=${item.id}&type=${currentType}`;
    });

    const filmImageElement = document.createElement("img");
    filmImageElement.src = item.poster_url;
    filmImageElement.alt = item.title;
    filmImageElement.onerror = (e) => {
      e.target.src = "https://placehold.co/400x600/0d1117/aaaaaa?text=Erro+Img";
    };

    // Overlay com informações (aparece no hover)
    const overlay = document.createElement("div");
    overlay.className = "movie-overlay";

    const overlayTitle = document.createElement("h3");
    overlayTitle.className = "overlay-title";
    overlayTitle.textContent = item.title;

    const overlayYear = document.createElement("p");
    overlayYear.className = "overlay-year";
    overlayYear.textContent = item.year;

    const overlayRating = document.createElement("div");
    overlayRating.className = "overlay-rating";
    overlayRating.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="star-icon">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
      <span>${item.rating}</span>
    `;

    overlay.appendChild(overlayTitle);
    overlay.appendChild(overlayYear);
    overlay.appendChild(overlayRating);

    movieCard.appendChild(filmImageElement);
    movieCard.appendChild(overlay);
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
