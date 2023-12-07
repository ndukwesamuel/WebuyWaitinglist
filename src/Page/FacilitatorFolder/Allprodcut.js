import React, { useEffect, useState } from "react";

import { FaSearch, FaSlidersH } from "react-icons/fa";
import { useMutation } from "react-query";
import axios from "axios";

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { Button, Card } from "flowbite-react";

import { Link } from "react-router-dom";
import { AllProduct_fun } from "../../Redux/ProductSlice";
const Base_URL = process.env.REACT_APP_Url;

function ProductCard({ product }) {
  const { token } = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(true);

  const createmutation = useMutation(
    (formData) => {
      let API_URL = `${Base_URL}cart/addItem`;

      console.log({ API_URL, formData });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      return axios.post(API_URL, formData, config);
    },
    {
      onSuccess: (data) => {
        console.log({ data });
        toast.success(`Product has been added to cart !`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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

  const handleAddToCart = () => {
    let formData = {
      productId: product?._id,
      quantity: "1",
      price: product?.price,
      name: product?.name,
    };

    createmutation.mutate(formData);
  };
  return (
    <>
      <Card className="w-full max-w-sm bg-white  border-white-200 rounded-3xl border-[1.5px] mt-5 shadow dark:bg-white-800 dark:border-gray-700 ">
        <div className="">
          <img
            className="rounded-t-lg
            w-full
        
  
        h-[178.9px]
        "
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
            {product?.name}
          </h5>
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 ">
              {[...Array(4)].map((_, index) => (
                <svg
                  key={index}
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
              <svg
                className="w-4 h-4 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </div>
            <span className="bg-black-100 text-black-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-white-200 dark:text-black-800 ms-3">
              {product?.description}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-black">
              ${product?.price}
            </span>
            <Button
              onClick={handleAddToCart}
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-light green-700 dark:focus:ring-green-800 mt-3 sm:mt-0"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </Card>
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

const Allprodcut = () => {
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

  return (
    <div className="font-['Raleway']">
      <div className="w-full xl:pl-20 mt-8 xl:pr-14">
        <div className="flex flex-col w-full h-full p-5  mt-5 bg-white n rounded-xl">
          <header className="w-full">
            <h1 className="text-[24px] leading-[34px] font-semibold text-black">
              Products
            </h1>
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
            {isLoading
              ? Array(4)
                  .fill()
                  .map((_, index) => <LoadingSkeleton key={index} />)
              : filtered?.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allprodcut;
