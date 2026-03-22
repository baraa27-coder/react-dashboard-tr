import { createSelector } from "@reduxjs/toolkit";
import { selectUsers } from "../../users/usersSelectors";

const getUserStatus = (user) => {
  if (user.id % 5 === 0) return "banned";
  if (user.id % 2 === 0) return "inactive";
  return "active";
};

export const selectDashboardStats = createSelector(
  [selectUsers],
  (users = []) => {
    const usersWithStatus = users.map((user) => ({
      ...user,
      status: getUserStatus(user),
    }));

    const totalUsers = usersWithStatus.length;
    const activeUsers = usersWithStatus.filter(
      (user) => user.status === "active"
    ).length;
    const inactiveUsers = usersWithStatus.filter(
      (user) => user.status === "inactive"
    ).length;
    const bannedUsers = usersWithStatus.filter(
      (user) => user.status === "banned"
    ).length;

    const recentUsers = [...usersWithStatus].slice(-5).reverse();

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      bannedUsers,
      recentUsers,
    };
  }
);

export const selectUsersStatusRows = createSelector(
  [selectUsers],
  (users = []) =>
    users.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      city: user.address?.city || "-",
      company: user.company?.name || "-",
      status: getUserStatus(user),
    }))
);

export const selectFilteredSortedUsersRows = createSelector(
  [
    selectUsersStatusRows,
    (_, filters) => filters,
  ],
  (rows, filters) => {
    const {
      status = "all",
      sortBy = "name",
      sortOrder = "asc",
    } = filters || {};

    let result = [...rows];

    if (status !== "all") {
      result = result.filter((row) => row.status === status);
    }

    result.sort((a, b) => {
      let firstValue;
      let secondValue;

      if (sortBy === "status") {
        firstValue = a.status.toLowerCase();
        secondValue = b.status.toLowerCase();
      } else {
        firstValue = a.name.toLowerCase();
        secondValue = b.name.toLowerCase();
      }

      if (firstValue < secondValue) return sortOrder === "asc" ? -1 : 1;
      if (firstValue > secondValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }
);