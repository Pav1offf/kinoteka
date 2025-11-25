import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  getMovie,
  getSequels,
  getSimilars,
  getStaff,
} from "../../api/apiMovie";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import Header from "../../components/Header/Header";
import JobPersonList from "../../components/JobPersonList/JobPersonList";
import MovieList from "../../components/MovieList/MovieList";

const Movie = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [staff, setStaff] = useState([]);
  const [sequels, setSequels] = useState([]);
  const [similars, setSimilars] = useState([]);
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

  const fetchSequels = async (id) => {
    try {
      const response = await getSequels(id);
      setSequels(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSimilars = async (id) => {
    try {
      const response = await getSimilars(id);
      setSimilars(response.items);
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
    fetchSequels(id);
    fetchSimilars(id);
  }, [id]);

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

  const navigateToPerson = (personId) => {
    navigate(`/name/${personId}`);
  };

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <Header keywords={keywords} setKeywords={setKeywords} />
      <main
        className={`${styles.main} ${
          theme === "light" ? styles.dark : styles.light
        }`}
      >
        <div className={styles.top}>
          <div className={styles.image}>
            <img src={movie.posterUrlPreview} alt="постер" />
          </div>
          <div className={styles.info}>
            <h2 className={styles.title}>
              {movie.nameRu ? movie.nameRu : movie.nameOriginal}
              <span>{` (${movie.year}${
                movie.endYear ? -movie.endYear : ""
              })`}</span>
            </h2>
            <div style={{ paddingTop: "10px" }}>
              <span className={styles.subtitle}>{movie.nameOriginal}</span>
            </div>
            <p className={styles.desc}>{movie.shortDescription}</p>

            <a
              href={`https://www.kinopoisk.cx/film/${movie.kinopoiskId}`}
              className={styles.button}
            >
              Смотреть
            </a>

            {movie.type === "FILM" ? <h3>О фильме</h3> : <h3>О Сериале</h3>}

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
                      <a
                        key={index}
                        onClick={() => navigateToСountry(item.country)}
                      >
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
              <JobPersonList staff={staff} />
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
                    {Math.trunc(movie.filmLength / 60)} ч{" "}
                    {movie.filmLength % 60} мин
                  </span>
                ) : (
                  <span>{"—"}</span>
                )}
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
                    <a
                      key={index}
                      className={styles.actor}
                      onClick={() => navigateToPerson(item.staffId)}
                    >
                      {item.nameRu}
                      {` (${item.description})`}
                    </a>
                  );
                })}
            </div>
          </div>
        </div>

        <div className={styles.sequels}>
          <p>{movie.description}</p>
        </div>

        <div className={styles.sequels}>
          <h3 className={styles.sequelsTitle}>
            Сиквелы, приквелы и ремейки{" >"}
          </h3>
          <MovieList movies={sequels} type="scrollbar" />
        </div>

        <div className={styles.sequels}>
          <h3 className={styles.sequelsTitle}>Похожие фильмы{" >"}</h3>
          <MovieList movies={similars} type="scrollbar" />
        </div>
      </main>
    </div>
  );
};

export default Movie;
