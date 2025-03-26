const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function getPopularMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/popular?page=${page}&language=de-DE`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      accept: 'application/json',
    },
  });

  if (!res.ok) throw new Error('TMDB fetch failed');
  const data = await res.json();
  return data.results;
}

