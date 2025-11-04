import MovieCard from "../MovieCard/MovieCard";
import styles from "./styles.module.css";

const MovieList = ({ movies }) => {
  return (
    <ul className={styles.list}>
      {movies.map((movie, index) => {
        return <MovieCard key={index} movie={movie} />;
      })}
    </ul>
  );
};

export default MovieList;
