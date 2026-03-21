import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function MainLayout({ children, mode, toggleMode }) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>
        <Topbar mode={mode} toggleMode={toggleMode} />

        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;