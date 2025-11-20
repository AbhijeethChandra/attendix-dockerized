import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

export const Modal = ({
  children,
  dialogTitleClass,
  dialogTitle,
  isOpen,
  onClose,
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
        onClose={onClose}
      >
        <DialogBackdrop className="fixed inset-0 bg-white/10" />
        <div
          className={twMerge(
            "fixed inset-0 flex w-screen items-center justify-center p-4",
            backdropChildClass,
            isOpen
              ? "bg-[var(--color-modal-backdrop-bg)]/10"
              : "bg-[var(--color-modal-backdrop-bg)]/0"
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
                "w-full rounded-md bg-[var(--color-bg-2)] duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 overflow-hidden",
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
                  <XCircleIcon
                    onClick={onClose}
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
