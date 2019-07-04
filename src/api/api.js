import axios from 'axios';

const API_KEY = 'da9d1724bddad79397131d5a8b35b7e2';
const API_BASE = 'https://api.themoviedb.org/3';

export async function fetchMovies(page = 1) {
  const response = await axios({
      method: "get",
      url: `${API_BASE}/movie/popular?api_key=${API_KEY}&page=${page}`
  });
  return response.data.results;
}

export async function fetchGenres() {
  const response = await axios({
      method: "get",
      url: `${API_BASE}/genre/movie/list?api_key=${API_KEY}`
  });
  return response.data.genres;
}

export async function fetchMovie(id) {
  const response = await axios({
      method: "get",
      url: `${API_BASE}/movie/${id}?api_key=${API_KEY}`
  });
  return response.data;
}

export async function fetchMovieCredits(id) {
  const response = await axios({
      method: "get",
      url: `${API_BASE}/movie/${id}/credits?api_key=${API_KEY}`
  });
  return response.data;
}