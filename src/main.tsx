import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Dialog } from "@atoms/dialog";
import { store } from "@redux/store";
import { routes } from "@routes";
import "./styles/fonts.css";
import "./styles/global.css";
import "./styles/custom.variables.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={createBrowserRouter(routes)} />
    <Dialog />
  </Provider>,
);
