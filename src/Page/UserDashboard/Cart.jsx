import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      description:
        "Noise cancelling over-ear headphones with 30 hour battery life",
      price: 149.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
      checked: true,
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Fitness tracker with heart rate monitor and sleep tracking",
      price: 199.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
      checked: true,
    },
    {
      id: 3,
      name: "Portable Power Bank",
      description: "10,000mAh fast charging power bank with dual USB ports",
      price: 49.99,
      quantity: 2,
      image: "/api/placeholder/80/80",
      checked: false,
    },
  ]);

  const deliveryFee = 9.99;
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    deliveryFee: deliveryFee,
    total: 0,
  });

  // Update order summary whenever cart items change
  useEffect(() => {
    const subtotal = cartItems
      .filter((item) => item.checked)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

    setOrderSummary({
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: subtotal + deliveryFee,
    });
  }, [cartItems, deliveryFee]);

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Handle quantity change
  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 w-full">
      {/* Cart Items - Left Side */}
      <div className="w-full lg:w-2/3 bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            Shopping Cart ({cartItems.length} items)
          </h2>

          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b"
                >
                  {/* Checkbox */}
                  <div className="flex items-center mr-4 mb-2 sm:mb-0">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={`checkbox-${item.id}`}
                        checked={item.checked}
                        onChange={() => handleCheckboxChange(item.id)}
                        className="sr-only" // Hide the actual checkbox but keep functionality
                      />
                      <label
                        htmlFor={`checkbox-${item.id}`}
                        className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border ${
                          item.checked
                            ? "bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] border-transparent"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        {item.checked && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 mr-4 mb-2 sm:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow mb-2 sm:mb-0">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {item.description}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                      >
                        <span className="text-lg">-</span>
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                      >
                        <span className="text-lg">+</span>
                      </button>
                    </div>
                  </div>

                  {/* Price and Delete - Right Side */}
                  <div className="flex flex-col items-end mt-2 sm:mt-0">
                    <span className="font-bold text-lg text-[#4A9D44]">
                      #{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 mt-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Summary - Right Side */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white rounded-lg shadow p-6 sticky top-4">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>#{orderSummary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span>#{orderSummary.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>#{orderSummary.total.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            disabled={!cartItems.some((item) => item.checked)}
          >
            Proceed to Checkout
          </button>

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Shipping and taxes calculated at checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
