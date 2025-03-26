import { useRef, useEffect, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';
import { getPopularMovies } from './api/tmdb'; // oder dein custom fetch

function SwipeDeck({ onSwipe }) {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const cardRef = useRef(null);

  // 🌀 1. Filme beim Mount laden
  useEffect(() => {
    getPopularMovies().then(setMovies);
  }, []);

  // 🎯 2. Swipe logik
  const handleSwipe = useCallback(
    (direction, movie) => {
      onSwipe?.(direction, movie);
      const nextIndex = index + 1;

      // Wenn fast am Ende: Neue Filme nachladen
      if (nextIndex >= movies.length - 2) {
        getPopularMovies().then((newMovies) => {
          setMovies((prev) => [...prev, ...newMovies]);
        });
      }

      setIndex(nextIndex);
    },
    [index, movies, onSwipe]
  );

  // ⌨️ 3. Tastatursteuerung
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!cardRef.current) return;
      if (e.key === 'ArrowLeft') cardRef.current.triggerSwipe('left');
      if (e.key === 'ArrowRight') cardRef.current.triggerSwipe('right');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index]);

  const currentMovie = movies[index];
  const nextMovie = movies[index + 1];

  return (
    <div
      style={{
        width: '320px',
        height: '480px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* 🧊 Nächste Karte im Hintergrund (leicht sichtbar) */}
      {nextMovie && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.25,
            filter: 'blur(1px)',
            transform: 'scale(0.95)',
            zIndex: 0,
          }}
        >
          <SwipeCard movie={nextMovie} disabled />
        </div>
      )}

      {/* 🔥 Aktuelle Karte mit Interaktion */}
      <AnimatePresence mode="wait">
        {currentMovie && (
          <SwipeCard
            key={`${currentMovie.id}-${index}`}
            movie={currentMovie}
            onSwipe={handleSwipe}
            ref={(el) => (cardRef.current = el)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default SwipeDeck;

