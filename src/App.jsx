// src/App.jsx
import React, { useEffect, useState, useCallback } from 'react';
import SwipeDeck from './SwipeDeck';
import './App.css';
import './MovieInfo.css';
import MovieInfo from './MovieInfo';
import { getPopularMovies } from './api/tmdb';

function App() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getPopularMovies().then(setMovies);
  }, []);

  const handleSwipe = useCallback((direction, movie) => {
    console.log(`Swiped ${direction} on "${movie.title}"`);
    const nextIndex = index + 1;

    if (nextIndex >= movies.length - 2) {
      getPopularMovies().then((newMovies) => {
        setMovies((prev) => [...prev, ...newMovies]);
      });
    }

    setIndex(nextIndex);
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
            <MovieInfo movie={movies[index]} />
          </>
        )}
      </div>
    </div>
  );
}


export default App;
