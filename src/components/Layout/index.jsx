import { useEffect } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar.jsx";
import { twMerge } from "tailwind-merge";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "@/app/features/theme/themeSlice";
import { Header } from "./Header.jsx";

export const Layout = (props) => {
  const { outletClass, collapsSidebar = false } = props;

  const dispatch = useDispatch();

  useEffect(() => handleSidebar(), [collapsSidebar]);

  const handleSidebar = () => {
    if (collapsSidebar) dispatch(toggleSidebar("COLLAPSE"));
  };

  return (
    <div className="bg-[var(--color-bg-1)] h-screen w-full flex">
      <Sidebar hideList={collapsSidebar} />
      <div className={twMerge("h-[100vh] flex flex-col overflow-hidden w-full", outletClass)}>
        <Header />
        <div
          className={twMerge(
            "flex-1overflow-hidden overflow-y-auto w-full p-5"
          )}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
