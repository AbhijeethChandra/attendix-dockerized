import {useLottie} from "lottie-react";
import loadingAnimation from "../../assets/lotties/loading.json";
console.log(loadingAnimation)
export const Loading = () => {

    const {View} = useLottie({
        animationData: loadingAnimation,
        loop: true,
        style:{
            width: 50,
            height: 50,
        }
    })
  return (
    <div className="h-full w-full flex justify-center items-center">
      {View}
    </div>
  );
};
