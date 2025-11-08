import Main from "../pages/Main/Main";

const { createBrowserRouter } = require("react-router-dom");

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <div>Erorr</div>,
  },

  {
    path: "/movie/:id",
    element: <div>Movies</div>,
    errorElement: <div>Erorr</div>,
  },
]);
