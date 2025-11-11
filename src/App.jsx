import Main from "./pages/Main/Main";
import { ThemeProvider } from "./context/ThemeContext";
import { Route, Routes } from "react-router-dom";
import Movie from "./pages/Movie/Movie";
import MoviesYear from "./pages/MoviesYear/MoviesYear";
import MoviesGenre from "./pages/MoviesGenre/MoviesGenre";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/lists/movies/:year" element={<MoviesYear />} />
        <Route path="/lists/movies/genre/:genre" element={<MoviesGenre />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
