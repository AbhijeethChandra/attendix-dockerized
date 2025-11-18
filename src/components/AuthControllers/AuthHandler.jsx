import { useSelector } from "react-redux";

export const AuthHandler = ({
  Components = [{ Component: () => <div></div>, props: {}, userRoles: [""] }],
}) => {
  // const { user } = useSelector((state) => state.auth);
  const user = { role: 'admin' };

  if (!user || !user.role) {
    return <div>Access Denied</div>;
  }

  // const userPermissions = permissions[user.role]?.[moduleName] || [];

  // if (!userPermissions.includes(action)) {
  //   return <></>;
  // }

  return (
    <>
      {Components.filter(({ userRoles }) => userRoles.includes(user.role)).map(
        ({ Component, props = {} }, index) => (
          <Component key={index} {...props} />
        )
      )}
    </>
  );
};
