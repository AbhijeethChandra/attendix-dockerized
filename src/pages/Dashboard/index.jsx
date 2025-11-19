import { MdCoPresent } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import { FaUserSlash } from "react-icons/fa";
import { LuUserX } from "react-icons/lu";
import { RiUser2Fill } from "react-icons/ri";
import { DashCard } from "./components/DashCard";

const data = [
  {
    title: "Total Employees",
    value: "143",
    icon: FaUsersLine,
  },
  {
    title: "Present Today",
    value: "112",
    icon: MdCoPresent,
  },
  {
    title: "Absent Today",
    value: "2",
    icon: FaUserSlash,
  },
  {
    title: "Attendance Requests",
    value: "6",
    icon: LuUserX,
  },
   {
    title: "Leave Requests",
    value: "3",
    icon: RiUser2Fill,
  },
]

export const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-[var(--color-text-1)]">Dashboard</h1>

      <div className="grid grid-cols-4 py-5 gap-3">
        {data.map((item, index) => (
          <DashCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
