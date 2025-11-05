import Rating from "../Rating/Rating";
import styles from "./styles.module.css";

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={movie.posterUrlPreview} alt="banner" />
        <div className={styles.ratings}>
          {movie.ratingImdb ? (
            <Rating rating={movie.ratingImdb} name={"Imdb "} />
          ) : null}
          {movie.ratingKinopoisk ? (
            <Rating rating={movie.ratingKinopoisk} name={"КП "} />
          ) : null}
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.nameRu}</h3>
        <p className={styles.year}>{movie.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
