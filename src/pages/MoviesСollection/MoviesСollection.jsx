import { useContext, useEffect, useState } from "react";
import { getMovies } from "../../api/apiMovie";
import styles from "./styles.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Header from "../../components/Header/Header";
import { ThemeContext } from "../../context/ThemeContext";
import { useParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { collections } from "../../api/collections";

const MoviesСollection = () => {
  const [movies, setMovies] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const { collection } = useParams();

  const { theme, toggleTheme } = useContext(ThemeContext);

  const collectionId = collections.find((item) => item.link === collection);

  const fetchFiltersMovies = async () => {
    try {
      const response = await getMovies({
        page: currentPage,
        type: collectionId.link,
      });
      setTotalPages(response.totalPages);
      setMovies(response.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFiltersMovies(collectionId.link);
  }, [currentPage]);

  return (
    <div className={`${theme === "light" ? styles.dark : styles.light}`}>
      <Header keywords={keywords} setKeywords={setKeywords} />
      <main className={styles.main}>
        <h1 className={styles.title}>Коллекция {collectionId.title}</h1>
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

export default MoviesСollection;
