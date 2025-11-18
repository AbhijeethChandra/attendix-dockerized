import { Toaster } from "react-hot-toast";
import { useThemeApply } from "./hooks/useThemeApply";
import { AppRoutes } from "./routes";

function App() {

  useThemeApply();

  return (
  <>
  <AppRoutes />
  <Toaster position="top-center" reverseOrder={false} />
  </>
);
}

export default App;
