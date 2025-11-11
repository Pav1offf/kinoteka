import { useContext, useEffect, useState } from "react";
import { getSearchMovies } from "../../api/apiMovie";
import styles from "./styles.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Header from "../../components/Header/Header";
import { ThemeContext } from "../../context/ThemeContext";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { query } = useParams();

  const fetchSearchMovie = async () => {
    try {
      const response = await getSearchMovies({
        keyword: query,
      });
      setMovies(response.films);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearchMovie(query);
  }, [query]);

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <Header setMovies={() => setMovies(response.films)} movies={movies} />
      <main className={styles.main}>
        <h1>Фильмы и сериалы по запросу {query}:</h1>
        <MovieList movies={movies} />
      </main>
    </div>
  );
};

export default SearchPage;
