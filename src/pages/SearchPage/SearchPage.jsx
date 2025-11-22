import { useContext, useEffect, useState } from "react";
import { getSearchMovies } from "../../api/apiMovie";
import styles from "./styles.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Header from "../../components/Header/Header";
import { ThemeContext } from "../../context/ThemeContext";
import { useParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { query } = useParams();

  const fetchSearchMovie = async () => {
    try {
      setIsLoading(true);
      const response = await getSearchMovies({
        keyword: query,
        page: currentPage,
      });
      setMovies(response.films);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSearchMovie();
  }, [query, currentPage]);

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <Header setMovies={() => setMovies(response.films)} movies={movies} />
      <main className={styles.main}>
        <h1 className={styles.title}>Фильмы и сериалы по запросу {query}:</h1>
        <MovieList movies={movies} isLoading={isLoading} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default SearchPage;
