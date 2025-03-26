// src/App.jsx
import React, { useEffect, useState } from 'react';
import SwipeDeck from './SwipeDeck';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch('https://api.themoviedb.org/3/movie/popular', {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  const handleSwipe = (direction, movie) => {
    console.log(`Swiped ${direction} on "${movie.title}"`);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="app">
      {movies.length > 0 && (
        <SwipeDeck
          movies={movies.slice(currentIndex)}
          onSwipe={handleSwipe}
        />
      )}
    </div>
  );
}

export default App;

