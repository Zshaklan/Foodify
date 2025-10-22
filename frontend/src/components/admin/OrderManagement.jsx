const orderStatus = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const OrderManagement = () => {
  return (
    <div>
      {/* Order Management Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Manage Order: {selectedOrder.orderNumber}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Customer Information
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Name:</span>{" "}
                    {selectedOrder.user.fullName}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span>{" "}
                    {selectedOrder.user.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Address:</span>{" "}
                    {selectedOrder.deliveryAddress}
                  </p>
                </div>
              </div>

              {/* Order Details */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Order Details
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Items:</span>{" "}
                    {selectedOrder.items}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Total:</span> $
                    {selectedOrder.total}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Date:</span>{" "}
                    {selectedOrder.createdAt}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Current Status:</span>{" "}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
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
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Update Order Status
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {orderStatus.map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        updateOrderStatus(selectedOrder._id, status)
                      }
                      disabled={selectedOrder.status === status}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                        selectedOrder.status === status
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {getStatusIcon(status)}
                      <span className="capitalize">{status}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
