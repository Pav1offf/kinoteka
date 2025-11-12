import { useContext, useEffect, useState } from "react";
import { getMovies } from "../../api/apiMovie";
import styles from "./styles.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Header from "../../components/Header/Header";
import { ThemeContext } from "../../context/ThemeContext";
import Pagination from "../../components/Pagination/Pagination";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const fetchPopularMovie = async () => {
    try {
      const response = await getMovies({
        page: currentPage,
      });
      setMovies(response.items);
      // setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPopularMovie(currentPage);
  }, [currentPage]);

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <Header />
      <main className={styles.main}>
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

export default Main;
