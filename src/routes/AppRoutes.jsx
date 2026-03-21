import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Users from "../features/users/pages/Users";
import UserDetails from "../features/users/pages/UserDetails";

function AppRoutes({ mode, toggleMode }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard mode={mode} toggleMode={toggleMode} />}
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