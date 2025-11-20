import { MdCoPresent } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import { FaUserSlash } from "react-icons/fa";
import { LuUserX } from "react-icons/lu";
import { RiUser2Fill } from "react-icons/ri";
import { DashCard } from "./components/DashCard";
import { useGetDashboardCountsQuery } from "../../app/features/dashboard/dashboardApi";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";

const data = [
  {
    title: "Total Employees",
    name: "totalEmployees",
    value: "0",
    icon: FaUsersLine,
  },
  {
    title: "Present Today",
    name: "presentToday",
    value: "0",
    icon: MdCoPresent,
  },
  {
    title: "Absent Today",
    name: "absentToday",
    value: "0",
    icon: FaUserSlash,
  },
  {
    title: "Attendance Requests",
    name: "punchRequestToday",
    value: "0",
    icon: LuUserX,
  },
  {
    title: "Leave Requests",
    name: "leaveRequests",
    value: "0",
    icon: RiUser2Fill,
  },
];

export const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const officeId = useSelector((state) => state.auth.officeId);

  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useGetDashboardCountsQuery(
    user?.tenant_id ? { officeId, tenantId: user.tenant_id } : skipToken
  );

  console.log(isLoading, isError);

  console.log(dashboardData);
  return (
    <div>
      <h1 className="text-2xl font-semibold text-[var(--color-text-1)]">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 py-5 gap-3">
        {!isLoading?
        data.map((item, index) => (
          <DashCard
            key={index}
            title={item.title}
            value={dashboardData?.data[item.name] || item.value}
            icon={item.icon}
            isLoading={isLoading}
          />
        )): <div>Loading...</div>}
      </div>
    </div>
  );
};

export default Dashboard;
