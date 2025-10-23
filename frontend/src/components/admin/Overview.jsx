import "./Overview.css";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { GoPackage } from "react-icons/go";

import RecentOrders from "./RecentOrders.jsx";

const Overview = ({ users, orders }) => {
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((user) => user.isActive).length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    pendingOrders: orders.filter((o) => o.status === "pending").length,
  };

  return (
    <>
      <div className="overview">
        <div className="overview_stats total_users">
          <div>
            <div>
              <p>Total Users</p>
              <p>{stats.totalUsers}</p>
            </div>
            <FiUsers />
          </div>
        </div>

        <div className="overview_stats total_orders">
          <div>
            <div>
              <p>Total Orders</p>
              <p>{stats.totalOrders}</p>
            </div>
            <GoPackage />
          </div>
        </div>

        <div className="overview_stats pending_orders">
          <div>
            <div>
              <p>Pending Orders</p>
              <p>{stats.pendingOrders}</p>
            </div>
            <GoPackage />
          </div>
        </div>

        <div className="overview_stats total_revenue">
          <div>
            <div>
              <p>Total Revenue</p>
              <p>{stats.totalRevenue.toFixed(2)}</p>
            </div>
            <FaIndianRupeeSign />
          </div>
        </div>
      </div>
      <RecentOrders orders={orders} />
    </>
  );
};

export default Overview;
