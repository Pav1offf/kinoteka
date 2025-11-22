import { useContext, useEffect, useState } from "react";
import { getMoviesFilters } from "../../api/apiMovie";
import styles from "./styles.module.css";
import MovieList from "../../components/MovieList/MovieList";
import Header from "../../components/Header/Header";
import { ThemeContext } from "../../context/ThemeContext";
import Pagination from "../../components/Pagination/Pagination";
import SideBar from "../../components/SideBar/SideBar";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const { theme } = useContext(ThemeContext);
  const { handleTouchStart, handleTouchEnd } = useContext(ThemeContext);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("10002025");
  const [selectedSort, setSelectedSort] = useState("RATING");
  const [range, setRange] = useState([1, 10]);

  const fetchPopularMovie = async () => {
    try {
      setIsLoading(true);
      const response = await getMoviesFilters({
        page: currentPage,
        countries: selectedCountry,
        genres: selectedGenre,
        order: selectedSort,
        yearFrom: selectedYear.slice(0, 4),
        yearTo: selectedYear.slice(-4),
        ratingFrom: range.slice(0, 1),
        ratingTo: range.slice(-1),
      });
      setMovies(response.items);
      setIsLoading(false);
      // setTotalPages(response.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPopularMovie(currentPage);
  }, [
    currentPage,
    selectedGenre,
    selectedCountry,
    selectedYear,
    selectedSort,
    range,
  ]);

  return (
    <div
      className={`${theme === "light" ? styles.dark : styles.light}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Header />
      <main className={styles.main}>
        <SideBar
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          range={range}
          setRange={setRange}
        />
        <div className={styles.content}>
          <MovieList movies={movies} isLoading={isLoading} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </main>
    </div>
  );
};

export default Main;
