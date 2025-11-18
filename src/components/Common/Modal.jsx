import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import CloseIcon from "@/assets/icons/close.svg?react";
import { twMerge } from "tailwind-merge";

export const Modal = ({
  children,
  dialogTitleClass,
  dialogTitle,
  isOpen,
  close,
  TitleIcon,
  backdropChildClass,
  panelClass,
}) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <DialogBackdrop className="fixed inset-0 bg-white/10" />
        <div
          className={twMerge(
            "fixed inset-0 flex w-screen items-center justify-center p-4",
            backdropChildClass,
            isOpen ? "bg-white/50" : "bg-white/0"
          )}
        >
          <div
            className={twMerge(
              isOpen ? "translate-x-[-10px]" : "translate-x-full"
            )}
          >
            <DialogPanel
              transition
              className={twMerge(
                "w-full min-w-fit max-w-md rounded-md bg-[var(--color-bg-2)] duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 overflow-hidden",
                panelClass
              )}
            >
              {dialogTitle && (
                <div
                  className={twMerge(
                    "flex rounded-t-md justify-between items-center bg-[var(--color-bg-1)] p-2 px-5",
                    dialogTitleClass
                  )}
                >
                  <div className="flex gap-3 items-center">
                    {TitleIcon && <TitleIcon className="size-6" />}
                    <DialogTitle className="text-xl font-semibold">
                      {dialogTitle}
                    </DialogTitle>
                  </div>
                  <CloseIcon
                    onClick={close}
                    className="size-6.5 cursor-pointer text-[var(--color-icon-2)]"
                  />
                </div>
              )}
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
