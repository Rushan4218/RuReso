import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { RootLayout } from "./layouts/RootLayout";
import { FretNinjaPage } from "./modules/fretninja/FretNinjaPage";
import { MenuPage } from "./pages/MenuPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [
        {
          index: true,
          Component: MenuPage,
        },
        {
          path: "fretboard",
          Component: FretNinjaPage,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
