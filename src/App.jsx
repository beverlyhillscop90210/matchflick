import React, { useEffect, useState, useCallback } from 'react';
import SwipeDeck from './SwipeDeck';
import './App.css';
import './MovieInfo.css';
import MovieInfo from './MovieInfo';
import { getPopularMoviesWithDetails } from './api/tmdb';

function App() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0); // ← extra Anzeige-Index

  useEffect(() => {
    getPopularMoviesWithDetails().then(setMovies);
  }, []);

  const handleSwipe = useCallback((direction, movie) => {
    console.log(`Swiped ${direction} on "${movie.title}"`);
    const nextIndex = index + 1;

    if (nextIndex >= movies.length - 2) {
      getPopularMoviesWithDetails().then((newMovies) => {
        setMovies((prev) => [...prev, ...newMovies]);
      });
    }

    setIndex(nextIndex);

    // 👇 Verzögere die Anzeige der neuen MovieInfo
    setTimeout(() => {
      setVisibleIndex(nextIndex);
    }, 200); // 200ms – kannst du noch feinjustieren
  }, [index, movies]);

  return (
    <div className="app-wrapper">
      <div className="app">
        {movies.length > 0 && (
          <>
            <SwipeDeck
              movies={movies}
              index={index}
              onSwipe={handleSwipe}
            />
            <MovieInfo movie={movies[visibleIndex]} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
