import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { ParentRoutes } from "./parentRoutes";
import { PrivateRoutes } from "./privateRoutes";
import { ROUTES_BY_ROLE } from "./routesConstants";
import { PublicRoutes } from "./publicRoutes";
import { ErrorBoundary } from "@/components/Common/ErrorBoundary";
import { useSelector } from "react-redux";
import { SIDEBAR_LIST_BY_ROLE } from "@/components/Layout/sidebarConstants";

export const AppRoutes = () => {
  const user = useSelector((state) => state.auth.user);
  let routes = [];

  const pathByRole =
    SIDEBAR_LIST_BY_ROLE[user.role.name]?.flatMap((item) => item.name) || [];

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

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
