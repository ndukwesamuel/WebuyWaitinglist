import { useState } from "react";
import { useGetComboProductsQuery } from "../../Redux/ProductApi";
import ComboProductCard from "@/Component/product/ProductComboCard";
const ComboProductPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const { data, isLoading, isError } = useGetComboProductsQuery();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">Loading...</div>
    );
  }
  const { data: products, pagination } = data || {
    products: [],
    pagination: {},
  };
  const { currentPage, totalPages, hasNextPage, hasPrevPage } =
    pagination || {};

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (hasNextPage) {
      setPage(page + 1);
    }
  };
  return (
    <div className="w-full flex flex-col justify-center">
      {!products || products.length === 0 ? (
        <h2 className="text-3xl font-extrabold text-[#007A3D] max-sm:text-4xl max-md:text-5xl">
          No Products Available
        </h2>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto md:p-4">
            {products.map((product, index) => (
              <ComboProductCard
                key={index}
                {...product}
                productLink={`/dashboard/products/${
                  product.slug || product._id
                }`}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8 mb-6">
            <button
              onClick={handlePrevPage}
              disabled={!hasPrevPage}
              className={`px-4 py-2 rounded-md ${
                hasPrevPage
                  ? "bg-[#007A3D] text-white hover:bg-[#005a2d]"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Previous
            </button>

            <span className="text-lg">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={!hasNextPage}
              className={`px-4 py-2 rounded-md ${
                hasNextPage
                  ? "bg-[#007A3D] text-white hover:bg-[#005a2d]"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ComboProductPage;
