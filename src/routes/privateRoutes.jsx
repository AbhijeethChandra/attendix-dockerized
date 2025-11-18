import { lazy } from "react";
import { Navigate } from "react-router";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Sector = lazy(() => import("@/pages/Sector"));
const LeaveType = lazy(() => import("@/pages/Leave Type"));
const Geo = lazy(() => import("@/pages/Geo Location"));
const Employee = lazy(() => import("@/pages/Employee"));
const WeekendMaster = lazy(() => import("@/pages/WeekendMaster"));
const Designation = lazy(() => import("@/pages/Designation"));
const AttendanceRequest = lazy(() => import("@/pages/AttendanceRequest"));
const Department = lazy(() => import("@/pages/Department Master"));
const OfficeAllocation = lazy(() => import("@/pages/OfficeAllocation"));
const Office = lazy(() => import("@/pages/Office"));
const Shift = lazy(() => import("@/pages/Shift"));

export const PrivateRoutes = [
  { index: true, element: <Navigate to="dashboard" /> },
  { path: "dashboard", element: <Dashboard /> },
  { path: "sector-master", element: <Sector /> },
  { path: "office-master", element: <Office /> },
  { path: "leave-type", element: <LeaveType /> },
  { path: "geo-location", element: <Geo /> },
  { path: "employee-master", element: <Employee /> },
  { path: "weekend-master", element: <WeekendMaster /> },
  { path: "designation-master", element: <Designation /> },
  { path: "attendance-request", element: <AttendanceRequest /> },
  { path: "department-master", element: <Department /> },
  { path: "office-allocation", element: <OfficeAllocation /> },
  { path: "shift-master", element: <Shift /> },
  { path: "*", element: <div>On Development...</div> },
];
