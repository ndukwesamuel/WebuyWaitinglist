// src/JoinGroupForm.js
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
let main_url = import.meta.env.VITE_REACT_APP_Url;

function Create() {
  const { data, isLoading, isSuccess } = useSelector(
    (state) => state.reducer?.AuthenticationSlice
  );
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const createmutation = useMutation(
    (formData) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let API_URL = `${main_url}group`;

      const tokengot = data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${tokengot}`,
        },
      };

      console.log(config);
      return axios.post(API_URL, formData, config);

      //   return axios.post(API_URL, formData, config).catch((error) => {
      //     console.error("Network error:", error.message);
      //     throw error; // Rethrow the error to trigger onError in useMutation
      //   });
    },
    {
      onSuccess: () => {
        toast.success("Form submitted successfully!", {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the join group form submission logic here

    createmutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="groupName" className="block text-gray-600 mb-2">
          Group Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="memberName" className="block text-gray-600 mb-2">
          Description:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Join Group
      </button>
    </form>
  );
}

export default Create;
