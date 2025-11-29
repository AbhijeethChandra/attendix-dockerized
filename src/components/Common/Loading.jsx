import Lottie from "react-lottie-player";
import loadingAnimation from "@/assets/lotties/loading.json";
import { twMerge } from "tailwind-merge";

export const Loading = ({ className }) => {

  return (
    <div
      className={twMerge(
        "h-full w-full flex justify-center items-center",
        className
      )}
    >
      <Lottie
        loop
        animationData={loadingAnimation}
        play
        style={{ width: 50, height: 50 }}
      />
    </div>
  );
};
