import { MdCoPresent } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import { FaUserSlash } from "react-icons/fa";
import { LuUserX } from "react-icons/lu";
import { RiUser2Fill } from "react-icons/ri";
import { DashCard } from "./components/DashCard";
import {
  useGetDashboardCountsForAllQuery,
  useGetDashboardCountsQuery,
} from "@/app/rtkQueries/dashboardApi";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import { HeadingComp } from "@/components/Common/HeadingComp";

const DASHBOARD_CARD_ITEMS = [
  {
    title: "Total Employees",
    name: "totalEmployees",
    path: "/employee-wise-report",
    value: "0",
    icon: FaUsersLine,
  },
  {
    title: "Present Today",
    name: "presentToday",
    path: "/day-wise-report",
    value: "0",
    icon: MdCoPresent,
  },
  {
    title: "Absent Today",
    name: "absentToday",
    path: "/leave-report",
    value: "0",
    icon: FaUserSlash,
  },
  {
    title: "Attendance Requests",
    name: "punchRequestToday",
    path: "/attendance-request",
    value: "0",
    icon: LuUserX,
  },
  {
    title: "Leave Requests",
    name: "leaveRequest",
    path: "/leave-request",
    value: "0",
    icon: RiUser2Fill,
  },
];

export const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  //if office is selected
  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useGetDashboardCountsQuery(
    user?.tenant_id && office?.id
      ? { officeId: office?.id ? office.id : null, tenantId: user.tenant_id }
      : skipToken
  );

  //if all offices
  const {
    data: dashboardData2,
    isLoading: isLoading2,
    isError: isError2,
  } = useGetDashboardCountsForAllQuery(
    user?.tenant_id && !office?.id ? user.tenant_id : skipToken
  );

  const data = !office?.id ? dashboardData2?.data : dashboardData?.data;

  return (
    <div>
      <HeadingComp heading="Dashboard" hideSearch={true} iconToShow={[]} />

      <div className="grid grid-cols-4 pb-5 gap-3">
        {!isLoading && !isLoading2 ? (
          DASHBOARD_CARD_ITEMS?.map((item, index) => (
            <DashCard
              key={index}
              title={item.title}
              value={data ? data[item?.name] || item.value : item.value}
              icon={item.icon}
              isLoading={isLoading || isLoading2}
              path={item.path}
            />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
