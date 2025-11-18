import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { ALL_SIDEBAR_LIST, SIDEBAR_LIST_BY_ROLE } from "./sidebarConstants";
import { Disclosures } from "../Common/Disclosures";

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

  //   const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    let tempList = [];
    (list ? [list] : SIDEBAR_LIST_BY_ROLE["admin"]).forEach((sidebar) => {
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
    });

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
              <div
                key={index}
                onClick={() => !isParentMenu && handleTabClick(heading.path)}
                className={twMerge(
                  `flex items-center justify-start gap-2 bg-[var(--color-bg-2)] text-[var(--color-text-2)]
                    text-md border-b p-2.5 cursor-pointer w-full border-[var(--color-border-1)]`,
                  !isSidebarExpanded &&
                    "justify-start text-nowrap gap-x-10 ps-3",
                  (isActive || isSubMenuActive) &&
                    "border-[var(--color-border-active)] text-[var(--color-text-active)]"
                )}
              >
                {Icon && (
                  <div>
                    <Icon
                      className={twMerge(
                        "size-6 stroke-[var(--color-icon-2)] text-transparent",
                        (isActive || isSubMenuActive) &&
                          "stroke-[var(--color-text-active)]"
                      )}
                    />
                  </div>
                )}
                {heading.name}
              </div>
            );
          };

          return (
            <>
              {isParentMenu ? (
                <Disclosures
                  parentRef={sidebarListRef}
                  iconContainerClass={twMerge(
                    "bg-[var(--color-bg-2)] border-b border-[var(--color-border-1)]",
                    (isActive || isSubMenuActive) &&
                      "border-[var(--color-border-active)]"
                  )}
                  {...{ HeadingComponent: ListComponent }}
                >
                  <div className="flex flex-col h-fit">
                    {heading.subMenus.map((subMenu, subIndex) => {
                      const activeSubMenu =
                        pathName.split("/")[pathName.split("/").length - 1] ===
                        subMenu.path;

                      return (
                        <div
                          key={subIndex}
                          onClick={() => handleTabClick(subMenu.path)}
                          className={twMerge(
                            `flex items-center justify-start gap-2 
                            text-md p-2.5 cursor-pointer w-full bg-[var(--color-bg-4)]`,
                            "justify-start text-nowrap gap-x-10 ps-10",
                            activeSubMenu && "bg-[var(--color-bg-3)]",
                            heading.subMenus.length -1 === subIndex && "pb-5"
                          )}
                        >
                          {subMenu.name}
                        </div>
                      );
                    })}
                  </div>
                </Disclosures>
              ) : (
                <ListComponent />
              )}

              {index === 2 && (
                <hr
                  key={"sub" + index}
                  className="border-[var(--color-border-1)] mb-2"
                />
              )}
            </>
          );
          // });
          // SubHeadings.push(
          //   <hr
          //     key={"sub" + index}
          //     className="border-[var(--color-border-1)] mb-2"
          //   />
          // );
          // return SubHeadings;
        })}
    </div>
  );
};
