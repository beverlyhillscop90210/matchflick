const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};

export async function getPopularMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular`, { headers });
  const data = await res.json();
  return data.results.filter((m) => m.poster_path);
}

export async function getMovieDetails(movieId) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?append_to_response=credits`, {
    headers,
  });
  return await res.json();
}

export async function getPopularMoviesWithDetails() {
  const movies = await getPopularMovies();

  const detailedMovies = await Promise.all(
    movies.map(async (movie) => {
      try {
        const details = await getMovieDetails(movie.id);
        return { ...movie, ...details };
      } catch (err) {
        console.error(`❌ Fehler bei Movie ID ${movie.id}:`, err);
        return movie;
      }
    })
  );

  return detailedMovies;
}
