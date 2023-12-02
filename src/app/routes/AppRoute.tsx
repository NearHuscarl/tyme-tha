import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Marketplace } from "app/modules/marketplace";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Marketplace />,
  },
]);

export const AppRoutes = () => <RouterProvider router={router} />;
