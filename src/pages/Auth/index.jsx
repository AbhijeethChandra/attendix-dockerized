import { useState } from "react";
import logoWithName from "@/assets/icons/Attendix_Tagline.svg";
import { CommonInput } from "@/components/Common/CommonInput";
import { useLoginApiMutation } from "@/app/rtkQueries/authApi";
import { useLogoutAllApiMutation } from "@/app/rtkQueries/authApi";
import { useDispatch } from "react-redux";
import { handleLoginSlice } from "@/app/slice/authSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()

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

        if(!/(Admin|Admin Manager|Super Admin|Manager)/.test(role)){
          toast.error("You do not have access to this application");
          return;
        }
        dispatch(handleLoginSlice({
          user: resp.data.user,
          accessToken: resp.data.accessToken,
          refreshToken: resp.data.refreshToken,
          username: resp.data.user.username,
        }))
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
    <form
      onSubmit={handleLogin}
      style={{
        background: "#1575B2",
        background:
          "linear-gradient(180deg,rgba(21, 117, 178, 1) 0%, rgba(255, 255, 255, 1) 100%)",
      }}
      className="h-screen w-full flex items-center justify-center"
    >
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        }}
        className="rounded-md w-[400px] h-[500px] flex flex-col items-center gap-4 text-[var(--color-text-1)] px-10"
      >
        <img
          className="mx-auto mt-10 mb-2"
          style={{ width: "200px" }}
          src={logoWithName}
          alt="mail_logo"
        />
        <div className="text-center text-[var(--color-header)] text-2xl font-semibold">
          Welcome
        </div>

        <div>Please Login</div>

        <CommonInput
          name="username"
          required
          value={loginData.username}
          onChange={handleChange}
          type="text"
          label="Username"
          placeholder="Username"
        />
        <CommonInput
          name="password"
          required
          value={loginData.password}
          onChange={handleChange}
          type="password"
          label="Password"
          placeholder="Password"
        />

        <button
          disabled={isLoading}
          type="submit"
          className="bg-[#1575B2]/80 cursor-pointer w-full py-2 rounded-md text-white font-medium mt-4 hover:opacity-50 transition"
        >
          Login
        </button>
      </div>
    </form>
  );
};
