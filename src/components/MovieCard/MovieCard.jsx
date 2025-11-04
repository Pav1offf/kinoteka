import styles from "./styles.module.css";

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={movie.posterUrlPreview} alt="banner" />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.nameRu}</h3>
        <p className={styles.year}>{movie.year}</p>
        <div>
          <div className={styles.genre}>
            {movie.genres.map((genre) => genre.genre).join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
