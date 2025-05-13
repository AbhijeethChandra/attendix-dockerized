import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import SideBar, { DrawerHeader } from "./SideBar";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom"; // Import Outlet

export default function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar />
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet /> {/* This is critical - render the child routes here */}
      </Box>
    </Box>
  );
}
