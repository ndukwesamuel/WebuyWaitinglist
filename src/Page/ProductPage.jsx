import React from "react";
import { useGetAllProductQuery } from "../Redux/ProductApi";
import ProductCard from "@/Component/product/ProductCard";

const ProductList = () => {
  const { data: products, isLoading } = useGetAllProductQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex justify-center">
      {!products || products.length === 0 ? (
        <h2 className="text-3xl font-extrabold text-[#007A3D] max-sm:text-4xl max-md:text-5xl">
          No Products Available
        </h2>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto md:p-4">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

const ProductPage = () => (
  <div className="font-['Raleway'] bg-[#ffffff] w-full">
    <ProductList />
  </div>
);

export default ProductPage;

<>
  {/* <div className="text-center my-6">
        <h2 className="text-3xl font-extrabold text-[#007A3D] max-sm:text-4xl max-md:text-5xl">
          Discover Our Products
        </h2>
      </div> */}
  {/* <form className="w-full bg-gradient-to-r from-[#f7f7f7] via-white to-[#f7f7f7] dark:bg-gradient-to-r from-white via-[#121212] to-[#121212] text-black dark:text-white p-6 rounded-lg shadow-lg">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-base font-semibold text-gray-900 border border-white-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Products"
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-gradient-to-r from-[#007A3D] via-[#006935] to-[#005D27] hover:from-[#005D27] hover:via-[#004E23] hover:to-[#00431F] focus:ring-4 focus:outline-none focus:ring-[#00A859] font-medium rounded-lg text-sm px-6 py-2 dark:bg-gradient-to-r from-[#005D27] via-[#004E23] to-[#00431F] dark:hover:from-[#007A3D] dark:hover:via-[#006935] dark:hover:to-[#005D27] dark:focus:ring-[#00A859]"
          >
            Search
          </button>
        </div>
      </form> */}
</>;
