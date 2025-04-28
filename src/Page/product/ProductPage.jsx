import { useState, useRef, useEffect } from "react";
import { useGetAllProductQuery } from "../../Redux/ProductApi";
import ProductCard from "@/Component/product/ProductCard";
const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const { data, isLoading } = useGetAllProductQuery({ page, limit });
  const productContainerRef = useRef(null);

  useEffect(() => {
    if (productContainerRef.current) {
      productContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">Loading...</div>
    );
  }

  const { products, pagination } = data || { products: [], pagination: {} };
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
    <div
      className="w-full flex flex-col items-center"
      ref={productContainerRef}
    >
      {!products || products.length === 0 ? (
        <h2 className="text-3xl font-extrabold text-[#007A3D] max-sm:text-4xl max-md:text-5xl">
          No Products Available
        </h2>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto md:p-4">
            {products.map((product, index) => (
              <ProductCard
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
                  ? "bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] text-white "
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
                  ? "bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] text-white "
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

export default ProductPage;
