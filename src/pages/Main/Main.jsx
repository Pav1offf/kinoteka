import { useEffect, useState } from "react";
import { getMovies, getSearchMovies } from "../../api/apiMovie";
import styles from "./styles.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Header from "../../components/Header/Header";
import { useDebounce } from "../../helpers/hooks/useDebounce";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [keywords, setKeywords] = useState("");
  const debouncedKeywords = useDebounce(keywords, 1500);
  //   const [isLoading, setIsLoading] = useState(true);

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
    <>
      <Header keywords={keywords} setKeywords={setKeywords} />
      <main className={styles.main}>
        <MovieList movies={movies} />
      </main>
    </>
  );
};

export default Main;
