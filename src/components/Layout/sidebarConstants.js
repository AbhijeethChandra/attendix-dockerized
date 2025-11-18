import {
  CalendarDateRangeIcon,
  HomeIcon,
  RectangleGroupIcon,
} from "@heroicons/react/16/solid";

export const ALL_SIDEBAR_LIST = [
  { Icon: HomeIcon, name: "Dashboard", path: "dashboard" },
  { Icon: RectangleGroupIcon, name: "Control Panel", path: "control-panel" },
  { Icon: null, name: "Sector Master", path: "sector-master" },
  { Icon: null, name: "Office Master", path: "office-master" },
  { Icon: null, name: "Geo Location", path: "geo-location" },
  { Icon: null, name: "Department Master", path: "department-master" },
  { Icon: null, name: "Designation Master", path: "designation-master" },
  { Icon: null, name: "Employee Master", path: "employee-master" },
  { Icon: null, name: "Office Allocation", path: "office-allocation" },
  { Icon: null, name: "Shift Master", path: "shift-master" },
  { Icon: null, name: "Leave Type", path: "leave-type" },
  { Icon: null, name: "Weekend Master", path: "weekend-master" },
  {
    Icon: CalendarDateRangeIcon,
    name: "Attendance Request",
    path: "attendance-request",
  },
];

export const SIDEBAR_LIST_BY_ROLE = {
  ["admin"]: [
    { name: "dashboard", id: 1 },
    { name: "control-panel", id: 2 },
    { name: "sector-master", parent: 2 },
    { name: "office-master", parent: 2 },
    { name: "geo-location", parent: 2 },
    { name: "department-master", parent: 2 },
    { name: "designation-master", parent: 2 },
    { name: "employee-master", parent: 2 },
    { name: "office-allocation", parent: 2 },
    { name: "shift-master", parent: 2 },
    { name: "leave-type", parent: 2 },
    { name: "weekend-master", parent: 2 },
    { name: "attendance-request", id: 3 },
  ],
};
