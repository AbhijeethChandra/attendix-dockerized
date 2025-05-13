import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SideBarListing from "./SideBarListing";
import { useTheme } from "../context/ThemeContext";
import Tooltip from "@mui/material/Tooltip";

// DrawerHeader with direct style values
export const DrawerHeader = (props) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between", // Space between for company name and pin button
      padding: "0 8px",
      minHeight: 64,
    }}
    {...props}
  />
);

const SideBar = ({ companyName = "Sree Gokulam" }) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  // Handle hover events
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (!open && !isPinned) setOpen(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Toggle pin state
  const handleTogglePin = () => {
    setIsPinned(!isPinned);
    if (!isPinned) {
      setOpen(true); // Ensure drawer is open when pinned
    }
  };

  // Auto-close drawer when mouse leaves (only if not pinned)
  useEffect(() => {
    let timeoutId;
    if (!isHovering && open && !isPinned) {
      timeoutId = setTimeout(() => setOpen(false), 400); // 400ms hover delay
    }
    return () => timeoutId && clearTimeout(timeoutId);
  }, [isHovering, open, setOpen, isPinned]);

  const drawerWidth = open ? 260 : 56;

  return (
    <Box>
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          width: drawerWidth,
          whiteSpace: "nowrap",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor:
              theme === "light" ? "#fff" : "var(--dark-background)",
            transition: "width 400ms cubic-bezier(0.4, 0, 0.6, 1)",
            padding: "15px",
            overflowY: "auto", // Ensure scrolling is enabled
            scrollbarWidth: "thin",
            marginTop: "64px",
            scrollbarColor: "#efefef transparent", //scroll bar color
            height: "calc(100vh - 64px)", // Set a fixed height with calculation
          },
        }}
      >
        <DrawerHeader>
          <Typography
            sx={{
              fontSize: open ? "1.25rem" : "0", // Bigger text when open
              color: theme === "light" ? "#333" : "#fff",
              justifyContent: open ? "initial" : "center",
            }}
          >
            {companyName}
          </Typography>

          {/* Pin button moved to the right side */}
          <Tooltip title={isPinned ? "Unpin sidebar" : "Pin sidebar"}>
            <IconButton
              onClick={handleTogglePin}
              sx={{
                backgroundColor: theme === "light" ? "#fff" : "grey",
                borderRadius: "50%",
                padding: "0px",
              }}
            >
              {isPinned ? (
                <KeyboardDoubleArrowLeftIcon />
              ) : (
                <KeyboardDoubleArrowRightIcon />
              )}
            </IconButton>
          </Tooltip>
        </DrawerHeader>

        <SideBarListing open={open} />
      </Drawer>
    </Box>
  );
};

export default SideBar;
