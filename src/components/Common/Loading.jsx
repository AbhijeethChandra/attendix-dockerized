import { useLottie } from "lottie-react";
import loadingAnimation from "@/assets/lotties/loading.json";
import { twMerge } from "tailwind-merge";

export const Loading = ({ className }) => {
  const { View } = useLottie({
    animationData: loadingAnimation,
    loop: true,
    style: {
      width: 50,
      height: 50,
    },
  });
  return (
    <div
      className={twMerge(
        "h-full w-full flex justify-center items-center",
        className
      )}
    >
      {View}
    </div>
  );
};
