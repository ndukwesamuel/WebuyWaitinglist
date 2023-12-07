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
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

import { Link } from "react-router-dom";
import {
  AllProduct_fun,
  GetUSerCart_Fun,
  UserOrders_fun,
} from "../../Redux/ProductSlice";
import ModalContainer, {
  Reusable_modal,
} from "../../Component/modal-container/modal-container";
import { Payment_fun } from "../../Redux/PaymentSlice";
const Base_URL = process.env.REACT_APP_Url;

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

const AllOrders = () => {
  const yproducts = [
    {
      id: 1,
      products: [
        {
          id: 1,
          name: "Product 1",
          category: "Electronics",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          price: 49.99,
        },
        // Add more products for Order 1
      ],
    },
    {
      id: 2,
      products: [
        {
          id: 2,
          name: "Product 2",
          category: "Clothing",
          description:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          price: 29.99,
        },
        // Add more products for Order 2
      ],
    },
    // Add more orders as needed
  ];
  const { AllProductData, isLoading, cart_data, userOrders_data } = useSelector(
    (state) => state?.reducer?.ProductSlice
  );
  const { All_User_orders } = useSelector((state) => state.reducer?.OrderSlice);

  console.log({ userOrders_data });
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const filtered = cart_data?.userCart?.items?.filter(
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
    const updatedCart = cartItems?.filter((item) => item?.id !== itemId);
    setCartItems(updatedCart);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems?.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    );
    setCartItems(updatedCart);
  };

  useEffect(() => {
    dispatch(UserOrders_fun());

    // i will remove the product

    return () => {};
  }, []);

  return (
    <div className="font-['Raleway']">
      <div className="w-full px-3 md:pl-20 mt-8 md:pr-14">
        <div className="flex flex-col w-full h-full p-5  mt-5 bg-white n rounded-xl ">
          <header className="w-full mb-5">
            <h1 className="text-[24px] leading-[34px] font-semibold text-[#009B4D]">
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

          <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            {yproducts.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;

// CartSummary.js
// src/components/OrderCard.js

const OrderCard = ({ order }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-4">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Order #{order.id}</h2>
        {order.products.map((product) => (
          <div key={product.id} className="mb-4">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {product.category}
            </div>
            <a
              href="#"
              className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >
              {product.name}
            </a>
            <p className="mt-2 text-gray-500">{product.description}</p>
            <div className="mt-2">
              <span className="text-gray-500">Price: ${product.price}</span>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <span className="text-gray-500 font-semibold">
            Total: ${calculateTotal(order.products)}
          </span>
        </div>
      </div>
    </div>
  );
};
const calculateTotal = (products) => {
  return products
    .reduce((total, product) => total + product.price, 0)
    .toFixed(2);
};
