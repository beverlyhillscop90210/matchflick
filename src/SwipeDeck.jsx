import { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';

function SwipeDeck({ movies = [], onSwipe }) {
  const cardRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        cardRef.current?.triggerSwipe('left');
      } else if (e.key === 'ArrowRight') {
        cardRef.current?.triggerSwipe('right');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
      <AnimatePresence>
        {movies.slice(0, 1).map((movie) => (
          <SwipeCard
            key={movie.id}
            movie={movie}
            onSwipe={onSwipe}
            ref={cardRef}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default SwipeDeck;

