import { useState } from "react";
import { useStepper } from "../../hooks/useStepper";
import CopyIcon from "/src/assets/icons/copy.svg?react";
import ShareIcon from "/src/assets/icons/share.svg?react";
import FileIcon from "/src/assets/icons/email.svg?react";
import { CommonInput } from "./CommonInput";
import { twMerge } from "tailwind-merge";

export const UserCreate = (props) => {
  const { handleCloseModal } = props;

  const [currentStep, setCurrentStep] = useState(1);

  const { Stepper, goToNextStep, goToPreviousStep } = useStepper({
    steps: [
      { heading: "Basic Information", subHeading: "Personal info" },
      { heading: "Personal info", subHeading: "Personal info" },
    ],
    currentStep: currentStep,
    setCurrentStep: setCurrentStep,
  });

  return (
    <div className="grid grid-rows-[1fr_auto] grid-cols-[550px] gap-5 h-full overflow-x-hidden overflow-y-auto p-5">
      <div className="flex flex-col gap-5">
        <Stepper />

        {currentStep == 1 ? (
          <div className="flex flex-col gap-4">
            <div className="text-[var(--color-text-2)]">
              To get started, fill out some basic information about who you're
              adding as a user.
            </div>

            <CommonInput label="Name" placeholder="Type in name" type="text" />

            <CommonInput
              label="Contact Number"
              placeholder="Enter Contact Number"
              type="text"
            />
            <CommonInput
              label="Email ID"
              placeholder="Type-in email id"
              type="text"
            />
            <CommonInput
              label="Role"
              options={[
                { value: "admin", label: "Admin" },
                { value: "customerSupport", label: "Customer Support" },
                { value: "billingAdmin", label: "Billing Admin" },
              ]}
              defaultselectvalue="Select Role Like:Admin / Customer Support / Billing Admin"
              type="select"
            />
          </div>
        ) : (
          currentStep == 2 && (
            <div>
              <div className="flex flex-col gap-4 border-b border-[var(--color-border-2)] pb-4 mb-5">
                <span className="text-lg font-semibold mb-3">
                  Janaki Raman has been added to the platform.
                </span>

                <div className="flex gap-2">
                  Display Name:{" "}
                  <span className="text-[var(--color-text-2)]">
                    Janaki Raman
                  </span>
                </div>
                <div className="flex gap-2">
                  Email Id:{" "}
                  <span className="text-[var(--color-text-2)]">
                    janakiR@gjglobasloft.com
                  </span>
                </div>
                <div className="flex gap-2">
                  Mobile:{" "}
                  <span className="text-[var(--color-text-2)]">
                    +91 9876543210
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-b border-[var(--color-border-2)] pb-4 mb-5">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    User Name:{" "}
                    <span className="text-[var(--color-text-2)]">
                      janakiR@gjglobasloft.com
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <CopyIcon className="w-5 h-5" />
                    <FileIcon className="w-5 h-5" />
                    <ShareIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-2">
                  Password:{" "}
                  <span className="text-[var(--color-text-2)]">
                    ********{" "}
                    <span className="text-[var(--color-link)]">Show</span>
                  </span>
                </div>
                <span className="text-sm text-[var(--color-text-2)]">
                  The username and password have been sent to the user’s
                  registered email address. They will be prompted to change
                  their password upon first login for security reasons.
                </span>
              </div>
            </div>
          )
        )}
      </div>
      {currentStep == 1 ? (
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 gird-rows-1">
          <div className="col-span-2 text-sm text-[var(--color-text-2)]">
            System will automatically create a password for this user. This user
            need to change their password when they first sign in.
          </div>
          <button
            className={twMerge("button-1 button-2 rounded-md py-2 w-full", currentStep==1&&"invisible")}
            onClick={goToPreviousStep}
          >
            Previous
          </button>
          <button className="button-1 rounded-md py-2 w-full" onClick={goToNextStep}>
            Add User
          </button>
        </div>
      ) : (
        <div className="flex justify-between h-fit">
          <button
            className="button-1 button-2 rounded-md py-2 w-32"
            onClick={handleCloseModal}
          >
            close
          </button>
          <button
            className="button-1 rounded-md py-2 w-fit px-4"
            onClick={goToPreviousStep}
          >
            Add Another User
          </button>
        </div>
      )}
    </div>
  );
};
