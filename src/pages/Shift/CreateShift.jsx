import { Modal } from "@/components/Common/Modal";
import { CommonInput } from "@/components/Common/CommonInput";
import { ToggleSwitch } from "@/components/Common/ToggleSwitch";
import { useEffect, useState } from "react";
import { CommonRadio } from "@/components/Common/CommonRadio";
import { MdAdd, MdRemoveCircle } from "react-icons/md";
import {
  useCreateShiftMutation,
  useUpdateShiftMutation,
} from "@/app/rtkQueries/shiftApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const INITIAL_DETAILS = {
  shiftName: "",
  shiftFrom: "",
  shiftTo: "",
  breakTime: "",
  workingTime: "",
  defineBreakTime: "N",
  shiftMargin: "N",
  shiftStartMargin: "",
  shiftEndMargin: "",
  graceMargin: "",
  shiftType: "FIXED",
  overNightShift: false,
  halfDayMinutes: "",
  fullDayMinutes: "",
  shiftBreaks: [
    {
      breakStartFrom: "",
      breakEnd: "",
    },
  ],
};

export const CreateShift = (props) => {
  const { isOpen, onClose, refetch } = props;
  const [details, setDetails] = useState(INITIAL_DETAILS);

  const user = useSelector((state) => state.auth.user);
  const office = useSelector((state) => state.auth.office);

  //mutations
  const [createApi, createApiRes] = useCreateShiftMutation();
  const [editApi, editApiRes] = useUpdateShiftMutation();

  useEffect(() => {
    if (typeof isOpen === "object" && isOpen !== null) {
      setDetails({
        ...isOpen,
        defineBreakTime: isOpen.shiftBreaks?.length ? "Y" : "N",
        shiftMargin: isOpen.graceMargin ? "Y" : "N",
        shiftBreaks: isOpen.shiftBreaks?.length
          ? isOpen.shiftBreaks
          : [
              {
                breakStartFrom: "",
                breakEnd: "",
              },
            ],
      });
    } else {
      setDetails(INITIAL_DETAILS);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e?.target || {};
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = ({ name, value = false }) => {
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddBreakTime = () => {
    const inputData = details?.shiftBreaks[0];

    if (!inputData?.breakStartFrom || !inputData?.breakEnd)
      return toast(
        "Please fill in the break time fields before adding a new one.",
        {
          style: {
            background: "var(--color-bg-warning)",
            color: "var(--color-text-1)",
          },
        }
      );

    setDetails((prev) => ({
      ...prev,
      shiftBreaks: [
        {
          breakStartFrom: "",
          breakEnd: "",
        },
        ...prev.shiftBreaks,
      ],
    }));
  };

  const handleRemoveBreakTime = (index) => {
    let tempShiftBreaks = [...details.shiftBreaks];
    tempShiftBreaks.splice(index, 1);

    setDetails((prev) => ({
      ...prev,
      shiftBreaks: tempShiftBreaks,
    }));
  };

  const handleChangeBreakTime = (index, field, value) => {
    const updatedBreaks = details.shiftBreaks.map((breakTime, i) =>
      i === index ? { ...breakTime, [field]: value } : breakTime
    );
    setDetails((prev) => ({
      ...prev,
      shiftBreaks: updatedBreaks,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempShiftBreaks = [];
    try {
      if (details?.shiftBreaks?.length) {
        tempShiftBreaks = details?.shiftBreaks
          .filter((y) => y.breakStartFrom && y.breakEnd)
          .map((x) => ({
            ...x,
            tenantId: user.tenant_id,
            active: "Y",
          }));
      }

      const submitData = {
        ...details,
        shiftBreaks: tempShiftBreaks,
        tenantId: user.tenant_id,
        officeId: office.id,
        active: "Y",
      };

      if (details.id) await editApi(submitData).unwrap();
      else await createApi(submitData).unwrap();
      setDetails(INITIAL_DETAILS);
      refetch();
      onClose();
      toast.success(`Office ${details.id ? "updated" : "created"} successfully`);
    } catch (err) {
      console.log("Error creating Office:", err);
    }
  };

  return (
    <Modal
      {...{
        isOpen: Boolean(isOpen),
        onClose,
        dialogTitle: "Add Shift",
        panelClass: "w-[calc(100vw-20vw)]",
        backdropChildClass: "min-h-screen flex items-start justify-end px-3 ",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-5 py-5 min-h-[calc(100vh-5rem)]"
      >
        <div className="flex-1 space-y-5 px-5">
          {/* First Row - 5 columns */}
          <div className="grid grid-cols-4 gap-4">
            <CommonInput
              label="Shift Name"
              required
              type="text"
              placeholder="Enter Shift Name"
              name="shiftName"
              onChange={handleChange}
              value={details.shiftName}
            />
            <CommonInput
              type="time"
              required
              label="Shift From"
              format="24"
              placeholder="Enter Shift From"
              name="shiftFrom"
              onChange={handleChange}
              value={details.shiftFrom}
            />
            <CommonInput
              type="time"
              required
              label="Shift To"
              placeholder="Enter Shift To"
              name="shiftTo"
              onChange={handleChange}
              value={details.shiftTo}
            />
            <CommonInput
              type="number"
              required
              label="Break Time"
              placeholder="In minutes"
              name="breakTime"
              onChange={handleChange}
              value={details.breakTime}
            />
            <CommonInput
              type="number"
              required
              label="Working Hours"
              placeholder="In Hour"
              name="workingTime"
              onChange={handleChange}
              value={details.workingTime}
            />
            <CommonInput
              type="number"
              required
              label="Half Day Minutes"
              placeholder="In minutes"
              name="halfDayMinutes"
              onChange={handleChange}
              value={details.halfDayMinutes}
            />
            <CommonInput
              type="number"
              required
              label="Full Day Minutes"
              placeholder="In minutes"
              name="fullDayMinutes"
              onChange={handleChange}
              value={details.fullDayMinutes}
            />
          </div>

          {/* Second Row - 3 columns with boxes */}
          <div className="grid grid-cols-5 gap-4">
            {/* Define Break Time Box */}
            <div className="border col-span-2 border-[var(--color-border-2)] rounded-lg p-4 space-y-4 bg-[var(--color-bg-2)]">
              <div className="space-y-3">
                <label className="font-medium block">Define Break Time?</label>
                <CommonRadio
                  name="defineBreakTime"
                  value={details.defineBreakTime}
                  onChange={(value) =>
                    handleToggle({ value, name: "defineBreakTime" })
                  }
                  radios={[
                    { value: "Y", label: "Yes" },
                    { value: "N", label: "No" },
                  ]}
                />
              </div>

              {details.defineBreakTime === "Y" && (
                <div className="space-y-3 max-h-38 overflow-y-auto pb-2">
                  {details.shiftBreaks.map((breakTime, index) => {
                    const isFirst = index === 0;

                    const Icon = isFirst ? MdAdd : MdRemoveCircle;

                    return (
                      <div key={index} className="flex gap-2 items-end">
                        <CommonInput
                          type="time"
                          name="breakStartFrom"
                          label={isFirst ? `Break Start` : false}
                          value={breakTime.breakStartFrom}
                          onChange={(e) =>
                            handleChangeBreakTime(
                              index,
                              "breakStartFrom",
                              e.target.value
                            )
                          }
                        />
                        <CommonInput
                          type="time"
                          name="breakEnd"
                          label={isFirst ? `Break End` : false}
                          value={breakTime.breakEnd}
                          onChange={(e) =>
                            handleChangeBreakTime(
                              index,
                              "breakEnd",
                              e.target.value
                            )
                          }
                        />

                        <Icon
                          onClick={() =>
                            isFirst
                              ? handleAddBreakTime()
                              : handleRemoveBreakTime(index)
                          }
                          className="size-9.5 w-[66px] cursor-pointer p-2 rounded-sm text-[var(--color-icon-1)] bg-[var(--color-header)]"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Shift Margin Box */}
            <div className="border col-span-2 border-[var(--color-border-2)] rounded-lg p-4 space-y-4 bg-[var(--color-bg-2)]">
              <div className="space-y-3">
                <label className="font-medium block">Shift Margin</label>
                <CommonRadio
                  name="shiftMargin"
                  value={details.shiftMargin}
                  onChange={(value) =>
                    handleToggle({ value, name: "shiftMargin" })
                  }
                  radios={[
                    { value: "Y", label: "Yes" },
                    { value: "N", label: "No" },
                  ]}
                />
              </div>

              {details.shiftMargin === "Y" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <CommonInput
                      onChange={handleChange}
                      value={details.shiftStartMargin}
                      type="number"
                      label="Start Margin"
                      placeholder="In Minutes"
                      name="shiftStartMargin"
                    />
                    <CommonInput
                      onChange={handleChange}
                      value={details.shiftEndMargin}
                      type="number"
                      label="End Margin"
                      placeholder="In Minutes"
                      name="shiftEndMargin"
                    />
                  </div>
                  <CommonInput
                    onChange={handleChange}
                    value={details.graceMargin}
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
                  className="flex-col"
                  name="shiftType"
                  value={details.shiftType}
                  onChange={(value) =>
                    handleToggle({ value, name: "shiftType" })
                  }
                  radios={[
                    { value: "ROTATIONAL", label: "Rotational" },
                    { value: "FIXED", label: "Fixed" },
                  ]}
                />
              </div>

              <div className="pt-2 border-t border-[var(--color-border-2)]">
                <div className="flex gap-2 flex-wrap items-center justify-between">
                  <label className="font-medium">Night Shift</label>
                  <ToggleSwitch
                    value={details.overNightShift}
                    onChange={(value) =>
                      handleToggle({ value, name: "overNightShift" })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="w-full flex gap-3 px-5 pt-3 border-t border-[var(--color-border-2)]">
          <button
            type="reset"
            onClick={() => setDetails(INITIAL_DETAILS)}
            className="button-1 w-full button-3 rounded-md py-2 px-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createApiRes.isLoading || editApiRes.isLoading}
            className="button-1 w-full rounded-md py-2 px-4 bg-blue-600 text-white hover:bg-blue-700"
          >
            {details.id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
