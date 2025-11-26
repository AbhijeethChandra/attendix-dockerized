import { PathHandler } from "@/components/AuthControllers/PathHandler";
import { Login } from "@/pages/Auth";

export const PublicRoutes = [
  {
    path: "*",
    element: <PathHandler userTypes={["ALL"]} />,
  },
  // { path: "/", element: <Navigate to="/dashboard" /> },
  {
    path: "/login",
    element: <Login />,
  },
];
