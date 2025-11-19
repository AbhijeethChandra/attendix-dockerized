import { BellAlertIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { CommonInput } from "../Common/CommonInput";

export const Header = () => {
  return (
    <div className="px-5 h-16 flex justify-between items-center bg-[var(--color-header)]">
      <div className="w-[25%]">
        <CommonInput
          type="select"
          defaultselectvalue="Please choose your company"
          options={[]}
        />
      </div>
      <div className="flex gap-3 items-center">
          <BellAlertIcon className="size-6 cursor-pointer stroke-[var(--color-icon-1)] text-transparent" />
        <div className="flex gap-2 items-center justfy-center">
          <UserCircleIcon className="size-8 cursor-pointer text-[var(--color-icon-1)]" />
          <div className="flex flex-col">
            <span className="font-medium text-[var(--color-text-3)]">Nikhil C R</span>
            <span className="text-xs text-[var(--color-text-3)]">admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};
