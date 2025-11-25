import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { ParentRoutes } from "./parentRoutes";
import { PrivateRoutes } from "./privateRoutes";
import { ROUTES_BY_ROLE } from "./routesConstants";
import { PublicRoutes } from "./publicRoutes";
import { ErrorBoundary } from "@/components/Common/ErrorBoundary";
import { useSelector } from "react-redux";

export const AppRoutes = () => {
  const user = useSelector((state) => state.auth.user);
  let routes = [];

  const pathByRole = ROUTES_BY_ROLE[user.role.name] || [];

  let routesWithParent = [];

  ParentRoutes.filter((parentRoute) =>
    parentRoute.roles.includes(user.role.name)
  ).map((data) => routesWithParent.push(...data.routes));

  let childRoutes = PrivateRoutes.filter(
    (route) =>
      pathByRole.includes(route.path) ||
      ["*", "settings", "help"].includes(route.path) ||
      route.index
  );

  let layoutRouteIndex = routesWithParent.findIndex((route) => route.isLayout);

  if (layoutRouteIndex !== -1) {
    routesWithParent[layoutRouteIndex].children = childRoutes;
  }
  routes = [
    {
      element: (
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      ),
      children: [...routesWithParent, ...PublicRoutes],
    },
  ];

  const router = createBrowserRouter(routes, { basename: "/attprov2" });

  return <RouterProvider router={router} />;
};
