import { Typography, Grid } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import MainLayout from "../components/layout/MainLayout";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";
import OrdersTable from "../components/OrdersTable";

import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import GroupIcon from "@mui/icons-material/Group";

import { selectDashboardStats } from "../features/dashboard/dashboardSelectors";
import useUsers from "../features/users/hooks/useUsers";

function Dashboard({ mode, toggleMode }) {
  const dashboardStats = useSelector(selectDashboardStats);
  const { loading, error, fetchAllUsers } = useUsers();

  useEffect(() => {
    fetchAllUsers();
  },[]);

  return (
    <MainLayout mode={mode} toggleMode={toggleMode}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Dashboard
      </Typography>

      {loading && <Typography mb={2}>Loading users...</Typography>}
      {error && (
        <Typography mb={2} color="error">
          {error}
        </Typography>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={dashboardStats.totalUsers}
            icon={<PeopleIcon sx={{ color: "#4f46e5" }} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Users"
            value={dashboardStats.activeUsers}
            icon={<CheckCircleIcon sx={{ color: "#16a34a" }} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Inactive Users"
            value={dashboardStats.inactiveUsers}
            icon={<CancelIcon sx={{ color: "#dc2626" }} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Recent Users"
            value={dashboardStats.recentUsers.length}
            icon={<GroupIcon sx={{ color: "#2563eb" }} />}
          />
        </Grid>
      </Grid>

      <SalesChart />
      <OrdersTable />
    </MainLayout>
  );
}

export default Dashboard;