import { createBrowserRouter } from "react-router-dom";
import { LoginRoute, MainRoutes } from "./MainRoutes";

export const router = createBrowserRouter([MainRoutes, LoginRoute]);
