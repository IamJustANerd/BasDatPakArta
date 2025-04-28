import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Root from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
    ]
  },
]);

export default router;
