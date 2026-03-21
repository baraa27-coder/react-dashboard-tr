import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
//بيانات ثابتة
const orders = [
  { id: "#1001", customer: "Ahmad Ali", product: "Laptop", amount: "$1200", status: "Delivered" },
  { id: "#1002", customer: "Sara Noor", product: "Phone", amount: "$800", status: "Pending" },
  { id: "#1003", customer: "Lina Khaled", product: "Headphones", amount: "$150", status: "Shipped" },
  { id: "#1004", customer: "Omar Hasan", product: "Keyboard", amount: "$90", status: "Delivered" },
];

function getStatusColor(status) {
  if (status === "Delivered") return "success";
  if (status === "Pending") return "warning";
  if (status === "Shipped") return "info";
  return "default";
}

function OrdersTable() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        mt: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Recent Orders
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell><strong>Customer</strong></TableCell>
              <TableCell><strong>Product</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default OrdersTable;