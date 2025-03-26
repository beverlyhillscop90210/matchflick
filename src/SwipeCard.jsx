import { motion, useMotionValue, useTransform } from 'framer-motion';

function SwipeCard({ movie, onSwipe }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <motion.div
      drag="x"
      style={{
        x,
        rotate,
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
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      onDragEnd={(e, info) => {
        if (info.offset.x > 150) onSwipe?.('right', movie);
        if (info.offset.x < -150) onSwipe?.('left', movie);
      }}
    />
  );
}

export default SwipeCard;

