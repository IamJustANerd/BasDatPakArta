import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Root from "./Root";
import InputSiswaBaru from "./InputSiswaBaru";
import InputNilaiSiswa from "./InputNilaiSiswa";
import CekNilaiSiswa from "./CekNilaiSiswa";
import BikinFormProject from "./BikinFormProject"

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
      {
        path: "/InputProjectBaru",
        element: <BikinFormProject />
      },
      {
        path: "/InputSiswaBaru",
        element: <InputSiswaBaru />
      },
      {
        path: "/InputNilaiSiswa",
        element: <InputNilaiSiswa />
      },
      {
        path: "/CekNilaiSiswa",
        element: <CekNilaiSiswa />
      }
    ]
  },
]);

export default router;
