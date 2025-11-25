import { CommonInput } from "@/components/Common/CommonInput";
import { Modal } from "@/components/Common/Modal";``
import React, { useState } from "react";
import { useSelector } from "react-redux";

const INITIAL_DETAILS = {
  remarks: "",
};

export const LeaveReject = (props) => {
  const { isOpen, onClose, onSubmit, isLoading } = props;
  const [details, setDetails] = useState(INITIAL_DETAILS);

  const user = useSelector((state) => state.auth.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...details,
      action: isOpen.action,
      requestId: isOpen.id,
    });

    setDetails(INITIAL_DETAILS);
  };

  return (
    <Modal
      {...{
        isOpen: Boolean(isOpen),
        onClose,
        dialogTitle: "Leave Reject",
        panelClass: "min-w-[calc(100vw-70vw)]",
        backdropChildClass: "min-h-screen flex items-start justify-end px-4",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="h-[calc(100vh-5rem)] w-full flex flex-col gap-5 px-5 py-3 overflow-y-auto flex flex-col justify-between"
      >
        <CommonInput
          type="text"
          required
          name="remarks"
          value={details.remarks}
          onChange={handleChange}
          label="Reason"
          placeholder={`Enter Reason for ${isOpen?.action?.toLowerCase()}`}
        />

        <div className="w-full flex gap-3">
          <button
            onClick={() => setDetails(INITIAL_DETAILS)}
            type="reset"
            className="button-1 w-full button-3 rounded-md py-1.5 px-3"
          >
            Reset
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className="button-1 w-full rounded-md py-1.5 px-3"
          >
            {"Send"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
