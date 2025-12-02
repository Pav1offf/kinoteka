import Main from "./pages/Main/Main";
import { createBrowserRouter } from "react-router-dom";
import Movie from "./pages/Movie/Movie";
import MoviesYear from "./pages/MoviesYear/MoviesYear";
import MoviesGenre from "./pages/MoviesGenre/MoviesGenre";
import SearchPage from "./pages/SearchPage/SearchPage";
import PersonNamePage from "./pages/PersonNamePage/PersonNamePage";
import MoviesCountry from "./pages/MoviesCountry/MoviesCountry";
import ListsMovies from "./pages/ListsMovies/ListsMovies";
import MoviesСollection from "./pages/MoviesСollection/MoviesСollection";
import RootLayout from "./RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "search/:query",
        element: <SearchPage />,
      },
      {
        path: "movie/:id",
        element: <Movie />,
      },
      {
        path: "name/:personId",
        element: <PersonNamePage />,
      },
      {
        path: "lists/movies",
        element: <ListsMovies />,
      },
      {
        path: "lists/movies/year/:year",
        element: <MoviesYear />,
      },
      {
        path: "lists/movies/genre/:genre",
        element: <MoviesGenre />,
      },
      {
        path: "lists/movies/collection/:collection",
        element: <MoviesСollection />,
      },
      {
        path: "lists/movies/country/:country",
        element: <MoviesCountry />,
      },
    ],
  },
]);

export default router;
