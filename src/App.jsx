import Main from "./pages/Main/Main";
import { ThemeProvider } from "./context/ThemeContext";
import { Route, Routes } from "react-router-dom";
import Movie from "./pages/Movie/Movie";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
