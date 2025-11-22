import { Switch } from "@headlessui/react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const ToggleSwitch = (props) => {
  const { buttonStyle, value, onChange } = props;

  // Default sizes if not passed
  const width = buttonStyle?.width ? parseInt(buttonStyle.width) : 44;
  const height = buttonStyle?.height ? parseInt(buttonStyle.height) : 24;

  // Define padding and calculate circle size and translation
  const padding = 2.5; // padding inside the switch container
  const circleSize = height - padding * 2.5; // circle diameter
  const translateX = value ? width - height + 2 : 3; // move the circle within the container

  return (
    <div
      className="flex"
      style={buttonStyle ? buttonStyle : { width: "44px", height: "24px" }}
    >
      <Switch
        checked={value}
        onChange={onChange}
        className={twMerge(
          `relative inline-flex h-full w-full items-center border border-[var(--color-toggle-border)] 
            rounded-full transition-colors duration-200 bg-[var(--color-toggle-bg)] `,
          value && "bg-[var(--color-toggle-bg-active)]"
        )}
      >
        <span
          style={{
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            transform: `translateX(${translateX}px)`,
            transition: "transform 0.2s ease",
          }}
          className={twMerge(
            "bg-[var(--color-toggle-button)] rounded-full",
            value ? "bg-[var(--color-toggle-button-active)]" : ""
          )}
        />
      </Switch>
    </div>
  );
};
