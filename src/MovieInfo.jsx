import { useState } from 'react';
import './MovieInfo.css';

// Genre-ID zu Namen Mapping
const genreMap = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

function MovieInfo({ movie }) {
  const [expanded, setExpanded] = useState(false);

  if (!movie) return null;

  // ✅ Debug-Ausgaben zum Checken
  console.log('🎬 Movie:', movie);
  console.log('🎥 Crew:', movie.credits?.crew);

  // Sterne-Rating
  const rating = movie.vote_average || 0;
  const fullStars = Math.floor(rating / 2);
  const halfStar = rating % 2 >= 1;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  // Genre-Name aus genre_ids oder genres.name
  const genreName =
    movie.genres?.[0]?.name ||
    genreMap[movie.genre_ids?.[0]] ||
    'Genre';

  // Regisseur aus Crew finden
  const director =
    movie.credits?.crew?.find((person) => person.job === 'Director')?.name || 'TBD';

  return (
    <div className={`movie-info ${expanded ? 'expanded' : ''}`}>
      {/* Gradient über dem Bild */}
      <div className="gradient-underlay" />

      {/* Titel */}
      <div className="movie-title">{movie.title}</div>

      {/* Subinfo: Genre & Director */}
      <div className="movie-subinfo">
        <span className="genre">{genreName}</span>
        <span className="dot">·</span>
        <span className="director">{director}</span>
      </div>

      {/* Sterne-Bewertung */}
      <div className="rating">
        <span>
          {[...Array(fullStars)].map((_, i) => (
            <span key={`f-${i}`} className="star">★</span>
          ))}
          {halfStar && <span className="star">★</span>}
          {[...Array(emptyStars)].map((_, i) => (
            <span key={`e-${i}`} className="star empty">★</span>
          ))}
        </span>
        <span className="rating-number">{rating.toFixed(1)}</span>
      </div>

      {/* Beschreibung + Text-Gradient */}
      <div
        className={`movie-description ${expanded ? 'expanded' : 'collapsed'}`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="description-scroll">
          <p>{movie.overview}</p>
        </div>
        <div className="text-gradient" />
      </div>
    </div>
  );
}

export default MovieInfo;
