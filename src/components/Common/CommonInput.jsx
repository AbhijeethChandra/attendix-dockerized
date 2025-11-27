import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import DatePicker from "react-date-picker";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import {
  CalendarDaysIcon,
  EyeSlashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import { Checkbox } from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";

// CommonInput Component
export const CommonInput = ({
  type = "text",
  label,
  containerStyle = {},
  subLabelStyle = {},
  labelStyle = {},
  inputClass = "",
  labelClass = "",
  containerClass = "",
  errorMessage,
  subLabel,
  searchIconClass = "",
  labelContainerClass,
  ...props
}) => {
  const [passwordType, setPasswordType] = useState("password");

  const handlePasswordVisibility = () =>
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));

  const INPUTCLASS =
    "p-2 py-1.5 bg-[var(--color-bg-2)] text-[var(--color-text-1)] outline-1 outline-[var(--color-border-input)] w-full rounded-md text-balance";

  return (
    <div
      style={containerStyle}
      className={twMerge("flex flex-col gap-2 gap-y-1 w-full", containerClass)}
    >
      {label && (
        <div
          className={twMerge(
            "w-full flex justify-between",
            labelContainerClass
          )}
        >
          <label
            style={labelStyle}
            className={labelClass}
            htmlFor={props?.name}
          >
            {label}
          </label>
          {subLabel && (
            <label style={subLabelStyle} className="text-[var(--color-link)]">
              {subLabel}
            </label>
          )}
        </div>
      )}

      {type.match(/^(text|number|email)$/) ? (
        <input
          type={type}
          {...props}
          id={props.name}
          onInvalid={(e) =>
            errorMessage ? e.target.setCustomValidity(errorMessage) : null
          }
          onInput={(e) => e.target.setCustomValidity("")}
          className={twMerge(INPUTCLASS, inputClass)}
        />
      ) : type === "select" ? (
        <select
          {...props}
          id={props.name}
          className={twMerge(INPUTCLASS, inputClass)}
        >
          <option value="">
            {props.defaultselectvalue || `Select ${label.toLowerCase()}`}
          </option>
          {props.options.map(({ value, label, key }, index) => (
            <option value={value} key={key || index}>
              {label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          rows={4}
          id={props.name}
          {...props}
          className={twMerge(INPUTCLASS, inputClass)}
        />
      ) : type === "date" ? (
        <DatePicker
          {...props}
          id={props.name}
          format="dd-MM-yyyy"
          value={props.value || null}
          calendarIcon={
            <CalendarDaysIcon className="size-6 cursor-pointer shrink-0" />
          }
          clearIcon={null}
          className={twMerge(
            "date-picker w-full flex items-center justify-between bg-[var(--color-bg-2)] outline-1 outline-[var(--color-border-input)] rounded-md p-1.5 cursor-pointer",
            inputClass
          )}
        />
      ) : type === "daterange" ? (
        <DateRangePicker
          {...props}
          id={props.name}
          format="dd-MM-yyyy"
          value={props.value || null}
          calendarIcon={
            <CalendarDaysIcon className="size-6 cursor-pointer shrink-0" />
          }
          clearIcon={null}
          className={twMerge(
            "date-picker w-full z-10 flex items-center justify-between bg-[var(--color-bg-2)] outline-1 outline-[var(--color-border-input)] rounded-md p-1.5 cursor-pointer",
            inputClass
          )}
        />
      ) : type === "password" ? (
        <div className="flex items-center pe-3 gap-2 bg-[var(--color-bg-2)] w-full border border-[var(--color-border-input)] rounded-md text-balance">
          <input
            type={passwordType}
            {...props}
            className={twMerge(
              "p-2 py-1.5 w-full outline-0 border-0 text-[var(--color-text-1)] bg-[var(--color-bg-2)] rounded-md",
              inputClass
            )}
          />
          {passwordType === "password" ? (
            <EyeSlashIcon
              onClick={handlePasswordVisibility}
              className="size-6 cursor-pointer"
            />
          ) : (
            <EyeIcon
              onClick={handlePasswordVisibility}
              className="size-6 cursor-pointer"
            />
          )}
        </div>
      ) : type === "search" ? (
        <div
          className={twMerge(
            "flex items-center border border-[var(--color-border-input)] rounded-md px-3 min-w-[200px] w-full py-1.5",
            containerClass
          )}
        >
          <MagnifyingGlassIcon
            className={twMerge(
              "size-6 text-[var(--color-text-2)] mr-2",
              searchIconClass
            )}
          />
          <input
            {...props}
            type="text"
            id={props.name}
            className={twMerge("flex-1 w-full outline-none", inputClass)}
          />
        </div>
      ) : type === "time" ? (
        <div className="relative w-full">
          <input
            type="time"
            step="1"
            {...props}
            id={props.name}
            className={twMerge(INPUTCLASS, inputClass)}
          />
        </div>
      ) : type === "checkbox" ? (
        <Checkbox
          checked={props.value}
          className="group block size-4.5 rounded cursor-pointer border data-checked:border-0 bg-white data-checked:bg-blue-500"
          id={props.id}
          onChange={props.onChange}
        >
          <FaCheck className="size-4.5 text-white opacity-0 group-data-checked:opacity-100 p-0.5" />
        </Checkbox>
      ) : null}
    </div>
  );
};
