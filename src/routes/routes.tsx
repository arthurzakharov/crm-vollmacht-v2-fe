import { Attachment } from "@pages/attachment";
import { Error } from "@pages/error";
import { Home } from "@pages/home";
import { Remuneration } from "@pages/remuneration";

export const routes = [
  {
    path: "*",
    element: <Error />,
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    hasErrorBoundary: true,
  },
  {
    path: "/a",
    element: <Home />,
    errorElement: <Error />,
    hasErrorBoundary: true,
  },
  {
    path: "/b",
    element: <Home />,
    errorElement: <Error />,
    hasErrorBoundary: true,
  },
  {
    path: "/c",
    element: <Home />,
    errorElement: <Error />,
    hasErrorBoundary: true,
  },
  {
    path: "/attachment/:secret",
    element: <Attachment />,
    errorElement: <Error />,
    hasErrorBoundary: true,
  },
  {
    path: "/remuneration/:secret",
    element: <Remuneration />,
    errorElement: <Error />,
    hasErrorBoundary: true,
  },
];
