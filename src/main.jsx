import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { Toaster } from "react-hot-toast";
import "@fontsource/dm-sans"; // Defaults to weight 400 (normal)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontFamily: '"DM Sans", sans-serif',
            // fontSize: "1.2rem",
            padding: "10px",
            maxWidth: "300px",
            minWidth: "200px",
          },
        }}
      />
    </ThemeProvider>
  </StrictMode>
);
