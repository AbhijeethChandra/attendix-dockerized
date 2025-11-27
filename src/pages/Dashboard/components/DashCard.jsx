import React from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

export const DashCard = (props) => {
  const { title, value, icon: Icon, isLoading, path, iconContainerClass, textClassName, iconClass } = props;

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className={twMerge("cursor-pointer flex justify-between items-center px-6 py-6 rounded-md bg-[var(--color-bg-2)] shadow-[0_3px_15px] shadow-[black]/10 transition-shadow hover:shadow-[0_9px_25px]")}
    >
      <div>
        <h2 className={twMerge("text-md text-[var(--color-text-2)]", textClassName)}>{title}</h2>
        <h1 className="text-2xl font-semibold text-[var(--color-text-1)]">
          {value}
        </h1>
      </div>
      <div className={twMerge("p-2.5 bg-[var(--color-bg-1)] rounded-full", iconContainerClass)}>
        {Icon && <Icon className={twMerge("size-7 text-[var(--color-icon-1)]", iconClass)} />}
      </div>
    </div>
  );
};
