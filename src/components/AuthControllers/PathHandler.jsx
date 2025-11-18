import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export const PathHandler = (props) => {
  const { userTypes = [] } = props;
  // const user = useSelector((state) => state.auth.user);
  const user = { role: 'admin' };
  // const token = useSelector(state => state.auth.token);

  const rootPath = user.role === 'admin' ? "" : "";

  if (!user.role) {
    return <Navigate to={`${rootPath}/login`} replace={true} />;
  } else if (!userTypes.includes(user.role) && !userTypes.includes("ALL")) {
    return <Navigate to={`${rootPath}/login`} replace={true} />;
  } else {
    return <Navigate to={rootPath} replace={true} />;
  }
};
