import { fetchContentDetails } from "./app.js";
import { initMobileMenu, updateCopyrightYear } from "./ui.js";

const $ = (sel) => document.querySelector(sel);
const IMG_URL = "https://image.tmdb.org/t/p";
const urlParams = new URLSearchParams(window.location.search);
const contentId = urlParams.get("id");
const contentType = urlParams.get("type") || "movie";

const elements = {
  loading: $("#loading-spinner"),
  content: $("#details-content"),
  error: $("#error-message"),
  backdrop: $("#backdrop-img"),
  poster: $("#poster-img"),
  title: $("#title"),
  date: $("#release-date"),
  runtime: $("#runtime"),
  ratingPath: $("#rating-path"),
  ratingText: $("#rating-text"),
  genres: $("#genres"),
  overview: $("#overview"),
};

const toggle = (show, hide) => {
  show.style.display = "block";
  hide.style.display = "none";
};

const formatRuntime = (min) => {
  if (!min) return "N/A";
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
};

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

const updateRating = (rating) => {
  const { ratingPath, ratingText } = elements;
  if (!rating) {
    ratingText.textContent = "N/A";
    ratingText.style.fill = "#aaa";
    ratingPath.setAttribute("stroke-dasharray", "0, 100");
    ratingPath.style.stroke = "#333";
    return;
  }

  const pct = Math.round(rating * 10);
  const color = pct >= 70 ? "#21d07a" : pct >= 40 ? "#d2d531" : "#db2360";

  ratingPath.style.stroke = color;
  ratingPath.setAttribute("stroke-dasharray", `${pct}, 100`);
  ratingText.textContent = rating.toFixed(1);
  ratingText.style.fill = color;
};

const setImage = (img, path, name, placeholder) => {
  img.src = path
    ? `${IMG_URL}/${placeholder}${path}`
    : `https://placehold.co/${placeholder}/0d1117/aaaaaa?text=Sem+Imagem`;
  img.alt = name;
};

const displayDetails = (data) => {
  const name = data.title || data.name;

  setImage(elements.backdrop, data.backdrop_path, name, "original");
  setImage(elements.poster, data.poster_path, name, "w500");

  elements.title.textContent = name;
  document.title = `${name}`;
  elements.date.textContent = formatDate(
    data.release_date || data.first_air_date
  );

  if (contentType === "movie") {
    elements.runtime.textContent = formatRuntime(data.runtime);
  } else {
    const s = data.number_of_seasons || 0;
    const e = data.number_of_episodes || 0;
    elements.runtime.textContent = `${s} temporada${
      s !== 1 ? "s" : ""
    } • ${e} episódio${e !== 1 ? "s" : ""}`;
  }

  updateRating(data.vote_average);

  elements.genres.innerHTML =
    data.genres
      ?.map((g) => `<span class="genre-tag">${g.name}</span>`)
      .join("") || "";

  elements.overview.textContent = data.overview || "Sinopse não disponível.";

  toggle(elements.content, elements.loading);
};

if (!contentId) {
  toggle(elements.error, elements.loading);
} else {
  fetchContentDetails(contentId, contentType)
    .then(displayDetails)
    .catch(() => toggle(elements.error, elements.loading));
}

initMobileMenu();
updateCopyrightYear();
