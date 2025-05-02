import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Movies from "./pages/Movies.jsx";
import Shows from "./pages/Shows.jsx";
import Search from "./pages/Search.jsx";
import Details from "./pages/Details.jsx";
import Actor from "./pages/Actor.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import FavouriteActors from "./pages/FavouriteActors.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "movies",
        Component: Movies,
      },
      {
        path: "shows",
        Component: Shows,
      },
      {
        path: "search",
        Component: Search,
      },
      {
        path: ":type/:id",
        Component: Details,
      },
      {
        path: "actor/:id",
        Component: Actor,
      },
      {
        path: "watchlist",
        Component: ProtectedRoute,
        children: [
          {
            index: true,
            Component: Watchlist,
          },
        ],
      },
      {
        path: "favouriteActors",
        Component: ProtectedRoute,
        children: [
          {
            index: true,
            Component: FavouriteActors,
          },
        ],
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);

export default router;
