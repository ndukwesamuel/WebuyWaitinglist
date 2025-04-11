// ProductList.jsx
import React from "react";
import { useGetAllProductQuery } from "../Redux/ProductApi";
import ProductCard from "@/Component/product/ProductCard";
import { Link } from "react-router-dom";

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
            <ProductCard
              key={index}
              {...product}
              productLink={`/dashboard/products/${product.slug || product._id}`}
            />
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
