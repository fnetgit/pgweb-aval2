import { fetchContentDetails } from "./app.js";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const show = (node) => (node.style.display = "block");
const hide = (node) => (node.style.display = "none");

const urlParams = new URLSearchParams(window.location.search);
const contentId = urlParams.get("id");
const contentType = urlParams.get("type") || "movie";

const loadingSpinner = $("#loading-spinner");
const detailsContent = $("#details-content");
const errorMessage = $("#error-message");

const backdropImg = $("#backdrop-img");
const posterImg = $("#poster-img");
const titleElement = $("#title");
const releaseDate = $("#release-date");
const runtime = $("#runtime");
const ratingPath = $("#rating-path");
const ratingText = $("#rating-text");
const genresContainer = $("#genres");
const overview = $("#overview");

function formatRuntime(minutes) {
  if (!minutes) return "N/A";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
}

function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function updateRating(rating) {
  if (!rating || rating === 0) {
    ratingText.textContent = "N/A";
    ratingText.style.fill = "#aaa";
    ratingPath.setAttribute("stroke-dasharray", "0, 100");
    ratingPath.style.stroke = "#333";
    return;
  }

  const percentage = Math.round(rating * 10);
  const displayRating = rating.toFixed(1);

  let color;
  if (percentage >= 70) {
    color = "#21d07a";
  } else if (percentage >= 40) {
    color = "#d2d531";
  } else {
    color = "#db2360";
  }

  ratingPath.style.stroke = color;
  ratingPath.setAttribute("stroke-dasharray", `${percentage}, 100`);
  ratingText.textContent = displayRating;
  ratingText.style.fill = color;
}

function displayDetails(data) {
  if (data.backdrop_path) {
    backdropImg.src = `${IMAGE_BASE_URL}/original${data.backdrop_path}`;
    backdropImg.alt = data.title || data.name;
  } else {
    backdropImg.src =
      "https://placehold.co/1920x1080/0d1117/aaaaaa?text=Sem+Backdrop";
  }

  if (data.poster_path) {
    posterImg.src = `${IMAGE_BASE_URL}/w500${data.poster_path}`;
    posterImg.alt = data.title || data.name;
  } else {
    posterImg.src =
      "https://placehold.co/500x750/0d1117/aaaaaa?text=Sem+Poster";
  }

  titleElement.textContent = data.title || data.name;
  document.title = `${data.title || data.name} - Catalog`;

  const date = data.release_date || data.first_air_date;
  releaseDate.textContent = formatDate(date);

  if (contentType === "movie") {
    runtime.textContent = formatRuntime(data.runtime);
  } else {
    const seasons = data.number_of_seasons || 0;
    const episodes = data.number_of_episodes || 0;
    runtime.textContent = `${seasons} temporada${
      seasons !== 1 ? "s" : ""
    } • ${episodes} episódio${episodes !== 1 ? "s" : ""}`;
  }

  updateRating(data.vote_average);

  genresContainer.innerHTML = "";
  if (data.genres && data.genres.length > 0) {
    data.genres.forEach((genre) => {
      const genreTag = document.createElement("span");
      genreTag.className = "genre-tag";
      genreTag.textContent = genre.name;
      genresContainer.appendChild(genreTag);
    });
  }

  overview.textContent = data.overview || "Sinopse não disponível.";

  hide(loadingSpinner);
  show(detailsContent);
}

function displayError() {
  hide(loadingSpinner);
  show(errorMessage);
}

async function init() {
  if (!contentId) {
    displayError();
    return;
  }

  try {
    const data = await fetchContentDetails(contentId, contentType);
    displayDetails(data);
  } catch (error) {
    displayError();
  }
}

init();
