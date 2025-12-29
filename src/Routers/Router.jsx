import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import TechPackLibrary from "../Pages/Main/TechPackLibrary";
import AddFactionLibrary from "../Pages/Add Faction Library/AddFactionLibrary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <h1>404</h1>,
    children: [
      {
        path: "/",
        element: <TechPackLibrary />,
      },
      {
        path: "/add-faction-library",
        element: <AddFactionLibrary />,
      },
    ],
  },
  {
    path: "/register",
    element: <h1>Register</h1>,
  },
]);
