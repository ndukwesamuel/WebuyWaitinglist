import React, { useEffect, useState } from "react";
import {
  useGetCartQuery,
  useAddToCartMutation,
  useDecreaseItemMutation,
  useDeleteItemMutation,
} from "../../Redux/cartApi";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ShippingAddressForm from "@/Component/ShippingAddressForm";

const Cart = () => {
  const { data: cartData = {}, isLoading, refetch } = useGetCartQuery();
  const [addToCart] = useAddToCartMutation();
  const [decreaseItem] = useDecreaseItemMutation();
  const [deleteItem] = useDeleteItemMutation();
  const [paymentMode, setPaymentMode] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState("cart"); // cart -> address -> payment

  const userCart = cartData?.userCart || { items: [] };
  const cartItems = userCart.items || [];

  useEffect(() => {
    if (cartItems.length > 0) {
      const defaultChecked = {};
      cartItems.forEach((item) => {
        defaultChecked[item._id] = true;
      });
      setCheckedItems(defaultChecked);
    }
  }, [cartItems]);

  // Calculate subtotal based on checked items only
  const subtotal = cartItems.reduce((sum, item) => {
    if (checkedItems[item._id]) {
      return sum + item.productId.price * item.quantity;
    }
    return sum;
  }, 0);

  const total = subtotal + deliveryFee;

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleUpdateQuantity = async (id, type, productId) => {
    try {
      if (type === "increase") {
        await addToCart(productId).unwrap();
      } else {
        await decreaseItem(productId).unwrap();
      }
      refetch();
    } catch (err) {
      toast.error("Error updating quantity");
    }
  };

  const handleRemove = async (id, productId) => {
    try {
      await deleteItem(productId).unwrap();
      toast.success("Item removed");
      refetch();
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const handleProceedToCheckout = () => {
    // Make sure at least one item is selected
    if (!cartItems.some((item) => checkedItems[item._id])) {
      toast.error("Please select at least one item");
      return;
    }

    setCheckoutStep("address");
    setShowAddressForm(true);
  };

  const handleAddressSubmit = (address) => {
    setShippingAddress(address);
    setDeliveryFee(address.deliveryFee || 2000);
    setShowAddressForm(false);
    setCheckoutStep("payment");
    setPaymentMode(true);
  };

  const handleBackToCart = () => {
    setCheckoutStep("cart");
    setShowAddressForm(false);
  };

  const handleDeliveryFeeUpdate = (fee) => {
    setDeliveryFee(fee);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 w-full">
      {/* Cart Items */}
      {checkoutStep === "cart" && (
        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-[#4A9D44]">
              Shopping Cart ({cartItems.length} items)
            </h2>

            {isLoading ? (
              <p className="text-gray-600">Loading cart...</p>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => {
                  const { _id, productId, quantity } = item;
                  return (
                    <div
                      key={_id}
                      className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b"
                    >
                      {/* Checkbox */}
                      <div className="flex items-center mr-4 mb-2 sm:mb-0">
                        <input
                          type="checkbox"
                          checked={checkedItems[_id] || false}
                          onChange={() => handleCheckboxChange(_id)}
                          className="sr-only"
                          id={`checkbox-${_id}`}
                        />
                        <label
                          htmlFor={`checkbox-${_id}`}
                          className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border ${
                            checkedItems[_id]
                              ? "bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] border-transparent"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          {checkedItems[_id] && (
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

                      {/* Image */}
                      <div className="w-20 h-20 flex-shrink-0 mr-4 mb-2 sm:mb-0">
                        <img
                          src={productId.image}
                          alt={productId.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-grow">
                        <h3 className="font-medium text-lg">
                          {productId.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {productId.description}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                _id,
                                "decrease",
                                productId._id
                              )
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                          >
                            <span className="text-lg">-</span>
                          </button>
                          <span className="mx-3">{quantity}</span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                _id,
                                "increase",
                                productId._id
                              )
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                          >
                            <span className="text-lg">+</span>
                          </button>
                        </div>
                      </div>

                      {/* Price & Remove */}
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-lg text-[#4A9D44]">
                          ₦{(productId.price * quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleRemove(_id, productId._id)}
                          className="text-red-500 mt-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Address Form */}
      {checkoutStep === "address" && showAddressForm && (
        <div className="w-full lg:w-2/3">
          <ShippingAddressForm
            onAddressSubmit={handleAddressSubmit}
            onCancel={handleBackToCart}
            deliveryFeeCallback={handleDeliveryFeeUpdate}
          />
        </div>
      )}

      {/* Order Summary */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white rounded-lg shadow p-6 sticky top-4">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>₦{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span>₦{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>₦{total.toFixed(2)}</span>
            </div>
          </div>

          {shippingAddress && checkoutStep === "payment" && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-sm text-gray-700">
                Shipping to:
              </h3>
              <p className="text-sm">{shippingAddress.fullName}</p>
              <p className="text-sm">{shippingAddress.street}</p>
              <p className="text-sm">{shippingAddress.area}</p>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">
                  {shippingAddress.zoneName}
                </span>
                <button
                  className="text-xs text-[#4A9D44]"
                  onClick={() => {
                    setCheckoutStep("address");
                    setShowAddressForm(true);
                    setPaymentMode(false);
                  }}
                >
                  Change
                </button>
              </div>
            </div>
          )}

          {checkoutStep === "cart" ? (
            <button
              className="w-full bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              disabled={!cartItems.some((item) => checkedItems[item._id])}
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          ) : checkoutStep === "address" ? (
            <button
              className="w-full bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] text-white py-3 rounded-lg font-medium transition-colors opacity-50 cursor-not-allowed"
              disabled
            >
              Complete Address to Continue
            </button>
          ) : null}

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Shipping and taxes calculated at checkout</p>
          </div>
        </div>
      </div>

      {/* Payment method dialog */}
      <Dialog open={paymentMode} onOpenChange={setPaymentMode}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center">
              Pick your payment mode
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4 ">
            <div className="flex flex-col gap-2">
              <button
                className="w-full bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] text-white py-3 rounded-lg font-medium transition-colors"
                onClick={() => setPaymentMode(true)}
              >
                Pay from wallet
              </button>
              <button
                className="w-full bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] text-white py-3 rounded-lg font-medium transition-colors"
                onClick={() => setPaymentMode(true)}
              >
                Buy now pay later
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
