// src/api/tmdb.js
export async function getPopularMovies() {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data.results.filter((m) => m.poster_path); // nur mit Bild
}

