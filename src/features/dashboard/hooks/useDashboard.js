import { useEffect } from "react";
import { useSelector } from "react-redux";

import useUsers from "../../users/hooks/useUsers";
import useSales from "../../sales/hooks/useSales";
import {
  selectDashboardStats,
  selectUsersStatusRows,
} from "../selectors/dashboardSelectors";

const useDashboard = () => {
  const stats = useSelector(selectDashboardStats);
  const usersRows = useSelector(selectUsersStatusRows);

  const { loading, error, fetchAllUsers } = useUsers();
  const sales = useSales();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return {
    stats,
    usersRows,
    sales,
    loading,
    error,
  };
};

export default useDashboard;