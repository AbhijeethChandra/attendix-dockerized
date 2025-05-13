// src/routes/routes.js
import React, { lazy, Suspense } from "react";
import {
  Home as HomeIcon,
  Category as CategoryIcon,
  ErrorOutline as ErrorOutlineIcon,
  Settings as SettingsIcon,
  Drafts as DraftsIcon,
  Code as CodeIcon,
  Class as ClassIcon,
  Build as BuildIcon,
  ListAlt as ListAltIcon,
} from "@mui/icons-material";
import { Box, CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";
import NotFound from "../components/common/NotFound";
import ProtectedRoute from "./ProtectedRoute";

// --- Loading fallback component ---
const LoadingComponent = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);

// --- Suspense wrapper ---
const withSuspense = (Component) => (
  <Suspense fallback={<LoadingComponent />}>{Component}</Suspense>
);

// --- Lazy loader with suspense wrapper ---
const lazyWithSuspense = (importFunc) => {
  const Component = lazy(importFunc);
  return withSuspense(<Component />);
};

// --- Lazy components ---
const Layout = lazy(() =>
  import(/* webpackChunkName: "layout" */ "../layout/Layout")
);
const Home = lazyWithSuspense(() =>
  import(/* webpackChunkName: "home" */ "../modules/assets/Home")
);
const LoginPage = lazyWithSuspense(() =>
  import(/* webpackChunkName: "login" */ "../modules/auth/login/LoginPage")
);

// --- Other lazy routes ---
const TenantTable = lazyWithSuspense(() =>
  import("../modules/assets/TenantMaster/TenantTable")
);
const SectorMasterTable = lazyWithSuspense(() =>
  import("../modules/assets/SectorMaster/SectorMasterTable")
);
const OfficeMasterTable = lazyWithSuspense(() =>
  import("../modules/assets/OfficeMaster/OfficeMasterTable")
);
const StaffMasterTable = lazyWithSuspense(() =>
  import("../modules/assets/StaffMaster/StaffMasterTable")
);

// --- Navigation config ---
export const navigationConfig = {
  mainItems: [
    {
      title: "Home",
      path: "/home",
      icon: HomeIcon,
      element: Home,
    },
    {
      title: "Assets",
      icon: CategoryIcon,
      isDropdown: true,
      children: [
        { title: "Tenant", path: "/attadance/TenantMaster", element: TenantTable },
        {
          title: "Office",
          path: "/attadance/OfficeMaster",
          element: OfficeMasterTable,
        },
        {
          title: "Sector",
          path: "/attadance/SectorMasterTable",
          element: SectorMasterTable,
        },
        {
          title: "Staff Master",
          path: "/attadance/StaffMasterTable",
          element: StaffMasterTable,
        },
      ],
    },
  ],
  otherRoutes: [
    {
      path: "/",
      element: <Navigate to="/home" replace />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

// --- Generate all routes from config ---
export const generateRoutes = () => {
  const routes = [];

  navigationConfig.mainItems.forEach((item) => {
    if (item.path && item.element) {
      routes.push({ path: item.path, element: item.element });
    }

    if (item.children) {
      item.children.forEach((child) => {
        if (child.path && child.element) {
          routes.push({ path: child.path, element: child.element });
        }
      });
    }
  });

  navigationConfig.otherRoutes.forEach((route) => {
    routes.push(route);
  });

  return routes;
};

// --- Main protected routes ---
export const MainRoutes = {
  path: "/",
  element:
    // <ProtectedRoute>
    withSuspense(<Layout />),
  // </ProtectedRoute>
  children: generateRoutes(),
  errorElement: <NotFound />,
};

// --- Public login route ---
export const LoginRoute = {
  path: "/login",
  element: LoginPage,
};
