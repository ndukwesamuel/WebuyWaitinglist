import { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useGetProductQuery } from "@/Redux/ProductApi";
import { useGetCartQuery, useAddToCartMutation } from "../Redux/cartApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
export default function ProductDetail() {
  // Get productId or slug from URL params
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { data: product, isLoading, error } = useGetProductQuery(id);
  const { data: cart, refetch } = useGetCartQuery();
  const [addToCart] = useAddToCartMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Error loading product
      </div>
    );
  }

  // Handle local quantity changes (no API calls)
  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Handle add to cart
  const handleAddToCart = async (productId) => {
    try {
      setIsAddingToCart(true);
      // Add to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        await addToCart(productId).unwrap();
      }
      toast.success("Added to cart successfully");
      setIsAddingToCart(false);

      refetch();
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-4 gap-8">
      {/* Product Image */}
      <div className="md:w-1/2">
        <div className="bg-gray-100 rounded-lg overflow-hidden h-96 flex items-center justify-center">
          <img
            src={product?.image || "/api/placeholder/500/500"}
            alt={product?.name || "Product"}
            className="object-contain h-full w-full"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="md:w-1/2 flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800">
          {product?.name || "Product Name"}
        </h1>

        <div
          className="mt-4 text-lg font-medium text-green-600"
          style={{ color: "#009b4d" }}
        >
          ${product?.price?.toFixed(2) || "0.00"}
        </div>

        <div className="mt-4 text-gray-600">
          <p>{product?.description || "No description available"}</p>
        </div>

        {/* Quantity Selector - now only updates local state */}
        <div className="mt-8 flex items-center">
          <span className="text-gray-700 mr-4">Quantity:</span>
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={() => handleQuantityChange("decrease")}
              className="px-3 py-2 hover:bg-gray-100"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-2 text-center w-12">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("increase")}
              className="px-3 py-2 hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => handleAddToCart(product?._id)}
          className="mt-8 flex items-center justify-center gap-2 px-6 py-3 text-white rounded-md bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors"
        >
          {isAddingToCart ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
