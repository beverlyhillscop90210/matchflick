// src/App.jsx
import React from 'react';
import SwipeDeck from './SwipeDeck';
import './App.css';

function App() {
  const movies = [
    {
      id: 1,
      title: 'Inception',
      poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    },
    {
      id: 2,
      title: 'Interstellar',
      poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    },
    {
      id: 3,
      title: 'The Dark Knight',
      poster_path: '/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg',
    },
  ];

  const handleSwipe = (direction, movie) => {
    console.log(`Swiped ${direction} on "${movie.title}"`);
  };

  return (
    <div className="app">
      <SwipeDeck movies={movies} onSwipe={handleSwipe} />
    </div>
  );
}

export default App;

