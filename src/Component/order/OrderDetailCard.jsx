const OrderDetailCard = ({ order }) => {
  const {
    orderId,
    products,
    shippingAddress,
    orderStatus,
    createdAt,
    deliveryDate,
    totalAmount,
    phone,
    paid,
  } = order;
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Order #{orderId}</h2>
          <p className="text-gray-600">
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <OrderStatus status={orderStatus} />
          <p className="text-sm mt-2">
            {paid ? (
              <span className="text-green-600 font-medium">Paid</span>
            ) : (
              <span className="text-red-600 font-medium">Unpaid</span>
            )}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-3">Order Items</h3>
        <div className="divide-y divide-gray-200">
          {products.map((p, index) => (
            <div key={index} className="py-3 flex items-center">
              <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={p.product.image}
                  alt={p.product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-medium text-gray-900">
                  {p.product.name}
                </h4>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-500">Qty: {p.quantity}</p>
                  <p className="text-sm font-medium text-gray-900">{p.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="mb-6 border-t border-gray-200 pt-4">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>{totalAmount}</span>
        </div>
      </div>

      {/* Shipping Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-200 pt-4">
        <div>
          <h3 className="text-sm font-medium text-gray-600">
            Shipping Address
          </h3>
          <p className="mt-1 text-sm">
            {shippingAddress.fullName}
            <br />
            {shippingAddress.address}
            {shippingAddress.additionalInfo && (
              <>
                <br />
                {shippingAddress.additionalInfo}
              </>
            )}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600">
            Delivery Information
          </h3>
          <p className="mt-1 text-sm">
            Phone: {phone}
            <br />
            Expected delivery:
            <br />
            {new Date(deliveryDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

const OrderStatus = ({ status }) => {
  const getStatusColor = () => {
    switch (status?.toLowerCase()) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
    >
      {status}
    </span>
  );
};

export default OrderDetailCard;
