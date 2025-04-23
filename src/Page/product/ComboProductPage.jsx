import React from "react";
import { useGetComboProductsQuery } from "../../Redux/ProductApi";
import ComboProductCard from "@/Component/product/ProductComboCard";
const ComboProductPage = () => {
  const { data: products, isLoading, isError } = useGetComboProductsQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(products);

  return (
    <div className="w-full flex justify-center">
      {!products || products.data.length === 0 ? (
        <h2 className="text-3xl font-extrabold text-[#007A3D] max-sm:text-4xl max-md:text-5xl">
          No Products Available
        </h2>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto md:p-4">
          {products.data.map((product, index) => (
            <ComboProductCard
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

export default ComboProductPage;
