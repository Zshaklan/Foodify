import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegClock, FaTruck } from "react-icons/fa";
import { GoPackage, GoXCircle } from "react-icons/go";
import { FiCheckCircle } from "react-icons/fi";
import "./Order.css";
import { UserProgressContext } from "../../store/UserProgressContext";
import Modal from "../UI/Modal";
import OrderManagement from "./OrderManagement";

const Order = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { showOrderManagement, hideOrderManagement, progress } =
    useContext(UserProgressContext);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.includes(searchTerm) ||
      order.user.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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

  const handleManageClick = (order) => {
    setSelectedOrder(order);
    showOrderManagement();
  };
  console.log(progress);

  return (
    <div className="order">
      <div>
        <div className="order_filter">
          <div>
            <FaSearch />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="order_table">
        <div>
          <table>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Status</th>
                <th>Total</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    <div>{order.user.fullName}</div>
                    <div>{order.user.email}</div>
                  </td>
                  <td>
                    {order.items.map((item) => (
                      <div key={item._id}>
                        {item.meal.name} x {item.quantity} (₹{item.price})
                      </div>
                    ))}
                  </td>
                  <td>
                    <span>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td>₹{order.totalAmount}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleManageClick(order);
                      }}
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for managing order */}
      {selectedOrder && (
        <Modal
          open={progress === "management"}
          onClose={() => {
            hideOrderManagement();
            setSelectedOrder(null);
          }}
        >
          <OrderManagement selectedOrder={selectedOrder} />
        </Modal>
      )}
    </div>
  );
};

export default Order;
