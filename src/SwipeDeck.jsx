import { AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';

function SwipeDeck({ movies = [], onSwipe }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '320px',
      height: '480px',
    }}>
      <AnimatePresence>
        {movies.slice(0, 1).map((movie) => (
          <SwipeCard key={movie.id} movie={movie} onSwipe={onSwipe} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default SwipeDeck;

