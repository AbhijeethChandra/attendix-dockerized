import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import SettingsIcon from "@/assets/icons/three_dots.svg?react";
import { useState } from "react";

export const Tabs = (props) => {
  const {
    tabs,
    tabPanels,
    tabPanelClass,
    tabGroupClass,
    controlledIndex = undefined,
    setControlledIndex = () => {},
    SettingsPopup,
  } = props;

  const [viewSettings, setViewSettings] = useState(false);

  const handleSettingsClick = () => setViewSettings(!viewSettings);

  return (
    <TabGroup
      selectedIndex={controlledIndex}
      onChange={setControlledIndex}
      className={twMerge("p-3 pe-0 pb-0 h-full flex flex-col", tabGroupClass)}
    >
      <TabList className="flex gap-5 border-b border-[var(--color-border-1)] px-3">
        {tabs.map((tab, index) => (
          <Tab key={index} as="div">
            {({ selected }) => (
              <div
                className={twMerge(
                  "border-b-3 pb-2 border-transparent text-[var(--color-text-1)] outline-none cursor-pointer",
                  selected &&
                    "border-[var(--color-border-3)] text-[var(--color-text-active-2)]"
                )}
              >
                {tab}
              </div>
            )}
          </Tab>
        ))}
        {SettingsPopup && (
          // <Tab as="div" className="ml-4">
          // </Tab>
          <div className="relative">
            <SettingsIcon
              className={twMerge("size-6 rotate-90 cursor-pointer", viewSettings && "bg-[var(--color-bg-2)] rounded-t")}
              onClick={handleSettingsClick}
            />

            {viewSettings && <SettingsPopup {...{setViewSettings}} />}
          </div>
        )}
      </TabList>
      <TabPanels className={twMerge("p-3 flex-1", tabPanelClass)}>
        {tabPanels.map((Panels, index) => (
          <TabPanel className="h-full" key={index}>
            <Panels />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};
