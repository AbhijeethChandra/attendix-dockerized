import { lazy } from "react";
import { Navigate } from "react-router";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Sector = lazy(() => import("@/pages/Sector"));
const WeekendMaster = lazy(() => import("@/pages/WeekendMaster"));
const Designation = lazy(() => import("@/pages/Designation"));

export const PrivateRoutes = [
  { index: true, element: <Navigate to="dashboard" /> },
  { path: "dashboard", element: <Dashboard /> },
  { path: "sector-master", element: <Sector /> },
  { path: "office-master", element: <Dashboard /> },
  { path: "weekend-master", element: <WeekendMaster /> },
  { path: "designation-master", element: <Designation /> },
  { path: "*", element: <div>On Development...</div> },
];
