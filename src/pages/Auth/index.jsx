import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleLoginSlice } from "@/app/slice/authSlice";
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import loginbg from "@/assets/images/loginbg.jpg";
import { Login } from "./Login";
import { ForgotPassword } from "./ForgotPassword";
import {
  useForgotPasswordMutation,
  useLoginApiMutation,
} from "@/app/rtkQueries/authApi";

const Auth = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const [loginApi, { isLoadingLogin }] = useLoginApiMutation();
  const [forgotPasswordApi, { isLoadingForgotPassword }] =
    useForgotPasswordMutation();

  const handleLogin = async (loginData) => {

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
    }
  };

  const handleForgotPassword = async (data) => {
    try {
      await forgotPasswordApi(data).unwrap();
      navigate("/login");
      toast.success("Password reset successful");
    } catch (err) {
      console.error(err);
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
        {path.match(/login/) ? (
          <Login
            {...{
              handleSubmit: handleLogin,
              isLoading: isLoadingLogin,
            }}
          />
        ) : (
          path.match(/forgot/) && (
            <ForgotPassword
              {...{
                handleSubmit: handleForgotPassword,
                isLoading: isLoadingForgotPassword,
              }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Auth;
