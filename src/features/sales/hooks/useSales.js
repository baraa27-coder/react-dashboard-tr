import { useSelector } from "react-redux";
import {
  selectSales,
  selectTotalRevenue,
  selectSalesGrowth,
} from "../salesSelectors";

const useSales = () => {
  const sales = useSelector(selectSales);
  const totalRevenue = useSelector(selectTotalRevenue);
  const growth = useSelector(selectSalesGrowth);

  return {
    sales,
    totalRevenue,
    growth,
  };
};

export default useSales;