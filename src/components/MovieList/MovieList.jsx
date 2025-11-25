import MovieCard from "../MovieCard/MovieCard";
import Skeleton from "../Skeleton/Skeleton";
import styles from "./styles.module.css";

const MovieList = ({ movies, isLoading, type = "list" }) => {
  return (
    <ul className={styles[type]}>
      {!isLoading ? (
        movies.map((movie, index) => {
          return <MovieCard key={index} movie={movie} type={type} />;
        })
      ) : (
        <Skeleton />
      )}
    </ul>
  );
};

export default MovieList;
