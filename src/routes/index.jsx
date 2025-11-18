import { createBrowserRouter, RouterProvider } from "react-router";
import { ParentRoutes } from "./parentRoutes";
import { PrivateRoutes } from "./privateRoutes";
import { ROUTES_BY_ROLE } from "./routesConstants";
import { PublicRoutes } from "./publicRoutes";

export const AppRoutes = () => {
  let routes = [];

  const pathByRole = ROUTES_BY_ROLE["admin"] || [];

  let routesWithParent = [];

  ParentRoutes.filter((parentRoute) => parentRoute.roles.includes("admin")).map(
    (data) => routesWithParent.push(...data.routes)
  );

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
  
  routes = [...routesWithParent, ...PublicRoutes];

  console.log("Routes:", routes);
  
  const router = createBrowserRouter(routes)

  return <RouterProvider router={router} />;
};
