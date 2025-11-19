import { Modal } from "@/components/Common/Modal";
import { CommonInput } from "@/components/Common/CommonInput";
import { ToggleSwitch } from "@/components/Common/ToggleSwitch";
import { useState } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { CommonRadio } from "@/components/Common/CommonRadio";

export const CreateShift = (props) => {
  const { isOpen, onClose } = props;
  const [defineBreakTime, setDefineBreakTime] = useState(false);
  const [shiftMarginEnabled, setShiftMarginEnabled] = useState(false);
  const [shiftType, setShiftType] = useState("rotational");
  const [nightShift, setNightShift] = useState(false);

  const handleRadioBreakTime = (value) => {
    setDefineBreakTime(value === "yes" ? true : false);
  };
  const handleRadioshiftMargin = (value) => {
    setShiftMarginEnabled(value === "yes" ? true : false);
  };
  const handleRadioshiftType = (value) => {
    setShiftType(value === "yes" ? true : false);
  };

  return (
    <Modal
      {...{
        isOpen,
        onClose,
        dialogTitle: "Add Shift",
        panelClass: "w-[calc(100vw-30vw)]",
        backdropChildClass: "min-h-screen flex items-start justify-end px-3 ",
      }}
    >
      <div className="w-full flex flex-col gap-5 py-5 min-h-[calc(100vh-5rem)]">
        <div className="flex-1 space-y-5 px-5">
          {/* First Row - 5 columns */}
          <div className="grid grid-cols-4 gap-4">
            <CommonInput
              type="text"
              label="Shift Name"
              placeholder="Enter Shift Name"
              name="shiftName"
            />
            <div className="flex flex-col gap-2">
              <label>Shift From</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Time"
                  className="p-2 py-1.5 bg-[var(--color-bg-2)] outline-1 outline-[var(--color-border-2)] w-full rounded-md pr-10"
                />
                <ClockIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-icon-1)]" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Shift To</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Time"
                  className="p-2 py-1.5 bg-[var(--color-bg-2)] outline-1 outline-[var(--color-border-2)] w-full rounded-md pr-10"
                />
                <ClockIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-icon-1)]" />
              </div>
            </div>
            <CommonInput
              type="number"
              label="Break Time"
              placeholder="In minutes"
              name="breakTime"
            />
            <CommonInput
              type="number"
              label="Working Hours"
              placeholder="In Hour"
              name="workingHours"
            />
          </div>

          {/* Second Row - 3 columns with boxes */}
          <div className="grid grid-cols-3 gap-4">
            {/* Define Break Time Box */}
            <div className="border border-[var(--color-border-2)] rounded-lg p-4 space-y-4 bg-[var(--color-bg-2)]">
              <div className="space-y-3">
                <label className="font-medium block">Define Break Time?</label>
                <CommonRadio
                  value={defineBreakTime ? "yes" : "no"}
                  onChange={handleRadioBreakTime}
                  radios={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>

              {defineBreakTime && (
                <div className="space-y-3">
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <div className="relative">
                        <CommonInput
                          type="text"
                          label="Break Start"
                          placeholder="Time"
                          name="breakStart"
                          inputClass="pr-10"
                        />
                        <ClockIcon className="absolute right-2 bottom-2.5 w-5 h-5 text-[var(--color-icon-1)]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <CommonInput
                          type="text"
                          label="Break End"
                          placeholder="Time"
                          name="breakEnd"
                          inputClass="pr-10"
                        />
                        <ClockIcon className="absolute right-2 bottom-2.5 w-5 h-5 text-[var(--color-icon-1)]" />
                      </div>
                    </div>
                    <button className="button-1 rounded py-1.5 px-3.5">
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Shift Margin Box */}
            <div className="border border-[var(--color-border-2)] rounded-lg p-4 space-y-4 bg-[var(--color-bg-2)]">
              <div className="space-y-3">
                <label className="font-medium block">Shift Margin</label>
                <CommonRadio
                  value={shiftMarginEnabled ? "yes" : "no"}
                  onChange={handleRadioshiftMargin}
                  radios={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>

              {shiftMarginEnabled && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <CommonInput
                      type="number"
                      label="Start Margin"
                      placeholder="In Minutes"
                      name="startMargin"
                    />
                    <CommonInput
                      type="number"
                      label="End Margin"
                      placeholder="In Minutes"
                      name="endMargin"
                    />
                  </div>
                  <CommonInput
                    type="number"
                    label="Grace Margin"
                    placeholder="In Minutes"
                    name="graceMargin"
                  />
                </div>
              )}
            </div>

            {/* Shift Type Box */}
            <div className="border border-[var(--color-border-2)] rounded-lg p-4 space-y-4 bg-[var(--color-bg-2)]">
              <div className="space-y-3">
                <label className="font-medium block">Shift Type</label>
                <CommonRadio
                  value={shiftType ? "yes" : "no"}
                  onChange={handleRadioshiftType}
                  className="flex-col"
                  radios={[
                    { value: "yes", label: "Rotational" },
                    { value: "no", label: "Fixed" },
                  ]}
                />
              </div>

              <div className="pt-2 border-t border-[var(--color-border-2)]">
                <div className="flex gap-2 flex-wrap items-center justify-between">
                  <label className="font-medium">Night Shift</label>
                  <ToggleSwitch
                    checked={nightShift}
                    onChange={() => setNightShift(!nightShift)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="w-full flex gap-3 px-5 pt-3 border-t border-[var(--color-border-2)]">
          <button
            onClick={onClose}
            className="button-1 w-full button-3 rounded-md py-2 px-4"
          >
            Cancel
          </button>
          <button className="button-1 w-full rounded-md py-2 px-4 bg-blue-600 text-white hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};
