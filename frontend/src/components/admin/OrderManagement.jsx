import { useContext } from "react";
import "./OrderManagement.css";
import { UserProgressContext } from "../../store/UserProgressContext";
import { FaRegClock, FaTruck } from "react-icons/fa";
import { GoPackage, GoXCircle } from "react-icons/go";
import { FiCheckCircle } from "react-icons/fi";
import Button from "../UI/Button";

const orderStatus = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const OrderManagement = ({ selectedOrder }) => {
  if (!selectedOrder) return null;

  const { hideOrderManagement } = useContext(UserProgressContext);

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

  const getStatusColor = (status) => {
    const colors = {
      pending: { background: "#FEF3C7", color: "#78350F" },
      processing: { background: "#DBEAFE", color: "#1E40AF" },
      shipped: { background: "#EDE9FE", color: "#5B21B6" },
      delivered: { background: "#DCFCE7", color: "#166534" },
      cancelled: { background: "#FEE2E2", color: "#991B1B" },
    };

    return colors[status] || { background: "#F3F4F6", color: "#374151" };
  };

  function updateOrderStatus() {}

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h3>Manage Order: {selectedOrder.orderNumber}</h3>
        <Button onClick={hideOrderManagement}>X</Button>
      </div>

      <div className="modal-body">
        {/* Customer Info */}
        <div className="section">
          <h4>Customer Information</h4>
          <div className="info-box">
            <p>
              <strong>Name:</strong> {selectedOrder.user.fullName}
            </p>
            <p>
              <strong>Email:</strong> {selectedOrder.user.email}
            </p>
            <p>
              <strong>Address:</strong> {selectedOrder.deliveryAddress.name},{" "}
              {selectedOrder.deliveryAddress.street},{" "}
              {selectedOrder.deliveryAddress.city} -{" "}
              {selectedOrder.deliveryAddress.postalCode}
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div className="section">
          <h4>Order Details</h4>
          <div className="info-box">
            <p>
              <strong>Items:</strong>{" "}
              {selectedOrder.items.map((item) => (
                <span key={item._id}>
                  {item.meal.name} x {item.quantity} (${item.price}){" "}
                </span>
              ))}
            </p>
            <p>
              <strong>Total:</strong> ${selectedOrder.totalAmount}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Current Status:</strong>{" "}
              <span
                className={`status-badge ${getStatusColor(
                  selectedOrder.status
                )}`}
              >
                {getStatusIcon(selectedOrder.status)}
                {selectedOrder.status}
              </span>
            </p>
          </div>
        </div>

        {/* Update Status */}
        <div className="section">
          <h4>Update Order Status</h4>
          <div className="status-buttons">
            {orderStatus.map((status) => (
              <button
                key={status}
                onClick={() => updateOrderStatus(selectedOrder._id, status)}
                disabled={selectedOrder.status === status}
                className={`status-btn ${
                  selectedOrder.status === status ? "active" : ""
                }`}
              >
                {getStatusIcon(status)}
                <span>{status}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <Button onClick={hideOrderManagement}>Close</Button>
      </div>
    </div>
  );
};

export default OrderManagement;
