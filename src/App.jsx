import Main from "./pages/Main/Main";
import { ThemeProvider } from "./context/ThemeContext";
import { Route, Routes } from "react-router-dom";
import Movie from "./pages/Movie/Movie";
import MoviesYear from "./pages/MoviesYear/MoviesYear";
import MoviesGenre from "./pages/MoviesGenre/MoviesGenre";
import SearchPage from "./pages/SearchPage/SearchPage";
import PersonNamePage from "./pages/PersonNamePage/PersonNamePage";
import MoviesCountry from "./pages/MoviesCountry/MoviesCountry";
import ListsMovies from "./pages/ListsMovies/ListsMovies";
import MoviesСollection from "./pages/MoviesСollection/MoviesСollection";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/name/:personId" element={<PersonNamePage />} />
        <Route path="/lists/movies" element={<ListsMovies />} />
        <Route path="/lists/movies/year/:year" element={<MoviesYear />} />
        <Route path="/lists/movies/genre/:genre" element={<MoviesGenre />} />
        <Route
          path="/lists/movies/collection/:collection"
          element={<MoviesСollection />}
        />
        <Route
          path="/lists/movies/country/:country"
          element={<MoviesCountry />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
