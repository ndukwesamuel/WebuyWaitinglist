import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";

import { FaSearch, FaSlidersH } from "react-icons/fa";
import { useMutation } from "react-query";
import axios from "axios";

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import { AllProduct_fun } from "../../Redux/ProductSlice";
const Base_URL = process.env.REACT_APP_Url;

function ProductCard({ product, name, price, description }) {
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
      <Card className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg mb-6">
        <a href="#">
          <img
            className="rounded-t-lg w-full"
            src={product.image}
            alt={product.name}
          />
        </a>
        <div className="p-5">
          <a href="#" className="text-green-800">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">
              {product?.name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-800">
              {`$${product.price?.toFixed(2)}`}
            </span>
          </div>
          <Button className=" rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700">
            ADD TO CART
            <svg
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
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
    // <div className="font-['Raleway']">
    //   <div className="relative w-full h-full">
    //     <img className="object-cover w-full h-full" src={background} alt="" />
    //   </div>
    //   <div className="absolute inset-0 flex">
    //     <div className="basis-[10%] h-full">
    //       <Sidebar />
    //     </div>
    //     <div className="basis-[90%]">
    //       <Navbar />

    //     </div>
    //   </div>
    // </div>

    <div className="font-['Raleway']">
      <div className="w-full pl-20 mt-8 pr-14">
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
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
