import { FaRegClock, FaTruck } from "react-icons/fa";
import { GoPackage, GoXCircle } from "react-icons/go";
import { FiCheckCircle } from "react-icons/fi";
import "./RecentOrders.css";

const RecentOrders = ({ orders }) => {
  const getStatusIcon = (status) => {
    const icons = {
      pending: <FaRegClock className="status-icon" />,
      processing: <GoPackage className="status-icon" />,
      shipped: <FaTruck className="status-icon" />,
      delivered: <FiCheckCircle className="status-icon" />,
      cancelled: <GoXCircle className="status-icon" />,
    };
    return icons[status] || <FaRegClock className="status-icon" />;
  };

  return (
    <div className="recent_orders">
      <div className="heading">
        <h2>Recent Orders</h2>
      </div>
      <div className="order_table">
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.fullName}</td>
                <td>
                  <span>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </td>
                <td>₹{order.totalAmount}</td>
                <td>{order.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
