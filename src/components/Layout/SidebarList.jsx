import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { ALL_SIDEBAR_LIST, SIDEBAR_LIST_BY_ROLE } from "./sidebarConstants";
import { Disclosures } from "../Common/Disclosures";
import { GoDotFill } from "react-icons/go";

export const SidebarList = (props) => {
  const {
    contianerClass = "",
    list = false,
    handleTabClick,
    isSidebarExpanded,
    pathName,
  } = props;

  const [sidebarList, setSidebarList] = useState([]);

  const sidebarListRef = useRef(null);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    let tempList = [];
    (list ? [list] : SIDEBAR_LIST_BY_ROLE[user.role.name]).forEach(
      (sidebar) => {
        const matchedSidebar = ALL_SIDEBAR_LIST.filter(
          (x) => x.path === sidebar.name && !/^-/.test(x.name)
        )[0];

        if (sidebar.parent && matchedSidebar) {
          let parentSidebarIndex = tempList.findIndex(
            (x) => x.id === sidebar.parent
          );

          let parentSidebar = tempList[parentSidebarIndex];
          if (parentSidebar?.subMenus) {
            parentSidebar.subMenus.push(matchedSidebar);
          } else {
            parentSidebar = { ...parentSidebar, subMenus: [matchedSidebar] };
          }
          tempList[parentSidebarIndex] = parentSidebar;
        } else if (matchedSidebar) {
          matchedSidebar.id = sidebar.id;
          tempList.push(matchedSidebar);
        }
      }
    );

    setSidebarList(tempList);
  }, []);

  return (
    <div
      ref={sidebarListRef}
      className={twMerge(
        "flex flex-col pb-5 h-full max-h-[calc(100vh-100px)] overflow-hidden overflow-y-auto hide-scrollbar",
        contianerClass
      )}
    >
      {Array.isArray(sidebarList) &&
        sidebarList?.map(({ Icon, ...heading }, index) => {
          const isActive =
            pathName.split("/")[pathName.split("/").length - 1] ===
            heading.path;

          const isSubMenuActive = heading.subMenus?.some(
            (subMenu) =>
              pathName.split("/")[pathName.split("/").length - 1] ===
              subMenu.path
          );

          const isParentMenu = heading.subMenus;

          const ListComponent = () => {
            return (
              <div className="p-2 py-0">
                <div
                  key={index}
                  onClick={() => !isParentMenu && handleTabClick(heading.path)}
                  className={twMerge(
                    `flex items-center justify-start gap-2 bg-[var(--color-sidebar)] text-[var(--color-text-2)]
                    text-md p-3 cursor-pointer rounded-md w-full border- border-[var(--color-border-1)]`,
                    !isSidebarExpanded &&
                      "justify-start text-nowrap gap-x-10 ps-2",
                    (isActive || (isSubMenuActive && !isSidebarExpanded)) &&
                      "text-[var(--color-text-active)] bg-[var(--color-header)]"
                  )}
                >
                  {Icon && (
                    <div>
                      <Icon
                        className={twMerge(
                          "size-6 stroke-[var(--color-text-2)] text-transparent",
                          (isActive ||
                            (isSubMenuActive && !isSidebarExpanded)) &&
                            "text-[var(--color-text-active)] stroke-transparent"
                        )}
                      />
                    </div>
                  )}
                  {heading.name}
                </div>
              </div>
            );
          };

          return isParentMenu ? (
            <Disclosures
              key={index}
              parentRef={sidebarListRef}
              buttonClass="pe-5 cursor-pointer"
              {...{ HeadingComponent: ListComponent }}
            >
              <div className="flex flex-col h-fit">
                {heading.subMenus.map((subMenu, subIndex) => {
                  const activeSubMenu =
                    pathName.split("/")[pathName.split("/").length - 1] ===
                    subMenu.path;

                  return (
                    <div key={subIndex} className="p-2 py-1">
                      <div
                        onClick={() => handleTabClick(subMenu.path)}
                        className={twMerge(
                          `flex rounded-md items-center justify-start gap-2 
                            text-md p-2 cursor-pointer w-full bg-[var(--color-sidebar)] gap-2`,
                          "justify-start text-nowrap gap-3 ps-10",
                          activeSubMenu &&
                            "text-[var(--color-text-active)] bg-[var(--color-header)]"
                        )}
                      >
                        <GoDotFill className="size-4" />
                        <span className="w-[90%] text-wrap">
                          {subMenu.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Disclosures>
          ) : (
            <ListComponent key={index} />
          );
        })}
    </div>
  );
};
