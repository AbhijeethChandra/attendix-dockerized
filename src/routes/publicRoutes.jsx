import { PathHandler } from "@/components/AuthControllers/PathHandler";
import Auth from "@/pages/Auth";

export const PublicRoutes = [
  {
    path: "*",
    element: <PathHandler userTypes={["ALL"]} />,
  },
  // { path: "/", element: <Navigate to="/dashboard" /> },
  {
    path: "/login",
    element: <Auth />,
  },
   {
    path: "/forgot-password",
    element: <Auth />,
  },
];
