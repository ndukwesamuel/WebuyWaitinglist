import { useState, useEffect, useRef } from "react";
import { useGetUserOrderQuery } from "@/Redux/orderApi";
import OrderDetailCard from "../../Component/order/OrderDetailCard";
import Loader from "@/Component/Loader/Loader";

const OrdersPage = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const productContainerRef = useRef(null);

  useEffect(() => {
    if (productContainerRef.current) {
      productContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);
  const { data, isLoading, isError, error } = useGetUserOrderQuery({
    page,
    limit,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold text-red-600">
          Error loading orders
        </h2>
        <p className="text-gray-600">
          {error?.data?.message || "Please try again later"}
        </p>
      </div>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold">No orders found</h2>
        <p className="text-gray-600 mt-2">You haven't placed any orders yet.</p>
      </div>
    );
  }

  const orders = data.data;
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = data.pagination;

  return (
    <div
      className="container mx-auto px-4 py-8 max-w-4xl"
      ref={productContainerRef}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      {orders.map((order) => (
        <OrderDetailCard key={order._id} order={order} />
      ))}

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={!hasPrevPage}
          className={`px-4 py-2 rounded ${
            hasPrevPage
              ? "bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] text-white "
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasNextPage}
          className={`px-4 py-2 rounded ${
            hasNextPage
              ? "bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] text-white "
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersPage;
