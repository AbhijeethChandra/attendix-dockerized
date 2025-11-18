import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { CalendarDaysIcon, EyeSlashIcon } from "@heroicons/react/16/solid";

dayjs.extend(customParseFormat);

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
  ...props
}) => {
  const [passwordType, setPasswordType] = useState("password");

  const handlePasswordVisibility = () =>
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));

  return (
    <div
      style={containerStyle}
      className={twMerge("flex flex-col gap-2 w-full", containerClass)}
    >
      {label && (
        <div className="w-full flex justify-between">
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
          className={twMerge(
            "p-2 py-1.5 py-1.5 bg-[var(--color-bg-2)] outline-1 outline-[var(--color-border-1)] w-full rounded-md text-balance",
            inputClass
          )}
        />
      ) : type === "select" ? (
        <select
          {...props}
          id={props.name}
          className={twMerge(
            "p-2.5 py-1.5 bg-[var(--color-bg-2)] outline-1 outline-[var(--color-border-1)] w-full rounded-md text-balance",
            inputClass
          )}
        >
          <option value="">
            {props.defaultselectvalue || "Select a value"}
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
          className={twMerge(
            "p-2 py-1.5 bg-[var(--color-bg-2)] outline-1 outline-[var(--color-border-1)] w-full rounded-md text-balance",
            inputClass
          )}
        />
      ) : type === "date" ? (
        <DatePicker
          {...props}
          id={props.name}
          format="dd-MM-yyyy"
          value={props.value ? dayjs(props.value, "DD-MM-YYYY") : dayjs()}
          calendarIcon={
            <CalendarDaysIcon className="size-6 cursor-pointer shrink-0" />
          }
          clearIcon={null}
          className={twMerge(
            "date-picker w-full flex items-center justify-between bg-[var(--color-bg-2)] outline-1 outline-[var(--color-border-1)] rounded-md p-2 cursor-pointer",
            inputClass
          )}
        />
      ) : (
        type === "password" && (
          <div className="flex items-center pe-3 gap-2 bg-[var(--color-bg-2)] w-full rounded-md text-balance">
            <input
              type={passwordType}
              {...props}
              className={twMerge(
                "p-2 py-1.5 w-full outline-0 border-0",
                inputClass
              )}
            />
            <EyeSlashIcon
              onClick={handlePasswordVisibility}
              className="size-6 cursor-pointer"
            />
          </div>
        )
      )}
    </div>
  );
};
