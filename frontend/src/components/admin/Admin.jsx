import "./Admin.css";
import { useEffect, useMemo, useState } from "react";
import Overview from "./Overview.jsx";
import Order from "./Order.jsx";
import Users from "./Users.jsx";
import useHttp from "../../hooks/useHttp";
import { API_URL } from "../../config/api.js";

const navigationTabs = ["overview", "orders", "users"];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const emptyConfig = useMemo(() => ({}), []);

  const {
    data: usersData,
    isLoading: isUsersLoading,
    error: usersError,
    sendRequest: fetchUsers,
  } = useHttp(`${API_URL}/api/admin/users`, emptyConfig);
  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    error: ordersError,
    sendRequest: fetchOrders,
  } = useHttp(`${API_URL}/api/admin/orders`, emptyConfig);

  useEffect(() => {
    async function fetchAll() {
      await fetchUsers();
      await fetchOrders();
    }
    fetchAll();
  }, []);

  // Update local state whenever data changes
  useEffect(() => {
    if (usersData) setUsers(usersData.users);
  }, [usersData]);

  useEffect(() => {
    if (ordersData) setOrders(ordersData.orders);
  }, [ordersData]);

  console.log(usersData);

  return (
    <div className="admin">
      <div className="header">
        <div>
          <h1>Admin Dashboard</h1>
        </div>
      </div>

      <div className="navigation">
        <div>
          <nav>
            {navigationTabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}>
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div>
        {activeTab === "overview" && <Overview users={users} orders={orders} />}
        {activeTab === "orders" && <Order orders={orders} />}
        {activeTab === "users" && <Users users={users} />}
      </div>
    </div>
  );
};

export default Admin;
