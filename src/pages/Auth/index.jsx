import { useState } from "react";
import logoWithName from "@/assets/icons/Attendix_Tagline.svg";
import { CommonInput } from "@/components/Common/CommonInput";
import { useLoginApiMutation } from "@/app/rtkQueries/authApi";
import { useLogoutAllApiMutation } from "@/app/rtkQueries/authApi";
import { useDispatch } from "react-redux";
import { handleLoginSlice } from "@/app/slice/authSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import loginbg from "@/assets/images/loginbg.jpg";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginApi, { isLoading, isError, data }] = useLoginApiMutation();

  const [logoutAllApi, logoutAllApiResult] = useLogoutAllApiMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    try {
      const resp = await loginApi(loginData).unwrap();
      if (resp.success) {
        const role = resp.data.user.role.name;

        if (!/(Admin|Admin Manager|Super Admin|Manager)/.test(role)) {
          toast.error("You do not have access to this application");
          return;
        }
        dispatch(
          handleLoginSlice({
            user: resp.data.user,
            accessToken: resp.data.accessToken,
            refreshToken: resp.data.refreshToken,
            username: resp.data.user.username,
          })
        );
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      if (err?.data?.message === "Already Loggedin") {
        handleLogoutAllDevices();
      }
    }
  };

  const handleLogoutAllDevices = async () => {
    try {
      const resp = await logoutAllApi({
        username: loginData.username,
      }).unwrap();
      if (resp.success) {
        console.log("Logout from all devices successful:", resp);
        handleLogin();
      }
    } catch (err) {
      console.error("Logout from all devices failed:", err);
    }
  };

  return (
    <div className="h-screen w-full flex">
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center bg-no-repeat bg-[var(--color-bg-1)] rounded-e-[4rem]"
        style={{
          backgroundImage: `url(${loginbg})`,
        }}
      ></div>
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8">
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
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              Welcome
            </h1>
            <p className="text-gray-500 text-sm">Please logIn to continue</p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <CommonInput
              name="username"
              required
              value={loginData.username}
              onChange={handleChange}
              type="text"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <CommonInput
              name="password"
              required
              value={loginData.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* <div className="text-right">
            <a href="#" className="text-sm text-[#1575B2] hover:underline">
              Forgot password?
            </a>
          </div> */}
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
            <span className="font-medium">GJ Globals IT Ventures</span>
          </div>
        </form>
      </div>
    </div>
  );
};
