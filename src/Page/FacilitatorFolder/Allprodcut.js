import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  FaSearch,
  FaSlidersH,
} from 'react-icons/fa';
import { useMutation } from 'react-query';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { AllProduct_fun } from '../../Redux/ProductSlice';

const Base_URL = process.env.REACT_APP_Url;

function ProductCard({ product }) {
  const { token } = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(true);
  const [selected, setSelected] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

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

  

  const handleCardClick = () => {
    // Toggle the selected card by its ID
    setSelectedCard(product._id === selectedCard ? null : product._id);

    // Add product to cart if it's not already selected
    if (product._id !== selectedCard) {
      let formData = {
        productId: product._id,
        quantity: "1",
        price: product.price,
        name: product.name,
      };
      createmutation.mutate(formData);
      setCart([...cart, product]);
    }
  };

  // PRODUCT CARD //
  
  return (
    <>
      <div
        className={`relative w-full h-[400px] cursor-pointer shadow-md border-[1px] hover:border-[1px] hover:border-[#009b4d] border-[#c7c6c6] rounded-3xl mt-5 ${
          product._id === selectedCard ? "border-[#009b4d]" : ""
        }`}
        onClick={handleCardClick}
      >
        {product._id === selectedCard && (
          <div className="w-5 h-5 bg-[#009b4d] rounded-full absolute right-5 top-5 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="white"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 0a9.995 9.995 0 0 1 7.527 17.073l-8.527 2.33-8.527-2.33A9.995 9.995 0 0 1 10 0zm0 17.75a7.75 7.75 0 1 0 0-15.5 7.75 7.75 0 0 0 0 15.5zm3.222-9.972l-5.472 5.472-2.25-2.25a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.449-.033l6-6a1 1 0 1 0-1.414-1.414z"
              />
            </svg>
          </div>
        )}
        <div className="w-full ">
          <img
            className="rounded-3xl object-cover w-full h-[280px]
        "
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="w-full px-4 py-3 ">
          <h5 className="text-lg font-semibold tracking-wide text-gray-900 dark:text-black">
            {product?.name}
          </h5>
          <div className="flex items-center">
            <span className="text-sm text-[#3d3d4e] font-semibold ">
              {product?.description}
            </span>
          </div>
          <div className="flex flex-col items-center justify-between mt-1 sm:flex-row">
            <span className="text-2xl font-bold">${product?.price}</span>
            {/* <Button
              onClick={handleAddToCart}
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-light green-700 dark:focus:ring-green-800 mt-3 sm:mt-0"
            >
              Add to cart
            </Button> */}
          </div>
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
      <div className="w-full mt-0 px-14">
        <header className="w-full mt-5">
          <h1 className="text-[34px] leading-[34px] font-black text-black">
            Products
          </h1>
        </header>
        <div className="flex flex-col w-full h-full p-6 mt-5 bg-white rounded-3xl">
          <div className="relative w-full">
            <input
              className="w-full pl-8 pr-12 py-3 border-2 border-[#f3f3f3] rounded-xl text-xs"
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
          <div
            className="grid h-[500px] overflow-y-scroll w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 "
            style={{
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
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
