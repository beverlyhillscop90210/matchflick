// src/api.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchPopularMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch movies');
  const data = await res.json();
  return data.results;
}

