// src/SwipeDeck.jsx
import { useRef, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';

const SWIPE_HOLD_MS = 500;              // 🕒 Wie lange Karte sichtbar bleibt nach Swipe
const SWIPE_ANIMATION_MS = 100;         // 🎞 Dauer der Swipe-Animation
const NEXT_CARD_SCALE = 0.96;
const NEXT_CARD_BLUR = 20;

function SwipeDeck({ movies, index, onSwipe }) {
  const cardRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(index);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!cardRef.current || isAnimating) return;
      if (e.key === 'ArrowLeft') cardRef.current.triggerSwipe('left');
      if (e.key === 'ArrowRight') cardRef.current.triggerSwipe('right');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating]);

  const currentMovie = movies[displayIndex];
  const nextMovie = movies[displayIndex + 1];

  const handleSwipe = (dir, movie) => {
    setIsAnimating(true);
    setTimeout(() => {
      onSwipe(dir, movie);
      setDisplayIndex((prev) => prev + 1);
      setIsAnimating(false);
    }, SWIPE_HOLD_MS);
  };

  return (
    <div
      style={{
        width: '320px',
        height: '480px',
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* 🔹 Nächste Karte im Hintergrund (unswipable Preview) */}
      {nextMovie && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: `scale(${NEXT_CARD_SCALE})`,
            filter: `blur(${NEXT_CARD_BLUR}px)`,
            borderRadius: 16,
            zIndex: 0,
            overflow: 'hidden',
            transition: `all ${SWIPE_ANIMATION_MS}ms ease`,
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${nextMovie.poster_path}`}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 16,
            }}
          />
        </div>
      )}

      {/* 🔸 Aktuelle Karte */}
      <AnimatePresence mode="wait">
        {currentMovie && (
          <SwipeCard
            key={`${currentMovie.id}-${displayIndex}`}
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
