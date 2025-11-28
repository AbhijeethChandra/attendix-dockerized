import React, { useState } from "react";
import { Modal } from "../Common/Modal";
import { CommonInput } from "../Common/CommonInput";
import { useResetPasswordMutation } from "@/app/rtkQueries/authApi";
import { useSelector } from "react-redux";

const INITIAL_DETAILS = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export const ChangePassword = (props) => {
  const { isOpen, onClose } = props;
  const [details, setDetails] = useState(INITIAL_DETAILS);
  const [error, setError] = useState("");

  const user = useSelector((state) => state.auth.user);

  const [resetPasswordApi, { isLoading }] = useResetPasswordMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(false);
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (details.newPassword !== details.confirmNewPassword) {
      setError("New Password and Confirm New Password do not match");
      return;
    }
    const submitData = {
      username: user.username,
      oldPassword: details.currentPassword,
      newPassword: details.newPassword,
    };

    await resetPasswordApi(submitData).unwrap();

    setError("");
    setDetails(INITIAL_DETAILS);
    onClose();
    taost
  };

  return (
    <Modal
      {...{
        isOpen: Boolean(isOpen),
        onClose,
        dialogTitle: "Change Password",
        panelClass: "w-[calc(100vw-70vw)]",
        backdropChildClass: "min-h-screen flex items-center px-4",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-5 px-8 p-5 overflow-y-auto flex flex-col"
      >
        <CommonInput
          name="currentPassword"
          value={details.currentPassword}
          onChange={handleChange}
          label="Current Password"
          type="password"
          required
        />
        <CommonInput
          name="newPassword"
          value={details.newPassword}
          onChange={handleChange}
          label="New Password"
          type="password"
          required
        />
        <CommonInput
          name="confirmNewPassword"
          value={details.confirmNewPassword}
          onChange={handleChange}
          label="Confirm New Password"
          type="password"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          className="button-1 px-4 py-2 rounded"
          type="submit"
          disabled={isLoading}
        >
          Change Password
        </button>
      </form>
    </Modal>
  );
};
