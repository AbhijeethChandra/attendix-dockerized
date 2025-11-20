import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { twMerge } from "tailwind-merge";

export const SearchBar = (props) => {
  const {
    label,
    labelStyle = {},
    labelClass = "",
    containerClass = "",
    inputClass = "",
    iconClass = "",
    placeholder = "Search...",
    searchValue,
    onSearchChange,
  } = props;
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label style={labelStyle} className={labelClass}>
          {label}
        </label>
      )}

      <div
        className={twMerge(
          "flex items-center border border-[var(--color-border-input)] rounded-md px-3 min-w-[350px] w-full py-1.5",
          containerClass
        )}
      >
        <MagnifyingGlassIcon
          className={twMerge(
            "size-6 text-[var(--color-text-2)] mr-2",
            iconClass
          )}
        />
        <input
          type="text"
          value={searchValue}
          onChange={onSearchChange}
          placeholder={placeholder}
          className={twMerge("flex-1 w-full outline-none", inputClass)}
        />
      </div>
    </div>
  );
};
