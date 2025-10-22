import RecentOrders from "./RecentOrders.jsx";
import useHttp from "../../hooks/useHttp";

const Overview = () => {
  const { sendRequest } = useHttp();

  return (
    <div className="overview">
      <div>
        <div className="overview_stats total_users">
          <div>
            <p>Total Users</p>
            <p>{stats.totalUsers}</p>
          </div>
          {/* Add users icon here */}
        </div>
      </div>

      <div className="overview_stats total_orders">
        <div>
          <div>
            <p>Total Orders</p>
            <p>{stats.totalOrders}</p>
          </div>
          {/* Add orders icon here */}
        </div>
      </div>

      <div className="overview_stats pending_orders">
        <div>
          <div>
            <p>Pending Orders</p>
            <p>{stats.pendingOrders}</p>
          </div>
          {/* Add icon pending orders here */}
        </div>
      </div>

      <div className="overview_stats total_revenue">
        <div>
          <div>
            <p>Total Revenue</p>
            <p>${stats.totalRevenue.toFixed(2)}</p>
          </div>
          {/* Add currency icon here */}
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
};

export default Overview;
