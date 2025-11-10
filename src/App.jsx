import Main from "./pages/Main/Main";
import { ThemeProvider } from "./context/ThemeContext";
import { Route, Routes } from "react-router-dom";
import Movie from "./pages/Movie/Movie";
import MoviesYear from "./pages/MoviesYear/MoviesYear";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/lists/movies/:year" element={<MoviesYear />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
