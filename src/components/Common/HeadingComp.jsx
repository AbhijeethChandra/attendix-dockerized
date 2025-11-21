import { SearchBar } from "./SearchBar";
import { twMerge } from "tailwind-merge";
import {
  Bars3BottomRightIcon,
  FunnelIcon,
  QueueListIcon,
  TableCellsIcon,
} from "@heroicons/react/16/solid";
import { CommonInput } from "./CommonInput";

export const HeadingComp = (props) => {
  const {
    heading,
    subHeading,
    HeadingIcon,
    iconToShow = ["list", "filter", "sort"],
    listType,
    hideSearch = false,
    setListType,
    CreateButton,
    contianerClass = "",
    headingClass = "",
    CreateButtonIcon,
    createButtonText,
    handleButtonClick,
    searchValue,
    onSearchChange,
  } = props;

  const handleListType = (type) => {
    setListType(type);
  };

  return (
    <div
      className={twMerge(
        "flex justify-between items-center mb-4",
        contianerClass
      )}
    >
      <div>
        <h1
          className={twMerge(
            "flex gap-2 items-center text-2xl font-semibold text-[var(--color-text-1)]",
            headingClass
          )}
        >
          {HeadingIcon && <HeadingIcon />}
          {heading}
        </h1>
        <h2 className="text-md text-[var(--color-text-1)]">{subHeading}</h2>
      </div>
      <div className="flex  gap-5">
        <div className="flex items-center gap-4">
          {!hideSearch && (
            <CommonInput
              {...{
                type: "search",
                placeholder: "Search...",
                value: searchValue,
                onChange: onSearchChange,
              }}
            />
          )}
          {listType === "TABLE" && iconToShow.includes("list") ? (
            <span onClick={() => handleListType("GRID")}>
              <QueueListIcon className="size-4 cursor-pointer" />
            </span>
          ) : (
            iconToShow.includes("list") && (
              <span onClick={() => handleListType("TABLE")}>
                <TableCellsIcon className="size-6 cursor-pointer" />
              </span>
            )
          )}
          {iconToShow.includes("filter") && (
            <FunnelIcon className="size-5 cursor-pointer" />
          )}
          {iconToShow.includes("sort") && (
            <Bars3BottomRightIcon className="size-6 cursor-pointer" />
          )}
          {CreateButton && (
            <button className="button-1 px-4 py-2 rounded-md">
              <CreateButton />
            </button>
          )}
        </div>
        {(CreateButtonIcon || createButtonText) && (
          <div
            onClick={handleButtonClick}
            className="button-1 cursor-pointer rounded-md flex"
          >
            {CreateButtonIcon && (
              <div className="flex items-center justify-center p-2 bg-[var(--color-border-3)]">
                <CreateButtonIcon className="size-6" />
              </div>
            )}
            <label className="cursor-pointer w-full px-2 py-1.5 text-center text-md font-semibold font-medium">
              {createButtonText}
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
