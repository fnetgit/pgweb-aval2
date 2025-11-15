const API_KEY = "061ef10fb0dbfe0515d15b2e76255380";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchFromAPI(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(
        `Erro da API: ${response.statusText} (Status: ${response.status})`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Falha no fetch:", error);
    throw new Error(error.message || "Não foi possível conectar à API.");
  }
}

export async function fetchMoviesByPage(currentPage, genre = "") {
  const genreParam = genre && genre !== "all" ? `&with_genres=${genre}` : "";
  const endpoint = `/discover/movie?primary_release_year=2025&api_key=${API_KEY}&page=${currentPage}&language=pt-BR${genreParam}`;
  return fetchFromAPI(endpoint);
}

export async function fetchSeriesByPage(currentPage, genre = "") {
  const genreParam = genre && genre !== "all" ? `&with_genres=${genre}` : "";
  const endpoint = `/discover/tv?first_air_date_year=2025&api_key=${API_KEY}&page=${currentPage}&language=pt-BR${genreParam}`;
  return fetchFromAPI(endpoint);
}

export async function fetchMixedContent(currentPage, genre = "") {
  const [movies, series] = await Promise.all([
    fetchMoviesByPage(currentPage, genre),
    fetchSeriesByPage(currentPage, genre),
  ]);

  const moviesLimited = movies.results
    .slice(0, 10)
    .map((item) => ({ ...item, media_type: "movie" }));
  const seriesLimited = series.results
    .slice(0, 10)
    .map((item) => ({ ...item, media_type: "series" }));

  const combined = [...moviesLimited, ...seriesLimited].sort(
    () => Math.random() - 0.5
  );

  return {
    results: combined,
    page: currentPage,
    total_pages: Math.max(movies.total_pages, series.total_pages),
  };
}

export async function searchContent(query, type = "movie", page = 1) {
  if (type === "mixed") {
    const [movies, series] = await Promise.all([
      fetchFromAPI(
        `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&page=${page}&language=pt-BR`
      ),
      fetchFromAPI(
        `/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&page=${page}&language=pt-BR`
      ),
    ]);

    const combined = [
      ...movies.results.map((item) => ({ ...item, media_type: "movie" })),
      ...series.results.map((item) => ({ ...item, media_type: "series" })),
    ].sort(() => Math.random() - 0.5);

    return {
      results: combined,
      page: page,
      total_pages: Math.max(movies.total_pages, series.total_pages),
    };
  }

  const endpoint = type === "series" ? "/search/tv" : "/search/movie";
  return fetchFromAPI(
    `${endpoint}?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}&language=pt-BR`
  );
}

export async function fetchGenres(type = "movie") {
  if (type === "mixed") {
    const [movieGenres, seriesGenres] = await Promise.all([
      fetchFromAPI(`/genre/movie/list?api_key=${API_KEY}&language=pt-BR`),
      fetchFromAPI(`/genre/tv/list?api_key=${API_KEY}&language=pt-BR`),
    ]);

    const movieGenreIds = new Set(movieGenres.genres.map((g) => g.id));
    const commonGenres = seriesGenres.genres.filter((g) =>
      movieGenreIds.has(g.id)
    );

    return commonGenres;
  }

  const endpoint = type === "series" ? "/genre/tv/list" : "/genre/movie/list";
  const data = await fetchFromAPI(
    `${endpoint}?api_key=${API_KEY}&language=pt-BR`
  );
  return data.genres || [];
}

export async function fetchContentDetails(id, type = "movie") {
  const endpoint = type === "series" ? `tv/${id}` : `movie/${id}`;
  return fetchFromAPI(`/${endpoint}?api_key=${API_KEY}&language=pt-BR`);
}
