import { Bars3Icon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import logo from "@/assets/icons/Attendix_A.svg";
import logoWithName from "@/assets/icons/Attendix_Logo.svg";
import { toggleSidebar } from "../../app/features/theme/themeSlice";
import { SidebarList } from "./SidebarList";
import { useLocation, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef } from "react";

export const Sidebar = (props) => {
  const { hideList = false } = props;

  const theme = useSelector((state) => state.theme);

  const isSidebarExpanded = theme.sideBar === "EXPANDED";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target))
        handleSidebarToggle("COLLAPSED");
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSidebarToggle = (type) => {
    dispatch(toggleSidebar(type));
  };

  const handleTabClick = (path) => {
    const lastPath = pathName.split("/")[pathName.split("/").length - 1];
    if (path !== lastPath) navigate(path);
  };

  return (
    <div
      ref={sidebarRef}
      style={{
        minWidth: isSidebarExpanded ? "250px" : "55px",
        maxWidth: isSidebarExpanded ? "250px" : "55px",
      }}
      className="bg-[var(--color-sidebar)] h-screen min-w-[250px] flex flex-col justify-between"
    >
      <div
        className={twMerge(
          "bg-[var(--color-sidebar-heading)] cursor-pointer flex justify-between items-center px-4 h-16",
          !isSidebarExpanded && "justify-center p-0"
        )}
        onClick={() => handleSidebarToggle()}
      >
        <img
          style={{
            width: isSidebarExpanded ? "100px" : "25px",
            filter: "brightness(0) invert(1)",
          }}
          src={isSidebarExpanded ? logoWithName : logo}
          alt="mail_logo"
        />
        <Bars3Icon
          style={{ width: isSidebarExpanded ? "15px" : "10px" }}
          className="cursor-pointer text-[var(--color-icon-1)]"
        />
      </div>
      <div
        style={{ boxShadow: "8px 0 12px rgba(0, 0, 0, 0.25)" }}
        className=" flex-1 pt-4 border-r border-[var(--color-border-1)]"
      >
        {!hideList && (
          <SidebarList {...{ isSidebarExpanded, handleTabClick, pathName }} />
        )}
      </div>
    </div>
  );
};
