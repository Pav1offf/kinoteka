import { useContext, useEffect, useState } from "react";
import { getMoviesFilters } from "../../api/apiMovie";
import styles from "./styles.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Header from "../../components/Header/Header";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import { ThemeContext } from "../../context/ThemeContext";
import { useParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { countries } from "../../api/countries";

const MoviesCountry = () => {
  const [movies, setMovies] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const { country } = useParams();
  const debouncedKeywords = useDebounce(keywords, 1500);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const countryId = countries.find((item) => item.country === country);

  const fetchFiltersMovies = async () => {
    try {
      const response = await getMoviesFilters({
        countries: countryId,
        page: currentPage,
      });
      setTotalPages(response.totalPages);
      setMovies(response.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFiltersMovies(countryId);
  }, [countryId, currentPage]);

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <Header keywords={keywords} setKeywords={setKeywords} />
      <main className={styles.main}>
        <h1 className={styles.title}>Лучшие фильмы в стране {country}</h1>
        <MovieList movies={movies} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default MoviesCountry;
