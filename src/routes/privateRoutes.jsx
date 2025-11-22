import { lazy } from "react";
import { Navigate } from "react-router";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Sector = lazy(() => import("@/pages/Sector"));
const LeaveType = lazy(() => import("@/pages/Leave Type"));
const Geo = lazy(() => import("@/pages/GeoLocation"));
const Employee = lazy(() => import("@/pages/Employee"));
const Holiday = lazy(() => import("@/pages/Holiday"));
const WeekendMaster = lazy(() => import("@/pages/WeekendMaster"));
const Designation = lazy(() => import("@/pages/Designation"));
const AttendanceRequest = lazy(() => import("@/pages/AttendanceRequest"));
const Department = lazy(() => import("@/pages/Department Master"));
const OfficeAllocation = lazy(() => import("@/pages/OfficeAllocation"));
const Office = lazy(() => import("@/pages/Office"));
const Shift = lazy(() => import("@/pages/Shift"));
const LeaveReq = lazy(() => import("@/pages/LeaveRequest"));
const ShiftAss = lazy(() => import("@/pages/ShiftAssignment"));
const ShiftOver = lazy(() => import("@/pages/ShiftOverride"));
const DayWiseRep = lazy(() => import("@/pages/DayWiseReport"));
const EmployeeWiseRep = lazy(() => import("@/pages/EmployeeWiseReport"));
const LeaveRep = lazy(() => import("@/pages/LeaveReport"));
const DeviceIn = lazy(() => import("@/pages/DeviceInfo"));

export const PrivateRoutes = [
  { index: true, element: <Navigate to="dashboard" /> },
  { path: "dashboard", element: <Dashboard /> },
  { path: "sector-master", element: <Sector /> },
  { path: "office-master", element: <Office /> },
  { path: "leave-type", element: <LeaveType /> },
  { path: "geo-location", element: <Geo /> },
  { path: "employee-master", element: <Employee /> },
  { path: "holiday-master", element: <Holiday /> },
  { path: "weekend-master", element: <WeekendMaster /> },
  { path: "designation-master", element: <Designation /> },
  { path: "attendance-request", element: <AttendanceRequest /> },
  { path: "department-master", element: <Department /> },
  { path: "office-allocation", element: <OfficeAllocation /> },
  { path: "leave-request", element: <LeaveReq /> },
  { path: "shift-master", element: <Shift /> },
  { path: "shift-assignment", element: <ShiftAss /> },
  { path: "shift-override", element: <ShiftOver /> },
  { path: "day-wise-report", element: <DayWiseRep /> },
  { path: "employee-wise-report", element: <EmployeeWiseRep /> },
  { path: "leave-report", element: <LeaveRep /> },
  { path: "device-info", element: <DeviceIn /> },
];
