import React, { useState } from "react";
import background from "../../../assets/images/markus-spiske-ezYZfFnzARM-unsplash.jpg";
import Sidebar from "../../../Component/AdminComponent/Sidebar";
import Navbar from "../../../Component/AdminComponent/Navbar";
import { addCategoryApi } from "../../../Redux/AddCategoryApi";
import { useDispatch } from 'react-redux';



const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const [category, setCategory] = useState([
    {
      name: "Apple MacBook Pro 17\"",
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
                Add Category
              </h1>
              <p className="text-white uppercase text-[10px] font-extralight">
                webuy/product/add category
              </p>
            </header>
            <form className="w-full max-w-2xl-lg bg-white p-8 rounded shadow-lg overflow-y-auto h-24 min-h-full ">
              {/* Category Name */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Category Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="category"
                  value={categoryName}
                  onChange={handleCategoryNameChange}
                />
              </div>

              {/* Table */}
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 h-full">
              <table className="w-full text-sm text-left rtl:text-right text-black-500 dark:text-gray-400">
                <thead className="font-medium text-base text-[#565454]">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Category Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Colour
                    </th>
                    <th scope="col" className="px-6 py-3">
                      description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((category, index) => (
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
                      <td className="px-6 py-4 text-right">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>{" "}
                        |{" "}
                        <button
                          onClick={() => handleDeleteCategory(index)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
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
    </div>
  );
};

export default AddCategory;
