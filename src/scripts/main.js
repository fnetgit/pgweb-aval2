import {
  fetchMoviesByPage,
  fetchSeriesByPage,
  fetchMixedContent,
  searchContent,
  fetchGenres,
} from "./app.js";
import { initMobileMenu, initScrollButton, updateCopyrightYear } from "./ui.js";
import { setupClearStateLinks } from "./utils.js";

const $ = (selector) => document.querySelector(selector);
const IMG_URL = "https://image.tmdb.org/t/p";

const elements = {
  collection: $("#film-collection"),
  btnPrev: $("#btn-previous"),
  btnNext: $("#btn-next"),
  pageInfo: $("#page-info"),
  loading: $("#loading-spinner"),
  searchInput: $("#header-search"),
  searchBtn: $(".header-search-btn"),
  typeFilter: $("#type-filter"),
  genreFilter: $("#genre-filter"),
};

let currentPage = 1;
let totalPages = 1;
let currentType = "mixed";
let currentGenre = "all";
let searchQuery = "";

function saveState() {
  const state = {
    page: currentPage,
    type: currentType,
    genre: currentGenre,
    search: searchQuery,
  };
  localStorage.setItem("catalogState", JSON.stringify(state));
}

function restoreState() {
  const savedState = localStorage.getItem("catalogState");
  if (savedState) {
    try {
      const state = JSON.parse(savedState);
      currentPage = state.page || 1;
      currentType = state.type || "mixed";
      currentGenre = state.genre || "all";
      searchQuery = state.search || "";

      elements.typeFilter.value = currentType;
      elements.searchInput.value = searchQuery;

      return true;
    } catch (e) {
      console.error("Failed to restore state:", e);
    }
  }
  return false;
}

function updatePagination() {
  elements.pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
  elements.btnPrev.disabled = currentPage <= 1;
  elements.btnNext.disabled = currentPage >= totalPages;
}

const createMovieCard = (item) => {
  const type = item.media_type || currentType;
  const typeLabel = type === "series" ? "Série" : "Filme";
  const title = item.title || item.name;
  const year = (item.release_date || item.first_air_date)?.slice(0, 4) || "N/A";
  const rating = item.vote_average?.toFixed(1) || "N/A";
  const posterUrl = item.poster_path
    ? `${IMG_URL}/w400${item.poster_path}`
    : "https://placehold.co/400x600/0d1117/aaaaaa?text=Sem+Imagem";

  return `
    <li>
      <article class="movie-card" data-id="${item.id}" data-type="${type}">
        <img src="${posterUrl}" alt="${title}" onerror="this.src='https://placehold.co/400x600/0d1117/aaaaaa?text=Erro+Img'">
        <div class="movie-overlay">
          <span class="overlay-type">${typeLabel}</span>
          <h3 class="overlay-title">${title}</h3>
          <p class="overlay-year">${year}</p>
          <div class="overlay-rating">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="star-icon">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>${rating}</span>
          </div>
        </div>
      </article>
    </li>
  `;
};

function displayContent(data) {
  elements.loading.style.display = "none";

  if (!data.results?.length) {
    elements.collection.innerHTML =
      '<p class="error-message">Nenhum resultado encontrado. Tente outra busca!</p>';
    totalPages = 1;
    updatePagination();
    return;
  }

  totalPages = data.total_pages;
  elements.collection.innerHTML = data.results.map(createMovieCard).join("");
  updatePagination();
  attachCardClickHandlers();
}

function attachCardClickHandlers() {
  document.querySelectorAll(".movie-card").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      const type = card.dataset.type;
      saveState();
      location.href = `./src/pages/details.html?id=${id}&type=${type}`;
    });
  });
}

function showError(message) {
  elements.loading.style.display = "none";
  elements.collection.innerHTML = `<p class="error-message">Oops! Algo deu errado. (${message})</p>`;
}

async function loadContent(page = 1) {
  elements.loading.style.display = "block";
  elements.collection.innerHTML = "";
  elements.pageInfo.textContent = "Carregando...";
  currentPage = page;

  try {
    let data;
    if (searchQuery.trim()) {
      data = await searchContent(searchQuery, currentType, page);
    } else if (currentType === "mixed") {
      data = await fetchMixedContent(page, currentGenre);
    } else if (currentType === "series") {
      data = await fetchSeriesByPage(page, currentGenre);
    } else {
      data = await fetchMoviesByPage(page, currentGenre);
    }
    displayContent(data);
  } catch (error) {
    showError(error.message);
  }
}

async function loadGenres(type) {
  const genres = await fetchGenres(type);
  elements.genreFilter.innerHTML =
    '<option value="all">Todos os gêneros</option>' +
    genres
      .map((genre) => `<option value="${genre.id}">${genre.name}</option>`)
      .join("");
}

const resetFilters = () => {
  currentPage = 1;
  currentGenre = "all";
  elements.genreFilter.value = "all";
};

function handleSearch() {
  const query = elements.searchInput.value.trim();
  if (query) {
    searchQuery = query;
    resetFilters();
    saveState();
    loadContent(1);
  }
}

elements.typeFilter.addEventListener("change", async (e) => {
  currentType = e.target.value;
  searchQuery = "";
  elements.searchInput.value = "";
  resetFilters();
  await loadGenres(currentType);
  saveState();
  loadContent(1);
});

elements.genreFilter.addEventListener("change", (e) => {
  currentGenre = e.target.value;
  currentPage = 1;
  searchQuery = "";
  elements.searchInput.value = "";
  saveState();
  loadContent(1);
});

elements.searchBtn.addEventListener("click", handleSearch);

elements.searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSearch();
  }
});

elements.searchInput.addEventListener("input", (e) => {
  if (!e.target.value.trim() && searchQuery) {
    searchQuery = "";
    currentPage = 1;
    loadContent(1);
  }
});

const handlePageChange = (newPage) => {
  loadContent(newPage);
  saveState();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

elements.btnPrev.addEventListener("click", () => {
  if (currentPage > 1) handlePageChange(currentPage - 1);
});

elements.btnNext.addEventListener("click", () => {
  if (currentPage < totalPages) handlePageChange(currentPage + 1);
});

setupClearStateLinks();
initMobileMenu();
initScrollButton();
updateCopyrightYear();

async function init() {
  const hasRestoredState = restoreState();
  await loadGenres(currentType);

  if (hasRestoredState) {
    const genreExists = Array.from(elements.genreFilter.options).some(
      (option) => option.value === currentGenre
    );

    if (genreExists) {
      elements.genreFilter.value = currentGenre;
    } else {
      currentGenre = "all";
      elements.genreFilter.value = "all";
    }

    loadContent(currentPage);
  } else {
    currentGenre = "all";
    elements.genreFilter.value = "all";
    loadContent(1);
  }
}

init();
