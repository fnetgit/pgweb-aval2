import {
  fetchMoviesByPage,
  fetchSeriesByPage,
  fetchMixedContent,
  searchContent,
  fetchGenres,
} from "./app.js";
import { initMobileMenu, initScrollButton, updateCopyrightYear } from "./ui.js";

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

function updatePagination() {
  elements.pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
  elements.btnPrev.disabled = currentPage === 1;
  elements.btnNext.disabled = currentPage >= totalPages;
}

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
  elements.collection.innerHTML = data.results
    .map((item) => {
      const type = item.media_type || currentType;
      const typeLabel = type === "series" ? "Série" : "Filme";
      return `
    <li>
      <article class="movie-card" onclick="location.href='./src/pages/details.html?id=${
        item.id
      }&type=${type}'">
        <img src="${
          item.poster_path
            ? `${IMG_URL}/w400${item.poster_path}`
            : "https://placehold.co/400x600/0d1117/aaaaaa?text=Sem+Imagem"
        }" 
             alt="${item.title || item.name}"
             onerror="this.src='https://placehold.co/400x600/0d1117/aaaaaa?text=Erro+Img'">
        <div class="movie-overlay">
          <span class="overlay-type">${typeLabel}</span>
          <h3 class="overlay-title">${item.title || item.name}</h3>
          <p class="overlay-year">${
            (item.release_date || item.first_air_date)?.slice(0, 4) || "N/A"
          }</p>
          <div class="overlay-rating">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="star-icon">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>${item.vote_average?.toFixed(1) || "N/A"}</span>
          </div>
        </div>
      </article>
    </li>
  `;
    })
    .join("");
  updatePagination();
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
  currentGenre = "all";
}

function handleSearch() {
  const query = elements.searchInput.value.trim();
  if (query) {
    searchQuery = query;
    currentPage = 1;
    currentGenre = "all";
    elements.genreFilter.value = "all";
    loadContent(1);
  }
}

elements.typeFilter.addEventListener("change", async (e) => {
  currentType = e.target.value;
  currentPage = 1;
  searchQuery = "";
  elements.searchInput.value = "";
  await loadGenres(currentType);
  loadContent(1);
});

elements.genreFilter.addEventListener("change", (e) => {
  currentGenre = e.target.value;
  currentPage = 1;
  searchQuery = "";
  elements.searchInput.value = "";
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

elements.btnPrev.addEventListener("click", () => {
  if (currentPage > 1) {
    loadContent(currentPage - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

elements.btnNext.addEventListener("click", () => {
  if (currentPage < totalPages) {
    loadContent(currentPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

initMobileMenu();
initScrollButton();
updateCopyrightYear();
loadGenres(currentType).then(() => loadContent(1));
