import React from "react";

export const DashCard = (props) => {
  const { title, value, icon: Icon, isLoading } = props;
  return (
    <div className="cursor-pointer flex justify-between items-center p-2 rounded-md border border-[var(--color-border-2)] bg-[var(--color-bg-2)] hover:shadow-lg shadow-[black]/10 transition-shadow">
      <div>
        <h2 className="text-md text-[var(--color-text-2)]">{title}</h2>
        <h1 className="text-2xl font-semibold text-[var(--color-text-1)]">
          {value}
        </h1>
      </div>
      <div className="p-1 bg-[var(--color-bg-1)] rounded-full">
        {Icon && <Icon className="size-5 text-[var(--color-icon-2)]" />}
      </div>
    </div>
  );
};
