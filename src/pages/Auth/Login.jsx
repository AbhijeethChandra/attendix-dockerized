import { useState } from "react";
import logoWithName from "@/assets/icons/Attendix_Tagline.svg";
import { CommonInput } from "@/components/Common/CommonInput";
import { useNavigate } from "react-router";

export const Login = (props) => {
  const { handleSubmit, setShowForgotPassword, isLoading } = props;

  const [details, setDetails] = useState({
    username: "",
    password: "",
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
      <div className="text-center mb-8">
        <img
          className="mx-auto mb-8"
          style={{ width: "180px" }}
          src={logoWithName}
          alt="Attendix Logo"
        />
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Welcome</h1>
        <p className="text-gray-500 text-sm">Please logIn to continue</p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Username
        </label>
        <CommonInput
          name="username"
          required
          value={details.username}
          onChange={handleChange}
          type="text"
          placeholder="Enter your username"
          className="border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Password</label>
        <CommonInput
          name="password"
          required
          value={details.password}
          onChange={handleChange}
          type="password"
          placeholder="Enter your password"
          className="border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div
        onClick={() => navigate("/forgot-password")}
        className="text-right text-sm text-[#1575B2] hover:underline cursor-pointer"
      >
        Forgot Password?
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="bg-[#1575B2] cursor-pointer w-full py-3 rounded-md text-white font-medium hover:bg-[#1575B2]/90 transition disabled:opacity-50"
      >
        {isLoading ? "Logging in..." : "Log in"}
      </button>
      <div className="text-center text-xs text-gray-500 mt-8">
        Powered by
        <br />
        <span className="font-medium">GJ Global IT Ventures</span>
      </div>
    </form>
  );
};
