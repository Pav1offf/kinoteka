import { memo } from "react";
import styles from "./styles.module.css";
import JobPersonList from "../JobPersonList/JobPersonList";
import { useNavigate } from "react-router-dom";

const MovieParams = ({
  movie,
  staff,
  handleMouseEnter,
  setIsOpen,
  isLoading,
}) => {
  const navigate = useNavigate();

  const navigateToYear = () => {
    navigate(`/lists/movies/year/${movie.year}`);
  };

  const navigateToGenre = (genre) => {
    navigate(`/lists/movies/genre/${genre}`);
  };

  const navigateToСountry = (country) => {
    navigate(`/lists/movies/country/${country}`);
  };

  return (
    <div className={styles.params}>
      <div>
        <span>Год производства</span>
        <a onClick={() => navigateToYear(movie.year)}>{movie.year}</a>
      </div>

      <div>
        <span>Страна</span>
        <span>
          {movie.countries?.map((item, index, array) => {
            return (
              <a key={index} onClick={() => navigateToСountry(item.country)}>
                {item.country}
                {index < array.length - 1 && ", "}{" "}
              </a>
            );
          })}
        </span>
      </div>

      <div>
        <span>Жанр</span>
        <span>
          {movie.genres?.map((item, index, array) => {
            return (
              <a key={index} onClick={() => navigateToGenre(item.genre)}>
                {item.genre}
                {index < array.length - 1 && ", "}{" "}
              </a>
            );
          })}
        </span>
      </div>
      <JobPersonList
        staff={staff}
        handleMouseEnter={handleMouseEnter}
        setIsOpen={setIsOpen}
      />
      <div>
        {movie.ratingAgeLimits ? (
          <>
            <span>Возраст</span>
            <span className={styles.age}>
              {movie.ratingAgeLimits?.slice(3, 5)}+
            </span>{" "}
          </>
        ) : null}
      </div>
      <div>
        <span>Время</span>
        {movie.filmLength ? (
          <span>
            {Math.trunc(movie.filmLength / 60)} ч {movie.filmLength % 60} мин
          </span>
        ) : (
          <span>{"—"}</span>
        )}
      </div>
    </div>
  );
};

export default memo(MovieParams);
