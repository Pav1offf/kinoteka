import MovieCard from "../MovieCard/MovieCard";
import Skeleton from "../Skeleton/Skeleton";
import styles from "./styles.module.css";

const MovieList = ({ movies, isLoading }) => {
  return (
    <ul className={styles.list}>
      {!isLoading ? (
        movies.map((movie, index) => {
          return <MovieCard key={index} movie={movie} />;
        })
      ) : (
        <Skeleton />
      )}
    </ul>
  );
};

export default MovieList;
