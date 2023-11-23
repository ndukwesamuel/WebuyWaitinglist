import React, { useEffect, useState } from "react";

import { FaSearch, FaSlidersH } from "react-icons/fa";
import { useMutation } from "react-query";
import axios from "axios";

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import { Link } from "react-router-dom";
import { AllProduct_fun } from "../../Redux/ProductSlice";
const Base_URL = process.env.REACT_APP_Url;

function ProductCard({ product }) {
  const { token } = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const delete_Product_mutate = useMutation(
    (formData) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let API_URL = `${Base_URL}products/${formData}`;
      console.log({ API_URL });

      const config = {
        headers: {
          // "Content-Type": "application/json",
          // Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // console.log(config);
      // return axios.post(API_URL, formData, config);

      return axios.delete(API_URL, config).catch((error) => {
        console.error("Network error:", error.message);
        throw error; // Rethrow the error to trigger onError in useMutation
      });

      //   return axios.post(API_URL, formData, config).catch((error) => {
      //     console.error("Network error:", error.message);
      //     throw error; // Rethrow the error to trigger onError in useMutation
      //   });
    },
    {
      onSuccess: (data) => {
        toast.success(`Product has been succefully deleted !`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log({ data });
        dispatch(AllProduct_fun());
      },
      onError: (error) => {
        console.error("Error occurred while submitting the form:", error);
        toast.error(`${error?.response?.data?.msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          className: "Forbidden403",
        });
      },
    }
  );

  const [showSuccess, setShowSuccess] = useState(true);

  const toggleSuccess = () => {
    setShowSuccess(!showSuccess);
    // dispatch(resetSignup());
  };
  return (
    <>
      <div className="rounded-xl font-['Raleway'] w-full border-[1.5px] mt-5 border-[#f3f3f3]">
        <div className="w-full">
          <img
            className="w-full rounded-xl"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="w-full p-3">
          <h2 className="name font-bold text-[#797d81]">{product.name}</h2>
          <p className="description text-sm text-[#707378]">
            {product.description}
          </p>
          <p className="text-lg font-extrabold price">${product.price}</p>
          <p className="category">{product.category}</p>
        </div>
      </div>
    </>
  );
}

const LoadingSkeleton = () => {
  return (
    <>
      <div className="rounded-xl font-['Raleway'] w-full border-[1.5px] mt-5 border-[#f3f3f3]">
        <div className="w-full bg-gray-200 animate-pulse">
          <div className="h-40"></div>
        </div>
        <div className="w-full p-3">
          <div className="h-4 mb-2 bg-gray-200 animate-pulse"></div>
          <div className="h-3 mb-2 bg-gray-200 animate-pulse"></div>
          <div className="h-8 mb-2 bg-gray-200 animate-pulse"></div>
          <div className="h-3 bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    </>
  );
};

const Cart = () => {
  const { AllProductData, isLoading } = useSelector(
    (state) => state?.reducer?.ProductSlice
  );

  console.log({ AllProductData });
  console.log({ AllProductData });
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a delay to show loading screens

    dispatch(AllProduct_fun());
  }, [dispatch]);

  const filtered = AllProductData?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Item 1",
      price: 10,
      quantity: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
      description: "Description for Item 1",
    },
    {
      id: 2,
      name: "Item 2",
      price: 15,
      quantity: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg",

      description: "Description for Item 2",
    },
    // Add your actual cart items here
  ]);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    );
    setCartItems(updatedCart);
  };

  return (
    <div className="font-['Raleway']">
      <div className="w-full pl-20 mt-8 pr-14">
        <div className="flex flex-col w-full h-full p-5  mt-5 bg-white n rounded-xl">
          <header className="w-full mb-5">
            <h1 className="text-[24px] leading-[34px] font-semibold text-black">
              Cart
            </h1>

            <hr />
          </header>
          <div className="relative w-full">
            <input
              className="w-full pl-8 pr-12 py-2 border-2 border-[#f3f3f3] rounded-xl text-xs"
              type="text"
              name="search"
              value={searchQuery}
              placeholder="Search products..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c3c2c2] text-xs" />
            <FaSlidersH className="absolute text-xs text-black transform -translate-y-1/2 right-4 top-1/2" />
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <div className="flex w-full justify-between">
            <div className="w-[70%]">
              <CartPage
                cartItems={cartItems}
                onRemoveItem={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
              />
            </div>
            <div className="w-[20%]">
              <CartSummary cartItems={cartItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

// CartSummary.js

const CartSummary = ({ cartItems }) => {
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="bg-gray-100 p-4 border">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${calculateTotalPrice()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping:</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">${calculateTotalPrice()}</span>
        </div>
      </div>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
        Checkout
      </button>
    </div>
  );
};

// CartPage.js

const CartPage = ({ cartItems, onRemoveItem, onUpdateQuantity }) => {
  return (
    <div className="container mx-auto my-8">
      {cartItems.length === 0 ? (
        <p className="text-center ">Your cart is empty</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          {cartItems.map((item, index) => (
            <li key={index} className="border p-4">
              <div className="flex items-center gap-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 rounded-md h-32 object-cover "
                />
                <div className="w-full">
                  <div className="flex gap-5">
                    <div className="w-[80%]">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-600">${item.price}</p>
                      <p className="text-gray-600">{item.description}</p>
                    </div>

                    <p
                      className="w-[20%]"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      $ {item.price * item.quantity}
                    </p>
                  </div>

                  <div className="flex w-full items-center  mt-5">
                    <div
                      className="flex items-center text-red-500 w-[80%] cursor-pointer"
                      //   className="text-red-500 hover:text-red-700"
                    >
                      <MdDeleteOutline
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      />
                      <p className="text-gray-600">Remove</p>
                    </div>

                    <div>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2  border bg-[#009B4D] rounded text-white"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2  border bg-[#009B4D] rounded text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
