import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export const PathHandler = (props) => {
  const { userTypes = [] } = props;
  const user = useSelector((state) => state.auth.user);
  console.log("user.role",user.role);
  const rootPath = "";
  const redirectPath = user.role.name === "Super Admin" ? "/tenant-master" : "/dashboard";

  if (!user.role) {
    return <Navigate to={`/login`} replace={true} />;
  } else if (!userTypes.includes(user.role) && !userTypes.includes("ALL")) {
    return <Navigate to={`/login`} replace={true} />;
  } else {
    return <Navigate to={`${rootPath}${redirectPath}`} replace={true} />;
  }
};