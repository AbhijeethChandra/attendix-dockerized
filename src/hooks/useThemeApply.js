import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const THEME_KEY = "theme";

export function useThemeApply() {
  const theme = useSelector((state) => state.theme.themeName);

  useEffect(() => {
    if (typeof theme !== "string") return;
    const root = document.documentElement;
    const themeClass = `theme-${theme?.toLowerCase()}`;

    // Remove old theme from root class (if any)
    root.className = root.className
      .split(" ")
      .filter((cls) => !cls.startsWith("theme-"))
      .join(" ")
      .trim();

    // Add new theme class
    root.classList.add(themeClass);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);
}
