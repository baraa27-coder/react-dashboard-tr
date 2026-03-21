import { createSelector } from "@reduxjs/toolkit";
import { selectUsers } from "../users/usersSelectors";

export const selectDashboardStats = createSelector(
  [selectUsers],
  (users = []) => {
    const totalUsers = users.length;

    // ⚠️ عدّلي هاد حسب شكل user عندك
    const activeUsers = users.filter((user) => user.isActive).length;

    const inactiveUsers = totalUsers - activeUsers;

    const recentUsers = [...users].slice(-5).reverse();

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      recentUsers,
    };
  }
);