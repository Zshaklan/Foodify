import "./Admin.css";
import { useEffect, useState } from "react";
import Overview from "./Overview.jsx";
import Order from "./Order.jsx";
import Users from "./Users.jsx";
import useHttp from "../../hooks/useHttp";

const navigationTabs = ["overview", "orders", "users"];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const {
    data: users,
    isLoading: isUsersLoading,
    error: usersError,
    sendRequest: fetchUsers,
  } = useHttp("http://localhost:5000/api/admin/users");
  const {
    data: orders,
    isLoading: isOrdersLoading,
    error: ordersError,
    sendRequest: fetchOrders,
  } = useHttp("http://localhost:5000/api/admin/orders");

  useEffect(() => {
    if (activeTab === "users") fetchUsers();
    if (activeTab === "orders") fetchOrders();
  }, [activeTab]);

  console.log(users, usersError);
  console.log(orders, ordersError);

  return (
    <div className="admin">
      {/* Header */}
      <div className="header">
        <div>
          <h1>Admin Dashboard</h1>
        </div>
      </div>

      {/* Navigation tabs  */}
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

      {/* Content  */}
      <div>
        {/* {activeTab === "overview" && <Overview />} */}
        {/* {activeTab === "orders" && <Order />} */}
        {/* {activeTab === "users" && <Users />} */}
      </div>
    </div>
  );
};

export default Admin;
