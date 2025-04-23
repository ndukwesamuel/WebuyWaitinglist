import { useState } from "react";
import { Plus, Minus, ShoppingCart, Package } from "lucide-react";
import { useGetComboProductByIdQuery } from "@/Redux/ProductApi";
import { useGetCartQuery, useAddToCartMutation } from "../../Redux/cartApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function ComboProductDetail() {
  // Get productId or slug from URL params
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const {
    data: comboProduct,
    isLoading,
    error,
  } = useGetComboProductByIdQuery(id);
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
        Error loading combo product
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
      toast.success("Combo added to cart successfully");
      setIsAddingToCart(false);

      refetch();
    } catch (err) {
      toast.error("Failed to add combo to cart");
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-4 gap-8">
      {/* Product Image */}
      <div className="md:w-1/2">
        <div className="bg-gray-100 rounded-lg overflow-hidden h-96 flex items-center justify-center relative">
          <img
            src={comboProduct?.image || "/api/placeholder/500/500"}
            alt={comboProduct?.name || "Combo Product"}
            className="object-contain h-full w-full"
          />
          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <Package size={16} className="mr-1" />
            Combo
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="md:w-1/2 flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800">
          {comboProduct?.name || "Combo Name"}
        </h1>

        <div
          className="mt-4 text-lg font-medium text-green-600"
          style={{ color: "#009b4d" }}
        >
          ${comboProduct?.price?.toFixed(2) || "0.00"}
        </div>

        <div className="mt-4 text-gray-600">
          <p>{comboProduct?.description || "No description available"}</p>
        </div>

        {/* Combo Items List */}
        <div className="mt-6">
          <h2 className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
            <Package size={18} className="mr-2" />
            Items in this Combo:
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            {comboProduct?.items && comboProduct.items.length > 0 ? (
              <ol className="list-decimal pl-5 space-y-2">
                {comboProduct.items.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    <span className="font-medium">{item.name}</span>
                    {item.quantity > 1 && (
                      <span className="text-gray-500 ml-2">
                        x{item.quantity}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-500">No items information available</p>
            )}
          </div>
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
          onClick={() => handleAddToCart(comboProduct?._id)}
          className="mt-8 flex items-center justify-center gap-2 px-6 py-3 text-white rounded-md bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
        >
          {isAddingToCart ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <ShoppingCart size={20} />
              <span>Add Combo to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
