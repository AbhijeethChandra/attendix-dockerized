import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";
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
    onChange,
    ...rest
  } = props;

  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((data) => {
          return data.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className={labelClass}>{label}</label>}

      <Combobox value={value} onChange={onChange} onClose={() => setQuery("")}>
        <div
          className={twMerge(
            "flex items-center border border-[var(--color-border-input)] rounded-md px-1 w-full py-1.5",
            containerClass
          )}
        >
          <ComboboxButton className="flex items-center">
            <MagnifyingGlassIcon
              className={twMerge(
                "size-6 text-[var(--color-text-2)] mr-2",
                iconClass
              )}
            />
          </ComboboxButton>
          <ComboboxInput
            className={twMerge("flex-1 w-full outline-none", inputClass)}
            displayValue={(data) =>
              options.find((opt) => opt.value === data)?.name
            }
            placeholder={placeholder || "Search..."}
            onChange={(event) => setQuery(event.target.value)}
            {...rest}
          />

          <ComboboxOptions
            anchor="bottom"
            transition
            className={twMerge(
              "w-(--input-width) mt-2 rounded-lg shadow-lg bg-white p-1 empty:invisible",
              "transition duration-100 ease-in data-leave:data-closed:opacity-0"
            )}
          >
            {filteredOptions.map((data) => (
              <ComboboxOption
                key={data.value}
                value={data.value}
                className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1 select-none data-focus:bg-[var(--color-hover)]/10"
              >
                <div className="text-sm/6 text-black">{data.name}</div>
                <CheckIcon className="invisible size-4 fill-[var(--color-icon-2)] group-data-selected:visible" />
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
};
