import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets//AssetPro_logo.svg";
import { userLogout } from "../api/modules/loginAuth";
import toast from "react-hot-toast";

const NavBar = () => {
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate();
  const [institutionAnchorEl, setInstitutionAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);

  const userName = localStorage.getItem("fullName");

  const handleInstitutionClick = (event) => {
    setInstitutionAnchorEl(event.currentTarget);
  };

  const handleInstitutionClose = () => {
    setInstitutionAnchorEl(null);
  };

  const handleUserClick = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserClose = () => {
    setUserAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const res = await userLogout();
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.clear();
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("failed to logout");
      console.log("error", error);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1201, // A common value for zIndex.drawer + 1
        width: "100%",
        transition: "margin 225ms cubic-bezier(0.4, 0, 0.6, 1)",
        backgroundColor: theme === "light" ? "#fff" : "var(--dark-background)",
        // color: theme === "light" ? "#555" : "var(--dark-text-color)",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
        overflowX: "hidden",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 16px",
          minHeight: 64,
        }}
      >
        <Box display="flex" alignItems="center">
          <img
            onClick={() => navigate("/home")}
            src={logo}
            alt="Asset Pro Logo"
            style={{
              height: "32px",
              marginRight: "8px",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            onClick={handleInstitutionClick}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "6px 12px",
              borderRadius: "var(--border-radius)",
              border:
                theme === "light"
                  ? "1px solid #E0E0E0"
                  : "1px solid rgba(255, 255, 255, 0.15)",
              backgroundColor:
                theme === "light" ? "#FAFAFA" : "rgba(255, 255, 255, 0.05)",
              marginLeft: "auto",
              "&:hover": {
                backgroundColor:
                  theme === "light" ? "#F0F0F0" : "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: theme === "light" ? "#555" : "var(--dark-text-color)",
              }}
            >
              Sree Gokulam
            </Typography>
            <KeyboardArrowDownIcon
              sx={{
                ml: 1,
                opacity: 0.7,
                color: theme === "light" ? "#555" : "var(--dark-text-color)",
              }}
            />
          </Box>

          <Menu
            anchorEl={institutionAnchorEl}
            open={Boolean(institutionAnchorEl)}
            onClose={handleInstitutionClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            PaperProps={{
              sx: {
                backgroundColor:
                  theme === "light" ? "#fff" : "var(--dark-background)",
                color: theme === "light" ? "#555" : "var(--dark-text-color)",
              },
            }}
          >
            <MenuItem onClick={handleInstitutionClose}>
              Sree Gokulam Medical College
            </MenuItem>
            <MenuItem onClick={handleInstitutionClose}>City Hospital</MenuItem>
            <MenuItem onClick={handleInstitutionClose}>
              Metro Medical Center
            </MenuItem>
          </Menu>

          <IconButton
            size="large"
            sx={{
              color: theme === "light" ? "#555" : "var(--dark-text-color)",
            }}
          >
            <NotificationsIcon />
          </IconButton>

          {/* <IconButton
            size="large"
            onClick={toggleTheme}
            sx={{
              color: theme === "light" ? "#555" : "var(--dark-text-color)",
            }}
          >
            {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton> */}

          <Box
            onClick={handleUserClick}
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "var(--border-radius)",
              "&:hover": {
                backgroundColor:
                  theme === "light"
                    ? "rgba(0, 0, 0, 0.04)"
                    : "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: theme === "light" ? "#555" : "var(--dark-text-color)",
              }}
            >
              {userName}
            </Typography>
            <KeyboardArrowDownIcon
              sx={{
                opacity: 0.7,
                color: theme === "light" ? "#555" : "var(--dark-text-color)",
              }}
            />
          </Box>

          <Menu
            anchorEl={userAnchorEl}
            open={Boolean(userAnchorEl)}
            onClose={handleUserClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                backgroundColor:
                  theme === "light" ? "#fff" : "var(--dark-background)",
                color: theme === "light" ? "#555" : "var(--dark-text-color)",
              },
            }}
          >
            <MenuItem onClick={handleUserClose}>Profile</MenuItem>
            <MenuItem onClick={handleUserClose}>Account Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
