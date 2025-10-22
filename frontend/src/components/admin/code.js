const [activeTab, setActiveTab] = useState("overview");
const [users, setUsers] = useState([]);
const [orders, setOrders] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [filterStatus, setFilterStatus] = useState("all");
const [selectedOrder, setSelectedOrder] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

// Fetch data (replace with your actual API calls)
useEffect(() => {
  fetchUsers();
  fetchOrders();
}, []);

const fetchUsers = async () => {};

const fetchOrders = async () => {};

const updateOrderStatus = async (orderId, newStatus) => {
  // Replace with actual API call
  // await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ status: newStatus })
  // });

  setOrders(
    orders.map((order) =>
      order._id === orderId ? { ...order, status: newStatus } : order
    )
  );
  setIsModalOpen(false);
};

const toggleUserStatus = async (userId) => {
  // Replace with actual API call
  // await fetch(`http://localhost:5000/api/admin/users/${userId}/toggle-status`, { method: 'PUT' });

  setUsers(
    users.map((user) =>
      user._id === userId ? { ...user, isActive: !user.isActive } : user
    )
  );
};

const deleteUser = async (userId) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  // Replace with actual API call
  // await fetch(`http://localhost:5000/api/admin/users/${userId}`, { method: 'DELETE' });

  setUsers(users.filter((user) => user._id !== userId));
};

const stats = {
  totalUsers: users.length,
  activeUsers: users.filter((u) => u.isActive).length,
  totalOrders: orders.length,
  totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
  pendingOrders: orders.filter((o) => o.status === "pending").length,
};

const filteredOrders = orders.filter((order) => {
  const matchesSearch =
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user.fullName.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesFilter = filterStatus === "all" || order.status === filterStatus;
  return matchesSearch && matchesFilter;
});

const getStatusColor = (status) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const getStatusIcon = (status) => {
  const icons = {
    pending: <Clock className="w-4 h-4" />,
    processing: <Package className="w-4 h-4" />,
    shipped: <Truck className="w-4 h-4" />,
    delivered: <CheckCircle className="w-4 h-4" />,
    cancelled: <XCircle className="w-4 h-4" />,
  };
  return icons[status] || <Clock className="w-4 h-4" />;
};
