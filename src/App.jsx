import { createTheme, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import "@fontsource/open-sans";
import "@fontsource/dm-sans"; // Defaults to weight 400 (normal)
import "./index.css";
import { ConfirmationProvider } from "./context/ConfirmationContext";

const theme = createTheme({
  typography: {
    fontFamily: '"DM Sans", sans-serif',
  },
});

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <ConfirmationProvider>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ThemeProvider>
      </ConfirmationProvider>
    </>
  );
}

export default App;
