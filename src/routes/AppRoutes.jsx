import { Routes, Route } from "react-router-dom";
// import DashboardPage from "../features/dashboard/pages/DashboardPage";
import Users from "../features/users/pages/Users";
import UserDetails from "../features/users/pages/UserDetails";
 import DashboardPage from "../features/dashboard/page/DashboardPage"
function AppRoutes({ mode, toggleMode }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<DashboardPage mode={mode} toggleMode={toggleMode} />}
      />
      <Route
        path="/users"
        element={<Users mode={mode} toggleMode={toggleMode} />}
      />
      <Route
        path="/users/:id"
        element={<UserDetails mode={mode} toggleMode={toggleMode} />}
      />
    </Routes>
  );
}

export default AppRoutes;