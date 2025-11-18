import { lazy } from "react";
import { Navigate } from "react-router";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Sector = lazy(() => import("@/pages/Sector"));
const Geo = lazy(() => import("@/pages/Geo Location"));

export const PrivateRoutes = [
  { index: true, element: <Navigate to="dashboard" /> },
  { path: "dashboard", element: <Dashboard /> },
  { path: "sector-master", element: <Sector /> },
  { path: "office-master", element: <Dashboard /> },
  { path: "geo-location", element: <Geo /> },
  { path: "*", element: <div>On Development...</div> },
];
