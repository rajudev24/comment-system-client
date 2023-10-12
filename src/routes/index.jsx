import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../page/Register";
import NotFound from "../page/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
