import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { getMovie, getStaff } from "../../api/apiMovie";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import Header from "../../components/Header/Header";

const Movie = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [staff, setStaff] = useState([]);
  const [keywords, setKeywords] = useState("");
  const debouncedKeywords = useDebounce(keywords, 1500);

  function ratingColor(rating) {
    if (rating >= 7) {
      return styles.ratingGreen;
    } else if (rating > 5) {
      return styles.ratingOrange;
    } else if (rating < 5) {
      return styles.ratingRed;
    }
  }

  const fetchMovie = async (id) => {
    try {
      const response = await getMovie(id);
      setMovie(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStaff = async (id) => {
    try {
      const response = await getStaff(id);
      setStaff(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStaff(id);
    fetchMovie(id);
  }, [id]);

  const navigate = useNavigate();

  const navigateToYear = () => {
    navigate(`/lists/movies/${movie.year}`);
  };

  const navigateToGenre = (genre) => {
    navigate(`/lists/movies/genre/${genre}`);
  };

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <Header keywords={keywords} setKeywords={setKeywords} />
      <main className={`${theme === "light" ? styles.dark : styles.light}`}>
        <main className={styles.main}>
          <div className={styles.image}>
            <img src={movie.posterUrlPreview} alt="логан" />
          </div>
          <div className={styles.info}>
            <h2 className={styles.title}>
              {movie.nameRu}
              <span>{` (${movie.year})`}</span>
            </h2>
            <div style={{ paddingTop: "10px" }}>
              <span className={styles.subtitle}>{movie.nameOriginal}</span>
            </div>
            <p className={styles.desc}>{movie.shortDescription}</p>

            <button className={styles.button}>Смотреть</button>

            <h3>О фильме</h3>

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
                      <span key={index}>
                        {item.country}
                        {index < array.length - 1 && ", "}{" "}
                      </span>
                    );
                  })}
                </span>
              </div>

              <div>
                <span>Жанр</span>
                <span>
                  {movie.genres?.map((item, index, array) => {
                    return (
                      <a
                        key={index}
                        onClick={() => navigateToGenre(item.genre)}
                      >
                        {item.genre}
                        {index < array.length - 1 && ", "}{" "}
                      </a>
                    );
                  })}
                </span>
              </div>
              <div>
                <span>Режиссер</span>
                <span>
                  {staff
                    .filter((item) => item.professionKey === "DIRECTOR")
                    .slice(0, 3)
                    .map((item, index, array) => {
                      return (
                        <span key={index}>
                          {item.nameRu}
                          {index < array.length - 1 && ", "}{" "}
                        </span>
                      );
                    })}
                </span>
              </div>
              <div>
                <span>Продюсер</span>
                <span>
                  {staff
                    .filter((item) => item.professionKey === "PRODUCER")
                    .slice(0, 3)
                    .map((item, index, array) => {
                      return (
                        <span key={index}>
                          {item.nameRu}
                          {index < array.length - 1 && ", "}{" "}
                        </span>
                      );
                    })}
                </span>
              </div>
              <div>
                <span>Оператор</span>
                <span>
                  {staff
                    .filter((item) => item.professionKey === "OPERATOR")
                    .map((item, index, array) => {
                      return (
                        <span key={index}>
                          {item.nameRu}
                          {index < array.length - 1 && ", "}{" "}
                        </span>
                      );
                    })}
                </span>
              </div>
              <div>
                <span>Композитор</span>
                <span>
                  {staff
                    .filter((item) => item.professionKey === "COMPOSER")
                    .map((item, index, array) => {
                      return (
                        <span key={index}>
                          {item.nameRu}
                          {index < array.length - 1 && ", "}{" "}
                        </span>
                      );
                    })}
                </span>
              </div>
              <div>
                <span>Монтаж</span>
                <span>
                  {staff
                    .filter((item) => item.professionKey === "EDITOR")
                    .map((item, index, array) => {
                      return (
                        <span key={index}>
                          {item.nameRu}
                          {index < array.length - 1 && ", "}{" "}
                        </span>
                      );
                    })}
                </span>
              </div>
              <div>
                <span>Возраст</span>
                <span className={styles.age}>
                  {movie.ratingAgeLimits?.slice(3, 5)}+
                </span>
              </div>
              <div>
                <span>Время</span>
                <span>
                  {Math.trunc(movie.filmLength / 60)} ч {movie.filmLength % 60}{" "}
                  мин
                </span>
              </div>
            </div>
          </div>
          <div className={styles.infoRight}>
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
            <div className={styles.actors}>
              <h3 className={styles.actorsTitle}>В главных ролях:</h3>
              {staff
                .filter((item) => item.professionKey === "ACTOR")
                .slice(0, 10)
                .map((item, index) => {
                  return (
                    <a key={index} className={styles.actor}>
                      {item.nameRu}
                    </a>
                  );
                })}
            </div>
          </div>
        </main>
      </main>
    </div>
  );
};

export default Movie;
