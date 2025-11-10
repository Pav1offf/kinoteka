import { useContext, useEffect, useState } from "react";
import { getMoviesFilters } from "../../api/apiMovie";
import styles from "./styles.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Header from "../../components/Header/Header";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import { ThemeContext } from "../../context/ThemeContext";
import { useParams } from "react-router-dom";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [keywords, setKeywords] = useState("");
  const { year } = useParams();
  const debouncedKeywords = useDebounce(keywords, 1500);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const fetchFiltersMovies = async () => {
    try {
      const response = await getMoviesFilters({ yearFrom: year, yearTo: year });
      setMovies(response.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFiltersMovies(year);
  }, []);

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <Header keywords={keywords} setKeywords={setKeywords} />
      <main className={styles.main}>
        <h1 className={styles.title}>Лучшие фильмы {year} года</h1>
        <MovieList movies={movies} />
      </main>
    </div>
  );
};

export default Main;
