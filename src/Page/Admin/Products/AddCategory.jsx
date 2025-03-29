import React, { useEffect, useState } from "react";

import axios from "axios";
import { IoAddCircleSharp } from "react-icons/io5";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import background from "../../../assets/images/markus-spiske-ezYZfFnzARM-unsplash.jpg";
import Navbar from "../../../Component/AdminComponent/Navbar";
import Sidebar from "../../../Component/AdminComponent/Sidebar";
import ModalContainer from "../../../Component/modal-container/modal-container";
import { useGetCategoryQuery } from "../../../Redux/categoryApi";

const Base_URL = import.meta.env.VITE_REACT_APP_Url;

const AddCategory = () => {
  const { token } = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data
  );
  const {
    data: category_data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCategoryQuery();

  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [showSuccess, setShowSuccess] = useState(false);

  const toggleSuccess = () => {
    setShowSuccess(!showSuccess);
  };

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");

  const handleDelete = (category) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    let id = category._id;
    if (confirmed) {
      Deletemutation.mutate(id);
    }
  };

  const Deletemutation = useMutation(
    (formData) => {
      let API_URL = `${Base_URL}category/${formData}`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      return axios.delete(API_URL, config);
    },
    {
      onSuccess: (response) => {
        toast.success(`${response?.data?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        refetch();
      },
      onError: (error) => {
        toast.error(
          `${error?.response?.data?.message}` ||
            `${error?.response?.data?.msg}`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            className: "Forbidden403",
          }
        );
      },
    }
  );

  const [createLoading, setCreateLoading] = useState(false);
  const createmutation = useMutation(
    async ({ id, name }) => {
      let API_URL = `${Base_URL}category`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let data = { name };
      setCreateLoading(true);
      if (edit) {
        const PUT_URL = `${API_URL}/${id}`;
        return await axios.put(PUT_URL, data, config);
      } else {
        return await axios.post(API_URL, data, config);
      }
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
        setCreateLoading(false);
        refetch();
      },
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.message || "An error occurred";
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
        setCreateLoading(false);
      },
    }
  );

  const handleEdit = (category) => {
    setShowSuccess(true);
    setSelectedCategory(category);
    setName(category?.name);
    setEdit(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    createmutation.mutate({ id: selectedCategory._id, name });
  };

  useEffect(() => {}, [category_data]);

  return (
    <div className="font-['Raleway']">
      <div className="fixed top-0 left-0 w-full h-full">
        <img className="object-cover w-full h-full" src={background} alt="" />
      </div>
      <div className="absolute inset-0 flex">
        <div className="basis-[10%] h-full">
          <Sidebar />
        </div>
        <div className="basis-[90%] ">
          <Navbar />
          <div className="w-full h-24 min-h-full pl-20 my-8 rounded-xl pr-14 ">
            <header className="w-full ">
              <h1 className="text-[24px] leading-[34px] font-semibold text-white  ">
                Category
              </h1>
            </header>
            <form className="w-full p-8 mt-4 bg-white shadow-lg rounded-xl max-w-2xl-lg ">
              <IoAddCircleSharp
                className="text-[50px]"
                onClick={() => {
                  setName("");
                  setShowSuccess(true);
                }}
              />

              {/* Table */}
              <div
                className="relative h-full mt-8 overflow-x-auto shadow-md sm:rounded-lg overflow-y-scroll max-h-[400px]"
                style={{
                  overflowY: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <table className="w-full text-sm text-left rtl:text-right text-black-500 dark:text-gray-400">
                  <thead className="font-medium text-base text-[#565454]">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Category Name
                      </th>

                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && <p>Loading...</p>}
                    {isError && <p>{error}</p>}

                    {console.log({
                      category_data,
                    })}

                    {category_data?.message === "No category created yet" ? (
                      <div>
                        <p>No category created yet</p>
                      </div>
                    ) : (
                      <>
                        {category_data &&
                          category_data.map((category, index) => (
                            <tr
                              key={index}
                              className="bg-white border-b dark:bg-white-800 dark:border-white-700"
                            >
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-black-900 whitespace-nowrap dark:text-black"
                              >
                                {category.name}
                              </th>
                              <td className="px-6 py-4">
                                <button
                                  type="button"
                                  onClick={() => handleEdit(category)}
                                  className="font-medium text-blue-600 dark:text-blue-500 "
                                >
                                  Edit
                                </button>
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  type="button"
                                  onClick={() => handleDelete(category)}
                                  className="font-medium text-red-600 dark:text-red-500 "
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Submit and Cancel Buttons */}
              {/* <div className="flex content-center w-full gap-8 mt-6">
                <button
                  className="w-full bg-[#f3f3f3] text-[#009b4d] font-semibold py-2 rounded-lg"
                  type="submit"
                >
                  Cancel
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </div>

      <ModalContainer close={toggleSuccess} show={showSuccess}>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Category name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="bg-[#009B4D] text-white py-2 px-4 rounded hover:bg-[#009B4D] focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              {createLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-t-2 border-[#4f7942] border-solid rounded-full animate-spin" />
                </div>
              ) : (
                <>Submit </>
              )}
            </button>
          </div>
        </form>
      </ModalContainer>
    </div>
  );
};

export default AddCategory;
