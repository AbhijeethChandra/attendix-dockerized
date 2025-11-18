import { lazy } from "react";
import { Navigate } from "react-router";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Sector = lazy(() => import("@/pages/Sector"));
const LeaveType = lazy(() => import("@/pages/Leave Type"));

export const PrivateRoutes = [
  { index: true, element: <Navigate to="dashboard" /> },
  { path: "dashboard", element: <Dashboard /> },
  { path: "sector-master", element: <Sector /> },
  { path: "office-master", element: <Dashboard /> },
  { path: "leave-type", element: <LeaveType /> },
  { path: "*", element: <div>On Development...</div> },
];
