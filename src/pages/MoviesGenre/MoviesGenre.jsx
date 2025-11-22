import { useContext, useEffect, useState } from "react";
import { getMoviesFilters } from "../../api/apiMovie";
import styles from "./styles.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Header from "../../components/Header/Header";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import { ThemeContext } from "../../context/ThemeContext";
import { useParams } from "react-router-dom";
import { genres } from "../../api/genres";
import Pagination from "../../components/Pagination/Pagination";

const MoviesGenre = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const { genre } = useParams();
  const debouncedKeywords = useDebounce(keywords, 1500);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const genreId = genres.find((item) => item.genre === genre);

  const fetchFiltersMovies = async () => {
    try {
      setIsLoading(true);
      const response = await getMoviesFilters({
        genres: genreId.id,
        page: currentPage,
      });
      setTotalPages(response.totalPages);
      setMovies(response.items);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFiltersMovies(genreId.id);
  }, [currentPage]);

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <Header keywords={keywords} setKeywords={setKeywords} />
      <main className={styles.main}>
        <h1 className={styles.title}>Лучшие фильмы в жанре {genre}</h1>
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

export default MoviesGenre;
