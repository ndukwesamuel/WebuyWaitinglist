import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FaInfoCircle,
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaFont,
  FaSortDown,
  FaAngleDown,
} from "react-icons/fa";
import Navbar from "../../../Component/AdminComponent/Navbar";
import Sidebar from "../../../Component/AdminComponent/Sidebar";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import axios from "axios";

const AddProducts = () => {
  const Base_URL = import.meta.env.VITE_REACT_APP_Url;
  let { state } = useLocation();
  console.log({ state });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState("");
  const { data } = useSelector(
    (state) => state.reducer.AuthenticationSlice || {}
  );
  const createProduct = useMutation(
    (formData) => {
      // Your API request code here
      // Use formData to send the image data to the API

      const token = data?.data?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (state) {
        let API_URL = `${Base_URL}products/${state._id}`;
        return axios.patch(API_URL, formData, config);
      } else {
        let API_URL = `${Base_URL}products`;

        return axios.post(API_URL, formData, config);
      }
    },
    {
      onSuccess: (data) => {
        toast.success(`${data?.data?.message}`, {
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

      onError: (e) => {
        toast.error(`${e?.response?.data?.message} `, {
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

  const handleSubmit = (formData) => {
    let formToSend = new FormData();
  };
  const countryOptions = [
    { label: "Nigeria", value: "NGA" },
    { label: "Ghana", value: "GHA" },
    { label: "Benin", value: "BEN" },
    { label: "Rwanda", value: "RWA" },
  ];

  const currencyOptions = [
    { value: "naira", label: "₦" },
    { value: "franc", label: "Fr" },
    { value: "rwandaFranc", label: "RWF" },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required."),
    description: Yup.string().required("Description is required."),
    price: Yup.number()
      .required("Price per unit is required.")
      .positive("Price must be a positive number."),
    image: Yup.mixed().required("Product image is required."),
    quantity: Yup.number().optional(),
    discount: Yup.number().optional(),
    currency: Yup.string().optional(),
    country: Yup.string().required("Country is required."),
  });
  const onImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setSelectedImagePreview(previewUrl);
      setSelectedImage(previewUrl);
    }
  };

  return (
    <div className=" font-['Raleway']">
      <div className="fixed top-0 left-0 w-full h-full">
        <img
          className="object-cover w-full h-full"
          src="background.jpg"
          alt=""
        />
      </div>
      <div className="absolute inset-0 flex">
        <div className="basis-[10%] h-full">
          <Sidebar />
        </div>
        <div className="basis-[90%]">
          <Navbar />
          <div className="w-full pl-20 my-8 pr-14">
            <header className="w-full">
              <h1 className="text-[24px] leading-[34px] font-semibold text-white">
                Add Product
              </h1>
              <p className="text-white uppercase text-[10px] font-extralight">
                webuy/product/add products
              </p>
            </header>

            <Formik
              initialValues={{
                name: state?.name || "",
                description: state?.description || "",
                price: state?.price || "",
                image: state?.image || "",
                quantity: state?.quantity || "",
                discount: state?.discount || "",
                currency: state?.currency || "",
                country: state?.country || "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("Submitted Values:", values);
              }}
            >
              {({ setFieldValue }) => (
                <Form>
                  <div className="flex flex-row content-center justify-between w-full h-full gap-6 mt-8">
                    {/* Product Image Section */}
                    <section className="w-full flex-col h-[510px] flex content-center p-5 bg-[#f5f6fa] rounded-xl cursor-pointer">
                      <header className="flex content-center justify-between w-full">
                        <h1 className="font-medium text-base text-[#565454]">
                          Product Image
                        </h1>
                        <FaInfoCircle style={{ color: "#565454" }} />
                      </header>
                      <div className="w-full mt-2 border-dashed border-[1px] flex rounded-lg flex-col content-center justify-center items-center border-[#cbc8c8]">
                        <label
                          htmlFor="imageInput"
                          className="flex items-center content-center justify-center w-full"
                        >
                          {selectedImagePreview ? (
                            <img
                              src={selectedImagePreview}
                              alt="Selected"
                              className="w-full h-full object-contain max-h-[293px] rounded-lg mb-4"
                            />
                          ) : (
                            <i
                              className="fa-regular fa-images mt-28"
                              style={{ color: "#727a89", fontSize: "25px" }}
                            ></i>
                          )}
                        </label>
                        <input
                          type="file"
                          id="imageInput"
                          accept="image/*"
                          name="image"
                          className="hidden"
                          onChange={(e) => {
                            onImageChange(e);
                            setFieldValue("image", e.target?.files[0]);
                          }}
                        />
                        <ErrorMessage
                          name="image"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                        {!selectedImage && (
                          <div className="flex items-center content-center gap-2 mt-2 pb-28">
                            <p className="text-xs text-[#727a89] font-semibold text-center">
                              Drop your Product Images here. or{" "}
                              <label
                                htmlFor="imageInput"
                                className="font-bold text-[#009b4d] text-sm cursor-pointer"
                              >
                                click to Browse
                              </label>
                            </p>
                          </div>
                        )}
                      </div>
                    </section>

                    {/* Form Section */}
                    <section className="flex flex-col content-center w-full h-full px-6 py-5 bg-white rounded-xl overflow-y-scroll max-h-[510px]">
                      {/* Product Name */}
                      <div className="flex flex-col w-full">
                        <label
                          htmlFor="name"
                          className="font-medium text-base text-[#565454]"
                        >
                          Product Name
                        </label>
                        <Field
                          type="text"
                          name="name"
                          id="name"
                          className="w-full pl-5 mt-2 bg-[#f6f6f6] text-[#6f6d6d] h-10 rounded-lg"
                          placeholder="Enter product name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      {/* Description */}
                      <div className="flex flex-col mt-6">
                        <label
                          htmlFor="description"
                          className="font-medium text-base text-[#565454]"
                        >
                          Description
                        </label>
                        <Field
                          as="textarea"
                          name="description"
                          id="description"
                          className="w-full mt-2 p-3 bg-[#f6f6f6] text-[#6f6d6d] rounded-lg"
                          placeholder="Enter product description"
                          rows={4}
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                      <div className="flex justify-between">
                        {/* Quantity */}
                        <div className="flex flex-col mt-6">
                          <label
                            htmlFor="quantity"
                            className="font-medium text-base text-[#565454]"
                          >
                            Quantity
                          </label>
                          <Field
                            type="number"
                            name="quantity"
                            id="quantity"
                            className="w-full pl-5 mt-2 bg-[#f6f6f6] text-[#6f6d6d] h-10 rounded-lg"
                            placeholder="Enter quantity"
                          />
                          <ErrorMessage
                            name="quantity"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        {/* Discount */}
                        <div className="flex flex-col mt-6">
                          <label
                            htmlFor="discount"
                            className="font-medium text-base text-[#565454]"
                          >
                            Discount
                          </label>
                          <Field
                            type="number"
                            name="discount"
                            id="discount"
                            className="w-full pl-5 mt-2 bg-[#f6f6f6] text-[#6f6d6d] h-10 rounded-lg"
                            placeholder="Enter discount"
                          />
                          <ErrorMessage
                            name="discount"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        {/* Price */}
                        <div className="flex flex-col mt-6">
                          <label
                            htmlFor="price"
                            className="font-medium text-base text-[#565454]"
                          >
                            Price per unit
                          </label>
                          <Field
                            type="number"
                            name="price"
                            id="price"
                            className="w-full pl-5 mt-2 bg-[#f6f6f6] text-[#6f6d6d] h-10 rounded-lg"
                            placeholder="Enter price per unit"
                          />
                          <ErrorMessage
                            name="price"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        {/* Country */}
                        <div className="flex flex-col mt-6">
                          <label
                            htmlFor="country"
                            className="font-medium text-base text-[#565454]"
                          >
                            Country
                          </label>
                          <Field
                            as="select"
                            name="country"
                            id="country"
                            className="w-full pl-5 pr-3 mt-2 bg-[#f6f6f6] text-[#6f6d6d] h-10 rounded-lg"
                          >
                            <option value="" disabled>
                              Select a country
                            </option>
                            {countryOptions.map((country) => (
                              <option key={country.value} value={country.value}>
                                {country.label}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="country"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="w-full max-w-[486px] flex content-center mt-6 justify-between">
                    <button
                      type="submit"
                      className="w-[100px] h-[36px] bg-[#009b4d] rounded-md text-sm text-white font-semibold uppercase"
                    >
                      Add Product
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
