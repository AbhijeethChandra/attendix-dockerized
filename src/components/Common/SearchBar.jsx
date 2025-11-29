import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { IoChevronDown } from "react-icons/io5";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

export const SearchBar = (props) => {
  const {
    label,
    labelClass = "",
    containerClass = "",
    inputClass = "",
    iconClass = "",
    placeholder = "Search...",
    options = [],
    value,
    multiple = false,
    onChange,
    optionMenuClass = "",
    className = "",
    multiselectClass = "",
    required = false,
    ...rest
  } = props;

  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((data) => {
          return data?.name?.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className={twMerge("flex flex-col gap-1.5 w-full ", className)}>
      {label && <label className={labelClass}>{label}</label>}

      <Combobox
        multiple={multiple}
        immediate
        value={value}
        onChange={onChange}
        onClose={() => setQuery("")}
        as="div"
        className="relative"
      >
        <div
          className={twMerge(
            "items-center border border-[var(--color-border-input)] rounded-md px-1 py-[5px] w-full overflow-y-auto scrollbar-hidden",
            containerClass
          )}
        >
          <div className="flex gap-2 px-2">
            <ComboboxInput
              required={required && !(multiple && value?.length)}
              className={twMerge(
                "flex-1 outline-none overflow-y-auto",
                inputClass
              )}
              autoComplete="off"
              displayValue={(data) =>
                options.find((opt) => opt.value === data)?.name
              }
              placeholder={placeholder || "Search..."}
              onChange={(event) => setQuery(event.target.value)}
              {...rest}
            />
            <ComboboxButton className="flex-non items-center ">
              <IoChevronDown
                className={twMerge(
                  "size-6 text-[var(--color-text-2)]",
                  iconClass
                )}
              />
            </ComboboxButton>
          </div>

          {value?.length > 0 && (
            <div
              className={twMerge(
                "text-wrap max-h-[55px] overflow-y-auto px-1 pt-1",
                multiselectClass
              )}
            >
              {value.map((data) => (
                <span key={data}>
                  {options.find((opt) => opt.value === data)?.name}, &nbsp;
                </span>
              ))}
            </div>
          )}
        </div>

        <ComboboxOptions
          transition
          className={twMerge(
            "absolute left-0 top-full w-fit max-w-[200px] overflow-x-auto max-h-48 mt-2 rounded-lg shadow-lg bg-white p-1 empty:invisible border border-[var(--color-border-input)] z-[2]",
            "transition duration-100 ease-in data-leave:data-closed:opacity-0",
            optionMenuClass
          )}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((data) => (
              <ComboboxOption
                key={data.value}
                value={data.value}
                className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1 select-none data-focus:bg-[var(--color-hover)]/20"
              >
                <div className="text-sm/6 text-black">{data.name}</div>
                <CheckIcon className="invisible size-4 fill-[var(--color-icon-2)] group-data-selected:visible" />
              </ComboboxOption>
            ))
          ) : (
            <ComboboxOption
              key={undefined}
              value={undefined}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1 select-none data-focus:bg-[var(--color-hover)]/20"
            >
              <div className="text-sm/6 text-black">Not available</div>
              <CheckIcon className="invisible size-4 fill-[var(--color-icon-2)] group-data-selected:visible" />
            </ComboboxOption>
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};
