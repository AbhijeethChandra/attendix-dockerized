import { useState } from "react";
import logoWithName from "@/assets/icons/Attendix_Tagline.svg";
import { CommonInput } from "@/components/Common/CommonInput";
import { useNavigate } from "react-router";

export const ForgotPassword = (props) => {
  const { handleSubmit, setShowForgotPassword, isLoading } = props;

  const [details, setDetails] = useState({
    username: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    handleSubmit(details);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-md flex flex-col gap-6"
    >
      <div className="text-center mb-5">
        <img
          className="mx-auto mb-8"
          style={{ width: "180px" }}
          src={logoWithName}
          alt="Attendix Logo"
        />
        <div className="text-lg">Reset Password</div>
      </div>
      <CommonInput
        name="username"
        label="Username"
        required
        value={details.username}
        onChange={handleChange}
        type="text"
        placeholder="Enter your email or mobile"
      />
      <CommonInput
        name="newPassword"
        label="New Password"
        required
        value={details.newPassword}
        onChange={handleChange}
        type="password"
        placeholder="Enter your new password"
      />
      <CommonInput
        name="confirmPassword"
        label="Confirm Password"
        required
        value={details.confirmPassword}
        onChange={handleChange}
        type="password"
        placeholder="Confirm your new password"
      />
      <div
        onClick={() => navigate("/login")}
        className="text-right text-sm text-[#1575B2] hover:underline cursor-pointer"
      >
        Back to Login
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="button-1 cursor-pointer w-full py-3 rounded-md text-white font-medium transition disabled:opacity-50"
      >
        {isLoading ? "Resetting..." : "Reset Password"}
      </button>
      <div className="text-center text-xs text-gray-500 mt-8">
        Powered by
        <br />
        <span className="font-medium">GJ Global IT Ventures</span>
      </div>
    </form>
  );
};
