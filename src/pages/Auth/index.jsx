import logoWithName from "../../assets/icons/Attendix_Tagline.svg";
import { CommonInput } from "../../components/Common/CommonInput";

export const Login = () => {
  return (
    <div
      style={{
        background: "#1575B2",
        background:
          "linear-gradient(180deg,rgba(21, 117, 178, 1) 0%, rgba(255, 255, 255, 1) 100%)",
      }}
      className="h-screen w-full flex items-center justify-center"
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.28)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        }}
        className="rounded-md w-[400px] h-[500px] flex flex-col items-center gap-4 text-[var(--color-text-3)] px-10"
      >
        <img
          className="mx-auto mt-10 mb-5"
          style={{ width: "200px", filter: "brightness(0) invert(1)" }}
          src={logoWithName}
          alt="mail_logo"
        />
        <div className="text-center text-white text-2xl font-semibold">
          Welcome
        </div>

        <div>Please Login</div>

        <CommonInput type="text" label="Username" placeholder="Username" />
        <CommonInput type="password" label="Password" placeholder="Password" />

        <button className="bg-[#1575B2]/60 cursor-pointer w-full py-2 rounded-md text-white font-medium mt-4 hover:opacity-50 transition">
          Login
        </button>
      </div>
    </div>
  );
};
