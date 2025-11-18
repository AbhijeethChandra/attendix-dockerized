import { useStepper } from "@/hooks/useStepper";
import React, { useState } from "react";
import { CommonInput } from "./CommonInput";
import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import CardIcon from "@/assets/icons/card.svg?react";
import SelectMarkIcon from "@/assets/icons/select_mark.svg?react";
import BankIcon from "@/assets/icons/bank.svg?react";
import BankTransferIcon from "@/assets/icons/bank_transfer.svg?react";
import UpiIcon from "@/assets/icons/upi.svg?react";
import { twMerge } from "tailwind-merge";

const tabs = [
  { Icon: CardIcon, name: "Card", tab: "CARD" },
  { Icon: BankIcon, name: "Bank", tab: "BANK" },
  { Icon: BankTransferIcon, name: "Transfer", tab: "BANK_TRANSFER" },
  { Icon: UpiIcon, name: "UPI", tab: "UPI" },
];

export const ApprovePayments = (props) => {
  const { handleCloseModal } = props;

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTab, setSelectedTab] = useState("CARD");

  const { Stepper, goToNextStep, goToPreviousStep } = useStepper({
    steps: [
      { heading: "Basic Information", subHeading: "Personal info" },
      { heading: "Personal info", subHeading: "Personal info" },
    ],
    currentStep: currentStep,
    setCurrentStep: setCurrentStep,
  });

  return (
    <div className="flex flex-col gap-x-5 h-full min-w-[calc(100vw-70rem)]">
      <Stepper />

      {currentStep === 1 ? (
        <div className="p-5 grid grid-cols-1 grid-rows-[1fr_auto] justify-between h-full overflow-y-auto">
          <div className="flex flex-col">
            <h1 className="font-semibold text-xl">
              Review the Storage & Duration Selected by Project Manager
            </h1>
            <div className="flex pt-5 gap-5">
              <CommonInput
                type="select"
                labelClass="text-md font-semibold"
                inputClass="bg-[var(--color-bg-4)]"
                label="Estimated Duration Selected"
                defaultselectvalue="4 Months"
                options={[]}
              />
              <CommonInput
                type="select"
                labelClass="text-md font-semibold"
                inputClass="bg-[var(--color-bg-4)]"
                label="Storage Selected"
                defaultselectvalue="10 TB"
                options={[]}
              />
            </div>

            <div className="space-x-3 pt-5">
              <span className="font-bold">Whats Included:</span>
              <span className="text-[var(--color-text-5)] font-bold">
                AeroDIT, AeroCloud
              </span>
            </div>

            <button className="button-1 button-3 flex items-center w-full gap-x-5 py-2 px-3 rounded-md mt-5">
              <span className="text-xl">Estimated Storage Cost:</span>
              <div>
                <p className="text-xl">₹ 1,20,000/-</p>
                <p className="text-xs">(GST Charges Extra.)</p>
              </div>
            </button>

            <div className="py-5 flex gap-3 border-b border-[var(--color-border-1)]">
              <Checkbox
                checked={true}
                onChange={() => {}}
                className="group block size-6 rounded-xs bg-transparent border data-checked:bg-[#72B7F9] data-checked:border-none"
              >
                <CheckIcon className="text-[var(--color-icon-1)]" />
              </Checkbox>
              Pay Monthly
            </div>
            <div className="pt-5 space-y-4 h-fit">
              <p className="font-semibold text-xl">Payment Frequency</p>
              <p className="text-[var(--color-text-active)]">
                Today: ₹ 30,000.00
              </p>
              <p>12/Sept/2025: ₹ 30,000.00</p>
              <p>12/Oct/2025: ₹ 30,000.00</p>
              <p>12/Oct/2025: ₹ 30,000.00</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={goToNextStep} className="button-1 rounded px-3 py-2">
              Pay & Approve
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[190px_1fr] grid-rows-1 h-full overflow-hidden">
          <div className="bg-[var(--color-bg-1)] flex flex-col">
            <div className="text-center py-2 pt-4 border-b-3 font-bold border-[var(--color-border-1)]">
              PAY WITH
            </div>

            {tabs.map(({ Icon, ...tab }, index) => (
              <div
                key={index}
                onClick={() => setSelectedTab(tab.tab)}
                className={twMerge(
                  "flex justify-between items-center cursor-pointer py-4 px-3 border-b-3 border-[var(--color-border-1)]",
                  selectedTab == tab.tab && "text-[var(--color-text-active-3)]"
                )}
              >
                <span className="flex gap-2">
                  <Icon className="size-6" />
                  {tab.name}
                </span>
                {selectedTab === tab.tab && (
                  <SelectMarkIcon className="size-3" />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2 flex-col justify-between p-5 h-full overflow-y-auto">
            <div className="pt-3 space-y-3">
              <h1 className="text-xl font-semibold">Payment Needed</h1>
              <div className="grid grid-cols-2 gap-y-3 pb-5 border-b border-[var(--color-border-1)]">
                <div className="space-y-2">
                  <p className="text-sm">Storage Initial Payment:</p>
                  <p className="text-xl font-semibold">₹ 30,000.00</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">GST(18%)</p>
                  <p className="text-xl font-semibold">₹ 5,400.00</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">Total to Pay</p>
                  <p className="text-xl font-semibold">₹ 35,400.00</p>
                </div>
              </div>

              <h1 className="text-xl font-semibold pt-3">
                Enter Your Card Details To Pay
              </h1>
              <div className="grid grid-cols-2 grid-row-3 gap-5 pt-2">
                <div className="rounded-md border border-[var(--color-border-1)] p-2 col-span-2">
                  <span>CARD NUMBER</span>
                  <CommonInput
                    type="text"
                    inputClass="outline-none p-0"
                    placeholder="8863 3387 4678 2312"
                  />
                </div>
                <div className="rounded-md border border-[var(--color-border-1)] p-2">
                  <span>CARD EXPIRY</span>
                  <CommonInput
                    type="text"
                    inputClass="outline-none p-0"
                    placeholder="03 / 31"
                  />
                </div>
                <div className="rounded-md border border-[var(--color-border-1)] p-2">
                  <span>CVV</span>
                  <CommonInput
                    type="text"
                    inputClass="outline-none p-0"
                    placeholder="853"
                  />
                </div>
                <div className="rounded-md border border-[var(--color-border-1)] p-2 col-span-2">
                  <span>Name on the Card</span>
                  <CommonInput
                    type="text"
                    inputClass="outline-none p-0"
                    placeholder="Remeshan S M"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleCloseModal}
              className="button-1 p-3 w-full rounded-md"
            >
              Pay ₹ 35,400.00
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
