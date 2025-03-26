import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

function SwipeCard({ movie, onSwipe }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-300, 0, 300], [0, 1, 0]);
  const cardRef = useRef();

  // 🔁 Drag-Bewegung beobachten
  useEffect(() => {
    const unsubscribe = x.onChange((latestX) => {
      if (latestX > 150) animateOut('right');
      else if (latestX < -150) animateOut('left');
    });
    return () => unsubscribe();
  }, []);

  // 🎯 Tastatursteuerung: Links / Rechts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        animateOut('right');
      } else if (e.key === 'ArrowLeft') {
        animateOut('left');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 🧊 Animation raus + Callback
  const animateOut = (direction) => {
    const toX = direction === 'right' ? 500 : -500;
    animate(x, toX, {
      duration: 0.3,
      onComplete: () => {
        onSwipe?.(direction, movie);
      }
    });
  };

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <motion.div
      ref={cardRef}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{
        x,
        rotate,
        opacity,
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 16,
        backgroundColor: '#111',
        backgroundImage: `url(${poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
        zIndex: 1,
        cursor: 'grab',
      }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      whileTap={{ cursor: 'grabbing' }}
    />
  );
}

export default SwipeCard;

