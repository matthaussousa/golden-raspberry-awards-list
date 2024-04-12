import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import MovieListPage from "../pages/MovieListPage/MovieListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        index: true,
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "list",
        element: <MovieListPage />,
      },
    ],
  },
]);

export default router;
