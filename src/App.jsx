import { useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme";
import AppRoutes from "./routes/AppRoutes";
import AppSnackbar from "./components/common/AppSnackbar";

function App() {
  const [mode, setMode] = useState("light");

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes mode={mode} toggleMode={toggleMode} />
      <AppSnackbar />
    </ThemeProvider>
  );
}

export default App;