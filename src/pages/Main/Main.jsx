import { useContext, useEffect, useState } from "react";
import { getMovies, getSearchMovies } from "../../api/apiMovie";
import styles from "./styles.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Header from "../../components/Header/Header";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import { ThemeContext } from "../../context/ThemeContext";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [keywords, setKeywords] = useState("");
  const debouncedKeywords = useDebounce(keywords, 1500);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const fetchPopularMovie = async () => {
    try {
      const response = await getMovies();
      setMovies(response.items);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSearchMovie = async () => {
    try {
      const response = await getSearchMovies({
        keyword: debouncedKeywords,
      });
      setMovies(response.films);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearchMovie(debouncedKeywords);
  }, [debouncedKeywords]);

  useEffect(() => {
    fetchPopularMovie(1);
  }, []);

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <Header keywords={keywords} setKeywords={setKeywords} />
      <main className={styles.main}>
        <MovieList movies={movies} />
      </main>
    </div>
  );
};

export default Main;
