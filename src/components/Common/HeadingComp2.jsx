import React from "react";
import DataIcon from "@/assets/icons/data.svg?react";
import FilterIcon from "@/assets/icons/flask.svg?react";
import ViewTtpeIcon from "@/assets/icons/view_type.svg?react";
import { twMerge } from "tailwind-merge";

export const HeadingComp2 = (props) => {
  const {
    heading,
    iconToShow = ["swap", "filter", "viewType"],
    listType,
    setListType,
    handleButton,
    HeadingIcon,
    CreateButtonIcon,
    createButtonText,
    containerClass,
  } = props;

  const ICONS = [
    {
      Icon: () => <DataIcon className="cursor-pointer size-6" />,
      type: "swap",
    },
    {
      Icon: () => <FilterIcon className="cursor-pointer size-5" />,
      type: "filter",
    },
    {
      Icon: () => <ViewTtpeIcon className="cursor-pointer size-7.5" />,
      type: "viewType",
    },
  ];

  return (
    <div
      className={twMerge(
        "px-3 py-2 flex items-center justify-between rounded-lg bg-[var(--color-bg-4)]",
        containerClass
      )}
    >
      <h1 className="text-xl font-semibold flex gap-2 items-center">
        {HeadingIcon && <HeadingIcon className="size-6" />}
        {heading}
      </h1>
      <div className="flex items-center gap-5">
        {iconToShow.map((type, index) => {
          let ind = ICONS.findIndex((x) => x.type === type);
          let Icon = ICONS[ind].Icon;
          return <Icon key={index} />;
        })}
        {(CreateButtonIcon || createButtonText) && (
          <div
            onClick={handleButton}
            className="cursor-pointer rounded-md border border-[var(--color-border-3)] flex"
          >
            {CreateButtonIcon && (
              <div className="flex items-center justify-center p-2 bg-[var(--color-border-3)]">
                <CreateButtonIcon className="size-6 text-[var(--color-icon-1)]" />
              </div>
            )}
            <label
              onClick={() => setShowUserCreate(true)}
              className="cursor-pointer w-full p-2 text-center  text-white text-md font-semibold font-medium"
            >
              {createButtonText}
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
