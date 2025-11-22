import { useContext, useEffect, useState } from "react";
import { getMoviesFilters } from "../../api/apiMovie";
import styles from "./styles.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Header from "../../components/Header/Header";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import { ThemeContext } from "../../context/ThemeContext";
import { useParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

const MoviesYear = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const { year } = useParams();
  const debouncedKeywords = useDebounce(keywords, 1500);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const fetchFiltersMovies = async () => {
    try {
      setIsLoading(true);
      const response = await getMoviesFilters({
        yearFrom: year.slice(0, 4),
        yearTo: year.slice(-4),
        page: currentPage,
      });
      setMovies(response.items);
      setTotalPages(response.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFiltersMovies(year);
  }, [currentPage]);

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <Header keywords={keywords} setKeywords={setKeywords} />
      <main className={styles.main}>
        <h1 className={styles.title}>Лучшие фильмы {year} года</h1>
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

export default MoviesYear;
