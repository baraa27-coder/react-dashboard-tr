import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#f9fafb",
              paper: "#ffffff",
            },
          }
        : {
            background: {
              default: "#111827",
              paper: "#1f2937",
            },
          }),
    },
    typography: {
      fontFamily: "Arial, sans-serif",
    },
    shape: {
      borderRadius: 12,
    },
  });