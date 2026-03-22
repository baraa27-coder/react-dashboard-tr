export const selectSales = (state) => state.sales.sales;

export const selectTotalRevenue = (state) =>
  state.sales.sales.reduce((acc, item) => acc + item.revenue, 0);

export const selectSalesGrowth = (state) => {
  const sales = state.sales.sales;
  if (sales.length < 2) return 0;

  const last = sales[sales.length - 1].revenue;
  const prev = sales[sales.length - 2].revenue;

  return (((last - prev) / prev) * 100).toFixed(1);
};