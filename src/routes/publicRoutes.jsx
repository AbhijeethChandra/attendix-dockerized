import { PathHandler } from "@/components/AuthControllers/PathHandler";
import { Login } from "@/pages/Auth";
import { Navigate } from "react-router";

export const PublicRoutes = [
  {
    path: "*",
    element: <PathHandler userTypes={["ALL"]} />,
  },
  { path: "/", element: <Navigate to="/dashboard" /> },
  {
    path: "/login",
    element: <Login />,
  },
];
