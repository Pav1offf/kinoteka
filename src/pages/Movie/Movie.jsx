import styles from "./styles.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  getMovie,
  getSequels,
  getSimilars,
  getStaff,
} from "../../api/apiMovie";
import { useParams } from "react-router-dom";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import Header from "../../components/Header/Header";
import MovieList from "../../components/MovieList/MovieList";
import PopupPerson from "../../components/PopupPerson/PopupPerson";
import ButtonUp from "../../components/ButtonUp/ButtonUp";
import MovieParams from "../../components/MovieParams/MovieParams";
import MovieStarring from "../../components/MovieStarring/MovieStarring";
import MovieRatings from "../../components/MovieRatings/MovieRatings";

const Movie = () => {
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [person, setPerson] = useState([]);
  const [staff, setStaff] = useState([]);
  const [sequels, setSequels] = useState([]);
  const [similars, setSimilars] = useState([]);
  const [keywords, setKeywords] = useState("");
  const debouncedKeywords = useDebounce(keywords, 1500);

  const [isOpen, setIsOpen] = useState(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const handleMouseEnter = useCallback((e, item) => {
    setCoordinates({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
    setPerson(item);
  }, []);

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

            <MovieParams
              movie={movie}
              staff={staff}
              handleMouseEnter={handleMouseEnter}
              setIsOpen={setIsOpen}
            />
          </div>
          <div className={styles.infoRight}>
            <MovieRatings movie={movie} />

            <MovieStarring
              staff={staff}
              handleMouseEnter={handleMouseEnter}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>

        <div className={styles.sequels}>
          <p>{movie.description}</p>
        </div>

        {sequels ? (
          <div className={styles.sequels}>
            <h3 className={styles.sequelsTitle}>
              Сиквелы, приквелы и ремейки{" >"}
            </h3>
            <MovieList movies={sequels} type="scrollbar" />
          </div>
        ) : null}
        {similars.length ? (
          <div className={styles.sequels}>
            <h3 className={styles.sequelsTitle}>Похожие фильмы{" >"}</h3>
            <MovieList movies={similars} type="scrollbar" />
          </div>
        ) : null}

        {isOpen && <PopupPerson person={person} coordinates={coordinates} />}

        <ButtonUp />
      </main>
    </div>
  );
};

export default Movie;
