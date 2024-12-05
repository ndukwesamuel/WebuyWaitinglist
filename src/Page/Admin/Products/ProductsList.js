import React, { useEffect, useState } from "react";

import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { FaSearch, FaSlidersH } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// import Navbar from '../../../Component/ Navbar';
// import Sidebar from '../../components/Sidebar';
import background from "../../../assets/images/markus-spiske-ezYZfFnzARM-unsplash.jpg";
import Navbar from "../../../Component/AdminComponent/Navbar";
import Sidebar from "../../../Component/AdminComponent/Sidebar";
import { AllProduct_fun } from "../../../Redux/ProductSlice";

const Base_URL = process.env.REACT_APP_Url;

function ProductCard({ product }) {
  const { data } = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data
  );
  const dispatch = useDispatch();
  const token = data?.token;
  const delete_Product_mutate = useMutation(
    (formData) => {
      let API_URL = `${Base_URL}products/${formData}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return axios.delete(API_URL, config).catch((error) => {
        throw error; // Rethrow the error to trigger onError in useMutation
      });
    },
    {
      onSuccess: (response) => {
        const message = response?.data?.message || "Operation successful";

        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(AllProduct_fun());
      },
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.msg ||
          "An error occurred";
        toast.error(errorMessage, {
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

  return (
    <>
      <div className="rounded-xl font-['Raleway'] w-full border-[1.5px] mt-5 border-[#f3f3f3]">
        <div className="w-full">
          <img
            className="w-full h-[200px] rounded-xl"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="w-full p-3">
          <h2 className="name font-bold text-[#797d81]">{product.name}</h2>
          <p className="description text-sm text-[#707378]">
            {product.description}
          </p>
          <p className="text-lg font-extrabold price">{product.price}</p>
          {/* <p className="category">{product.category}</p> */}
        </div>

        <div className="flex justify-between p-3">
          {!delete_Product_mutate?.isLoading && (
            <>
              <MdDelete
                className=" text-2xl text-red-600 "
                onClick={() => {
                  const confirmed = window.confirm(
                    "Are you sure you want to delete this product?"
                  );

                  if (confirmed) {
                    delete_Product_mutate.mutate(product._id);
                  }
                }}
              />

              <Link
                to="/admin/Addproduct"
                state={product}
                className="mx- text-2xl text-green-600 "
              >
                <CiEdit />
              </Link>
            </>
          )}
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

const ProductsList = () => {
  const { AllProductData, isLoading } = useSelector(
    (state) => state?.reducer?.ProductSlice
  );
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

  let filtered;

  if (AllProductData?.message || AllProductData?.products?.length === 0) {
    filtered = [];
  } else {
    filtered = AllProductData?.filter(
      (product) =>
        product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product?.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  console.log({
    rer: filtered,
  });

  return (
    <div className="font-['Raleway']">
      <div className="relative w-full h-full">
        <img className="object-cover w-full h-full" src={background} alt="" />
      </div>
      <div className="absolute inset-0 flex">
        <div className="basis-[10%] h-full">
          <Sidebar />
        </div>
        <div className="basis-[90%]">
          <Navbar />
          <div className="w-full pl-20 mt-8 pr-14">
            <header className="w-full">
              <h1 className="text-[24px] leading-[34px] font-semibold text-white">
                Products
              </h1>
              <p className="text-white uppercase text-[10px] font-extralight">
                webuy/product/products
              </p>
            </header>
            <div
              className="flex flex-col w-full h-full p-5 mt-5 bg-white rounded-xl overflow-y-scroll max-h-[550px]"
              style={{
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div className="flex justify-end gap-5 my-3">
                <button
                  onClick={() => navigate("/admin/Addproduct")}
                  className="px-3 py-2 border-2 border-green-400 cursor-pointer rounded-2xl"
                >
                  Create product
                </button>
              </div>

              <div className="relative w-full">
                <input
                  className="w-full pl-8 pr-12 py-2 border-2 border-[#f3f3f3] rounded-full text-xs"
                  type="text"
                  name="search"
                  value={searchQuery}
                  placeholder="Search products..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c3c2c2] text-sm" />
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
      </div>
    </div>
  );
};

export default ProductsList;
