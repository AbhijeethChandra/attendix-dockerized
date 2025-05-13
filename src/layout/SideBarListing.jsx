import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate, useLocation } from "react-router-dom";
import { navigationConfig } from "../routes/MainRoutes";
import { useTheme } from "../context/ThemeContext";

const SideBarListing = ({ open }) => {
  const { theme } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});

  // Set initially expanded items based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const newExpandedState = {};

    // Check if current path is a child of any dropdown
    navigationConfig.mainItems.forEach((item) => {
      if (item.children) {
        const isChildActive = item.children.some(
          (child) => currentPath === child.path
        );
        if (isChildActive) {
          newExpandedState[item.title] = true;
        }
      }
    });

    setExpandedItems(newExpandedState);
  }, [location.pathname]);

  const handleItemClick = (item) => {
    if (item.isDropdown) {
      setExpandedItems((prev) => ({
        ...prev,
        [item.title]: !prev[item.title],
      }));
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const isItemActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Box
      sx={{
        maxHeight: "calc(100vh - 130px)", // Account for header and some padding
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "3px",
        },
      }}
    >
      <List>
        {navigationConfig.mainItems.map((item) => (
          <React.Fragment key={item.title}>
            <ListItem disablePadding sx={{ display: "block", mb: 0.5 }}>
              <Tooltip title={open ? "" : item.title} placement="right">
                <ListItemButton
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    borderRadius: "8px",
                    backgroundColor:
                      theme === "light"
                        ? isItemActive(item.path)
                          ? "var(--primary-clr)"
                          : "transparent"
                        : isItemActive(item.path)
                        ? "var(--dark-selected)"
                        : "transparent",
                    color:
                      theme === "light"
                        ? isItemActive(item.path)
                          ? "white"
                          : "#555"
                        : isItemActive(item.path)
                        ? "black"
                        : "var(--dark-text-color)",
                    "&:hover": {
                      backgroundColor:
                        theme === "light"
                          ? isItemActive(item.path)
                            ? "var(--primary-clr)"
                            : "rgba(0,0,0,0.04)"
                          : isItemActive(item.path)
                          ? "var(--dark-selected)"
                          : "rgba(255,255,255,0.08)",
                    },
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color:
                        theme === "light"
                          ? isItemActive(item.path)
                            ? "white"
                            : "#555"
                          : isItemActive(item.path)
                          ? "black"
                          : "var(--dark-text-color)",
                    }}
                  >
                    {item.icon && <item.icon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      opacity: open ? 1 : 0,
                      m: 0, // Remove default margin
                    }}
                  />
                  {item.isDropdown &&
                    open &&
                    (expandedItems[item.title] ? (
                      <ExpandLess sx={{ fontSize: "18px" }} />
                    ) : (
                      <ExpandMore sx={{ fontSize: "18px" }} />
                    ))}
                </ListItemButton>
              </Tooltip>
            </ListItem>

            {item.isDropdown && item.children && (
              <Collapse
                in={open && expandedItems[item.title]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <Tooltip
                      key={child.title}
                      title={open ? "" : child.title}
                      placement="right"
                    >
                      <ListItemButton
                        sx={{
                          pl: open ? 4 : 2.5,
                          minHeight: 40,
                          borderRadius: "8px",
                          mb: 0.5,
                          justifyContent: open ? "initial" : "center",
                          backgroundColor:
                            theme === "light"
                              ? isItemActive(child.path)
                                ? "var(--primary-clr)"
                                : "transparent"
                              : isItemActive(child.path)
                              ? "var(--dark-selected)"
                              : "transparent",
                          color:
                            theme === "light"
                              ? isItemActive(child.path)
                                ? "white"
                                : "#555"
                              : isItemActive(child.path)
                              ? "black"
                              : "var(--dark-text-color)",
                          "&:hover": {
                            backgroundColor:
                              theme === "light"
                                ? isItemActive(child.path)
                                  ? "var(--primary-clr)"
                                  : "rgba(0,0,0,0.04)"
                                : isItemActive(child.path)
                                ? "var(--dark-selected)"
                                : "rgba(255,255,255,0.08)",
                          },
                        }}
                        onClick={() => navigate(child.path)}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 2 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          {child.icon && <child.icon fontSize="small" />}
                        </ListItemIcon>

                        <ListItemText
                          primary={child.title}
                          sx={{ opacity: open ? 1 : 0, m: 0 }}
                        />
                      </ListItemButton>
                    </Tooltip>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default SideBarListing;
