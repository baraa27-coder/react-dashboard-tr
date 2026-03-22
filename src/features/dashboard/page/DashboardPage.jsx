import { Typography, Grid } from "@mui/material";

import MainLayout from "../../../components/layout/MainLayout";
import StatCard from "../components/StatCard";
import UsersStatusTable from "../components/UsersStatusTable";
import SalesChart from "../../../components/SalesChart";
import useDashboard from "../hooks/useDashboard";

import PeopleIcon from "@mui/icons-material/People";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function DashboardPage({ mode, toggleMode }) {
  const { stats, sales, loading, error } = useDashboard();

  return (
    <MainLayout mode={mode} toggleMode={toggleMode}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Dashboard
      </Typography>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<PeopleIcon style={{color:"black"}} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Users"
            value={stats.activeUsers}
            icon={<CheckCircleIcon style={{color:"black"}}/>}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Banned Users"
            value={stats.bannedUsers}
            icon={<BlockIcon  style={{color:"black"}} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Recent Users"
            value={stats.recentUsers.length}
            icon={<GroupIcon style={{color:"black"}} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Revenue"
            value={`$${sales.totalRevenue}`}
            icon={<AttachMoneyIcon style={{color:"black"}} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Growth"
            value={`${sales.growth}%`}
            icon={<TrendingUpIcon style={{color:"black"}} />}
          />
        </Grid>
      </Grid>

      <SalesChart data={sales.sales} />

      <UsersStatusTable />
    </MainLayout>
  );
}

export default DashboardPage;