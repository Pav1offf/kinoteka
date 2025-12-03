import { memo } from "react";
import styles from "./styles.module.css";
const MovieRatings = ({ movie }) => {
  function ratingColor(rating) {
    if (rating >= 7) {
      return styles.ratingGreen;
    } else if (rating > 5) {
      return styles.ratingOrange;
    } else if (rating < 5) {
      return styles.ratingRed;
    }
  }

  return (
    <div className={styles.ratings}>
      {movie.ratingImdb ? (
        <div className={ratingColor(movie.ratingImdb)}>
          {movie.ratingImdb} <span>Imdb</span>
        </div>
      ) : null}
      {movie.ratingImdb ? (
        <span>{movie.ratingImdbVoteCount} оценки</span>
      ) : null}

      {movie.ratingKinopoisk ? (
        <div className={ratingColor(movie.ratingKinopoisk)}>
          {movie.ratingKinopoisk} <span>Кинопоиск</span>
        </div>
      ) : null}
      {movie.ratingKinopoisk ? (
        <span>{movie.ratingKinopoiskVoteCount} оценки</span>
      ) : null}
    </div>
  );
};

export default memo(MovieRatings);
