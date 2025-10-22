const RecentOrders = () => {
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
                <td>{order.orderNumber}</td>
                <td>{order.user.fullName}</td>
                <td>
                  <span>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </td>
                <td>${order.total}</td>
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
