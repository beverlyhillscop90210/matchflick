// src/SwipeDeck.jsx
import { AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';

function SwipeDeck({ movies = [], onSwipe }) {
  return (
    <div
      style={{
        width: '320px',
        height: '480px',
        position: 'relative',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        position: 'absolute',
      }}
    >
      <AnimatePresence>
        {movies.slice(0, 1).map((movie) => (
          <SwipeCard key={movie.id} movie={movie} onSwipe={onSwipe} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default SwipeDeck;

