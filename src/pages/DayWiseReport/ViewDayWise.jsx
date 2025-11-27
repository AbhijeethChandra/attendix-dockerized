import { Modal } from "@/components/Common/Modal";
import dayjs from "@/utils/dayjs";
import React, { useEffect, useState } from "react";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";

export const ViewDayWise = (props) => {
  const { isOpen, onClose, data } = props;
  const [checkInLocation, setCheckInLocation] = useState("");
  const [checkOutLocation, setCheckOutLocation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLocation();
  }, [data]);

  const getLocation = async () => {
    setLoading(true);
    try {
      const resp = await fetch(
        "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
          data.checkInLatitude +
          "&lon=" +
          data.checkInLongitude +
          "&zaddressdetails=1"
      );
      const resp2 = await fetch(
        "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
          data.checkOutLatitude +
          "&lon=" +
          data.checkOutLongitude +
          "&zaddressdetails=1"
      );
      const value = await resp.json();
      const value2 = await resp2.json();
      setCheckInLocation(
        `${value.display_name}`
      );
      setCheckOutLocation(
        `${value2.display_name}`
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      {...{
        isOpen: Boolean(isOpen),
        onClose,
        dialogTitle: "Day Wise Report Details",
        panelClass: "max-w-[calc(100vw-50vw)]",
        backdropChildClass: "min-h-screen flex items-start px-4",
      }}
    >
      <div className="h-[calc(100vh-5rem)] w-full flex flex-col gap-5 px-5 py-3 overflow-y-auto flex flex-col">
        <div className="grid gap-y-3 grid-cols-[35%_1fr]">
          <p className="font-medium">Employee</p>
          <p>: {data?.staffName}</p>
          <p className="font-medium">Clock in Location</p>
          <p>: {loading ? "Loading..." : checkInLocation}</p>
          <p className="font-medium">Clock out Location</p>
          <p>: {loading ? "Loading..." : checkOutLocation}</p>
          <p className="font-medium">Office</p>
          <p>: {data?.officeName}</p>
          <p className="font-medium">Department</p>
          <p>: {data?.departmentName}</p>
        </div>

        <div className="border border-[var(--color-border-1)] rounded-md p-3">
          <h3 className="font-semibold mb-3">Shift Details</h3>
          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-md border border-[var(--color-border-1)] bg-[var(--color-bg-1)] p-2">
              <p className="font-medium">Shift From</p>
              <p>{data?.shift?.shiftFrom}</p>
            </div>
            <div className="rounded-md border border-[var(--color-border-1)] bg-[var(--color-bg-1)] p-2">
              <p className="font-medium">Shift To</p>
              <p>{data?.shift?.shiftTo}</p>
            </div>
            <div className="rounded-md border border-[var(--color-border-1)] bg-[var(--color-bg-1)] p-2">
              <p className="font-medium">Start Margin</p>
              <p>{data?.shift?.shiftStartMargin}</p>
            </div>
            <div className="rounded-md border border-[var(--color-border-1)] bg-[var(--color-bg-1)] p-2">
              <p className="font-medium">End Margin</p>
              <p>{data?.shift?.shiftEndMargin}</p>
            </div>
          </div>
        </div>

        <div className="border border-[var(--color-border-1)] rounded-md p-3">
          <h3 className="font-semibold mb-3">Attendance Time</h3>
          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-md border border-[var(--color-border-1)] bg-[var(--color-bg-1)] p-2">
              <p className="font-medium">Clock-in</p>
              <p>
                {data?.checkInTime
                  ? dayjs(data?.checkInTime).format("HH:mm A")
                  : "-"}
              </p>
            </div>
            <div className="rounded-md border border-[var(--color-border-1)] bg-[var(--color-bg-1)] p-2">
              <p className="font-medium">Clock-out</p>
              <p>
                {data?.checkOutTime
                  ? dayjs(data?.checkOutTime).format("HH:mm:ss")
                  : "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-y-3 grid-cols-[35%_1fr]">
          <p className="font-medium">Date</p>
          <p>: {dayjs(data?.date).format("DD MMM YYYY")}</p>
          <p className="font-medium">Working Hours</p>
          <p>: {data?.workingHours}</p>
        </div>

        <h1 className="font-medium">Breaking Hours</h1>
        {data?.breaks?.length ? (
          <div className="flex gap-3 flex-wrap">
            {data.breaks?.map((brk, index) => (
              <div
                key={index}
                className="flex gap-2 flex-nowrap border border-[var(--color-border-1)] rounded-md p-2"
              >
                <div className="flex gap-2 flex-nowrap">
                  <IoMdLogOut className="size-5 text-[var(--color-icon-error)]" />
                  {dayjs(brk.breakInTime).format("HH:mm A")}
                </div>
                <div className="flex gap-2 flex-nowrap">
                  <IoMdLogIn className="size-5 text-[var(--color-icon-success)]" />
                  {dayjs(brk.breakOutTime).format("HH:mm A")}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No breaks</p>
        )}
      </div>
    </Modal>
  );
};
