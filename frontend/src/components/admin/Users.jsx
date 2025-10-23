import { FaTrashAlt } from "react-icons/fa";
import "./Users.css";
import useHttp from "../../hooks/useHttp";
import { useState } from "react";
import { VITE_API_URL } from "../../config/api.js";

const Users = ({ users: initialUsers }) => {
  const [users, setUsers] = useState(initialUsers);
  const { sendRequest: toggleStatusRequest } = useHttp();
  const { sendRequest: deleteUserRequest } = useHttp();

  const toggleUserStatus = async (userId) => {
    try {
      await toggleStatusRequest(
        `${VITE_API_URL}/api/admin/users/${userId}/toggle-status`,
        {
          method: "PATCH",
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isActive: !user.isActive } : user
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to toggle user status");
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await deleteUserRequest(
        `${VITE_API_URL}/api/admin/users/${userId}/delete`,
        {
          method: "DELETE",
        }
      );
      console.log(res);

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="users-container">
      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Orders</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.totalOrders || 0}</td>
                <td>
                  <span
                    className={`status-badge ${
                      user.isActive ? "active" : "inactive"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="actions">
                  <button
                    onClick={() => toggleUserStatus(user._id)}
                    className={`action-btn ${
                      user.isActive ? "deactivate" : "activate"
                    }`}
                  >
                    {user.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="action-btn delete-btn"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
