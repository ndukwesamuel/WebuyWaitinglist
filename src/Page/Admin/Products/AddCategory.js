import React, { useEffect, useState } from "react";
import background from "../../../assets/images/markus-spiske-ezYZfFnzARM-unsplash.jpg";
import Sidebar from "../../../Component/AdminComponent/Sidebar";
import Navbar from "../../../Component/AdminComponent/Navbar";
import { addCategoryApi } from "../../../Redux/AddCategoryApi";
import { useDispatch, useSelector } from "react-redux";
import { Category_fun } from "../../../Redux/ProductSlice";
import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { IoAddCircleSharp } from "react-icons/io5";
import ModalContainer from "../../../Component/modal-container/modal-container";

const Base_URL = process.env.REACT_APP_Url;

const AddCategory = () => {
  const { token } = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data
  );
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const [category, setCategory] = useState([
    {
      name: 'Apple MacBook Pro 17"',
      colour: "Silver",
      description: "Laptop",
      price: "$2999",
    },
    {
      name: "Microsoft Surface Pro",
      colour: "White",
      description: "Laptop PC",
      price: "$1999",
    },
    {
      name: "Magic Mouse 2",
      colour: "Black",
      description: "Accessories",
      price: "$99",
    },
  ]);

  const [showSuccess, setShowSuccess] = useState(false);

  const toggleSuccess = () => {
    setShowSuccess(!showSuccess);
    // dispatch(resetSignup());
  };

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
    createmutation.mutate(name);
  };

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleDeleteCategory = (index) => {
    const updatedCategory = [...category];
    updatedCategory.splice(index, 1);
    setCategory(updatedCategory);
  };

  const handleAddCategory = () => {
    const newCategoryData = {
      name: categoryName,
      // Add other properties as needed (color, description, price, etc.)
    };

    dispatch(addCategoryApi(newCategoryData))
      .then(() => {
        // Optional: Handle success (e.g., clear form fields)
        setCategoryName("");
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        // Optional: Handle error
      });
  };

  const handleDelete = (category) => {
    let id = category._id;

    Deletemutation.mutate(id);
  };
  const { category_data } = useSelector((state) => state.reducer?.ProductSlice);

  console.log({ category_data });

  useEffect(() => {
    dispatch(Category_fun());

    return () => {};
  }, []);

  const Deletemutation = useMutation(
    (formData) => {
      let API_URL = `${Base_URL}category/${formData}`;
      console.log({ API_URL, formData });

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
      onSuccess: (data) => {
        toast.success(`category has been Deleted !`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(Category_fun());
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

  const createmutation = useMutation(
    (formData) => {
      let API_URL = `${Base_URL}category/`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let data = { name: formData };
      // return axios.post(API_URL, data);
      console.log({ API_URL, formData, data, token });

      if (edit) {
        return axios.put(API_URL, formData, config);
      } else {
        return axios.post(API_URL, data, config);
      }
    },
    {
      onSuccess: (data) => {
        toast.success(`category has been Created !`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(Category_fun());
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

  const handleEdit = (category) => {
    // let id = category._id;
    setShowSuccess(true);
    console.log({ category });
    setName(category?.name);

    // createmutation.mutate(id);
    // createmutation.mutate(category);
  };

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
          <div className="w-full pl-20 my-8 pr-14 h-24 min-h-full ">
            <header className="w-full ">
              <h1 className="text-[24px] leading-[34px] font-semibold text-white  ">
                Category
              </h1>
            </header>
            <form className="w-full max-w-2xl-lg bg-white p-8 rounded shadow-lg overflow-y-auto h-24 min-h-full ">
              <IoAddCircleSharp
                className="text-[50px]"
                onClick={() => {
                  setName("");
                  setShowSuccess(true);
                }}
              />

              {/* Table */}
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 h-full">
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
                    {category_data.map((category, index) => (
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
                        <td className="px-6 py-4">{category.colour}</td>
                        <td className="px-6 py-4">{category.description}</td>
                        <td className="px-6 py-4">{category.price}</td>
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
                  </tbody>
                </table>
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="flex content-center w-full mt-6 gap-8">
                <button
                  className="w-full bg-[#f3f3f3] text-[#009b4d] font-semibold py-2 rounded-lg"
                  type="submit"
                >
                  Cancel
                </button>
                <button
                  className="w-full bg-[#009b4d] text-white font-semibold py-2 rounded-lg"
                  type="submit"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ModalContainer close={toggleSuccess} show={showSuccess}>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded w-full py-2 px-3"
            />
          </div>

          {/* Repeat similar structure for other fields */}

          <div className="mb-4 flex justify-center">
            <button
              type="submit"
              className="bg-[#009B4D] text-white py-2 px-4 rounded hover:bg-[#009B4D] focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </ModalContainer>
    </div>
  );
};

export default AddCategory;
