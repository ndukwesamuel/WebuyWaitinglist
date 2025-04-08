import { Button, Card } from "flowbite-react";
import React, { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { useAddToCartMutation } from "../../Redux/cartApi";

const ProductCard = ({ ...product }) => {
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const { _id, name, price, rating, image } = product;
  const handleAddToCart = async () => {
    try {
      await addToCart(_id).unwrap();
      toast.success("Item added to cart!");
    } catch (err) {
      toast.error("Failed to add item to cart");
      console.error("Add to cart error:", err);
    }
  };

  return (
    <div className="w-50 rounded-lg overflow-hidden shadow-md bg-white">
      {/* Product image with favorite icon */}
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
      </div>

      {/* Product details */}
      <div className="p-4">
        {/* Name and rating */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {name}
          </h3>
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400" fill="currentColor" />
            <span className="ml-1 text-sm text-gray-600">{rating}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-lg font-bold text-gray-900">
            ₦{price.toLocaleString()}
          </p>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-full py-2 px-4 bg-green-700 hover:bg-green-800 text-white font-medium rounded-md flex items-center justify-center transition-colors duration-300 disabled:opacity-50"
        >
          <ShoppingCart size={18} className="mr-2" />
          {isLoading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
