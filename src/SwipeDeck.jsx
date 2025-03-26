// src/SwipeDeck.jsx
import { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';

function SwipeDeck({ movies, index, onSwipe }) {
  const cardRef = useRef(null);

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

      <AnimatePresence mode="wait">
        {currentMovie && (
          <SwipeCard
            key={`${currentMovie.id}-${index}`}
            movie={currentMovie}
            onSwipe={onSwipe}
            ref={(el) => (cardRef.current = el)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default SwipeDeck;

