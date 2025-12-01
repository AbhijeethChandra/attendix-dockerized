import { PathHandler } from "@/components/AuthControllers/PathHandler";
import Auth from "@/pages/Auth";
import PrivacyPolicy from "@/pages/PolicyPage";

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
  {
    path: "/privacypolicy",
    element: <PrivacyPolicy />,
  },
];
