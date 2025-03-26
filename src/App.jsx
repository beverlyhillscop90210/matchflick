// src/App.jsx
import React, { useEffect, useState, useCallback } from 'react';
import SwipeDeck from './SwipeDeck';
import './App.css';
import { getPopularMovies } from './api/tmdb';

function App() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);

  // Initial load
  useEffect(() => {
    getPopularMovies().then(setMovies);
  }, []);

  // 🔄 Swipe handler mit Lazy-Loading
  const handleSwipe = useCallback((direction, movie) => {
    console.log(`Swiped ${direction} on "${movie.title}"`);
    const nextIndex = index + 1;

    // Wenn fast am Ende: neue Filme laden
    if (nextIndex >= movies.length - 2) {
      getPopularMovies().then((newMovies) => {
        setMovies((prev) => [...prev, ...newMovies]);
      });
    }

    setIndex(nextIndex);
  }, [index, movies]);

  return (
    <div className="app">
      {movies.length > 0 && (
        <SwipeDeck
          movies={movies}
          index={index}
          onSwipe={handleSwipe}
        />
      )}
    </div>
  );
}

export default App;

