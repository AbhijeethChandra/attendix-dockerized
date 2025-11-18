import { BellAlertIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { CommonInput } from "../Common/CommonInput";

export const Header = () => {
  return (
    <div className="px-5 h-16 flex justify-end gap-5 items-center border-b border-[var(--color-border-1)]">
      <div className="w-[25%]">
        <CommonInput type="select" defaultselectvalue="Please choose your company" options={[]} />
      </div>
      <BellAlertIcon className="size-6 cursor-pointer stroke-[var(--color-icon-2)] text-transparent" />
      <div className="flex gap-2 items-center justfy-center">
        <UserCircleIcon className="size-8 cursor-pointer" />
        <div className="flex flex-col">
          <span className="font-medium">Nikhil C R</span>
          <span className="text-xs text-[var(--color-text-2)]">admin</span>
        </div>
      </div>
    </div>
  );
};
