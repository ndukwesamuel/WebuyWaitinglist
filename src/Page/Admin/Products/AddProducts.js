import { useState } from "react";

import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaAngleDown,
  FaBold,
  FaFont,
  FaInfoCircle,
  FaItalic,
  FaSortDown,
  FaUnderline,
} from "react-icons/fa";
import axios from "axios";

import Sidebar from "../../../Component/AdminComponent/Sidebar";
import Navbar from "../../../Component/AdminComponent/Navbar";

// import Navbar from '../../../Component/ Navbar';
// import Sidebar from '../../components/Sidebar';
import background from "../../../assets/images/markus-spiske-ezYZfFnzARM-unsplash.jpg";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation } from "react-router";
let local = process.env.REACT_APP_Local;

const Base_URL = process.env.REACT_APP_Url;

const AddProducts = ({}) => {
  let { state } = useLocation();

  console.log({ state });

  const [productName, setProductName] = useState(state?.name);
  const [productDescription, setProductDescription] = useState(
    state?.description
  );
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(state?.category);
  const [price, setPrice] = useState(state?.price); // State to store the input value
  const [selectedCurrency, setSelectedCurrency] = useState("dollar"); // Default currency
  const [selectedImage, setSelectedImage] = useState(state?.image);
  const [uploadimage, setUploadimage] = useState(null);
  // const [productID, setProductID] = useState(state?._id);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setUploadimage(file);
    }
  };

  const applyUppercase = () => {
    setProductDescription((prevDescription) => {
      if (prevDescription === prevDescription.toUpperCase()) {
        return prevDescription.toLowerCase(); // If text is already uppercase, make it normal
      } else {
        return prevDescription.toUpperCase(); // If text is not uppercase, make it uppercase
      }
    });
  };

  const applyBold = () => {
    const textarea = document.getElementById("myTextarea"); // Replace 'myTextarea' with the actual ID of your textarea
    textarea.classList.toggle("bold-text");
  };

  const applyItalic = () => {
    const textarea = document.getElementById("myTextarea");
    const currentFontStyle = getComputedStyle(textarea).fontStyle;
    textarea.style.fontStyle =
      currentFontStyle === "italic" ? "normal" : "italic";
  };

  const applyUnderline = () => {
    const textarea = document.getElementById("myTextarea"); // Replace 'myTextarea' with the actual ID of your textarea
    textarea.classList.toggle("underline-text");
  };

  const applyAlignment = (alignment) => {
    const textarea = document.getElementById("myTextarea"); // Replace 'myTextarea' with the actual ID of your textarea
    textarea.style.textAlign = alignment;
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDescription = (e) => {
    setProductDescription(e.target.value);
  };

  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
  };

  // Define a mapping of currency symbols

  const currencyOptions = [
    { value: "dollar", label: "$" },
    { value: "naira", label: "₦" },
    { value: "franc", label: "Fr" },
  ];

  const categoryOptions = [
    { value: "", label: "category", disabled: true, hidden: true },
    { value: "computers", label: "computers" },
    { value: "groceries", label: "groceries" },
  ];

  const { data } = useSelector((state) => state.reducer.AuthenticationSlice);

  const creatProduct = useMutation(
    (formData) => {
      // Your API request code here
      // Use formData to send the image data to the API

      const tokengot = data?.token;

      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          // Accept: "multipart/form-data",
          Authorization: `Bearer ${tokengot}`,
        },
      };

      if (state) {
        let API_URL = `${Base_URL}products/${state?._id}`;
        return axios.put(API_URL, formData, config);
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

        // dispatch(Talent_manager_details_Get_all_player_fun());
        console.log({ game: data });

        setProductName("");
        setProductDescription("");
        setQuantity("");
        setDiscount("");
        setPrice("");
        setSelectedCurrency("");
        setSelectedCategory("");
        setSelectedImage(null);
        setUploadimage(null);
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
        console.log({ game: e });
        console.log({ game: e?.response?.data?.message });
      },
    }
  );
  const handleAddProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (state) {
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("quantity", quantity);
      formData.append("discount", discount);
      formData.append("price", price);
      formData.append("currency", selectedCurrency);
      formData.append("category", "groceries");
      formData.append("image", uploadimage);
      formData.append("productId", state?._id);
    } else {
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("quantity", quantity);
      formData.append("discount", discount);
      formData.append("price", price);
      formData.append("currency", selectedCurrency);
      formData.append("category", "groceries");
      formData.append("image", uploadimage);
    }

    creatProduct.mutate(formData);
  };
  return (
    <div className=" font-['Raleway']">
      <div className="fixed top-0 left-0 w-full h-full">
        <img
          className="object-cover w-full h-full "
          src={background}
          alt=""
        ></img>
      </div>
      <div className="absolute inset-0 flex">
        <div className=" basis-[10%] h-full">
          <Sidebar />
        </div>
        <div className=" basis-[90%] ">
          <Navbar />
          <div className="w-full pl-20 my-8 pr-14">
            <header className="w-full ">
              <h1 className=" text-[24px] leading-[34px] font-semibold text-white  ">
                Add Product
              </h1>
              <p className=" text-white uppercase text-[10px] font-extralight">
                webuy/product/add products
              </p>
            </header>
            <form>
              <div className="flex flex-row content-center justify-between w-full h-full gap-6 mt-8 ">
                <section className="w-full flex-col h-[510px] flex content-center p-5  bg-[#f5f6fa] rounded-lg cursor-pointer">
                  <header className="flex content-center justify-between w-full ">
                    <h1 className="font-medium text-base text-[#565454]">
                      Product Image
                    </h1>
                    <FaInfoCircle style={{ color: "#565454" }} />
                  </header>
                  <div className=" w-full mt-2 border-dashed border-[1px] flex rounded-lg flex-col content-center justify-center items-center border-[#cbc8c8]">
                    <label
                      htmlFor="imageInput"
                      className="flex items-center content-center justify-center w-full"
                    >
                      {selectedImage ? (
                        <img
                          src={selectedImage}
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
                      className="hidden"
                      onChange={handleImageUpload}
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
                  <div className="flex flex-row content-center justify-between w-full gap-3 mt-3 ">
                    <div className="w-full border-dashed border-[1px] flex rounded-lg flex-col content-center justify-center items-center border-[#cbc8c8]">
                      <label
                        htmlFor="imageInput"
                        className="flex items-center content-center justify-center w-full"
                      >
                        {selectedImage ? (
                          <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-full h-full object-contain max-h-[111px] rounded-lg mb-4"
                          />
                        ) : (
                          <i
                            className="mt-8 fa-regular fa-images"
                            style={{ color: "#727a89", fontSize: "16px" }}
                          ></i>
                        )}
                      </label>
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      {!selectedImage && (
                        <div className="flex items-center content-center gap-2 pb-8 mt-2">
                          <p className="text-[8px] text-[#727a89] font-semibold text-center">
                            Drop your Product Images here. or{" "}
                            <label
                              htmlFor="imageInput"
                              className="font-bold text-[#009b4d] text-[9px] cursor-pointer"
                            >
                              click to Browse
                            </label>
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="w-full border-dashed border-[1px] p-0 flex rounded-lg flex-col content-center justify-center items-center border-[#cbc8c8]">
                      <label
                        htmlFor="imageInput"
                        className="flex items-center content-center justify-center w-full"
                      >
                        {selectedImage ? (
                          <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-full h-full object-contain max-h-[111px] rounded-lg mb-4"
                          />
                        ) : (
                          <i
                            className="fa-regular fa-images"
                            style={{ color: "#727a89", fontSize: "16px" }}
                          ></i>
                        )}
                      </label>
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      {!selectedImage && (
                        <div className="flex items-center content-center gap-2 mt-2">
                          <p className="text-[8px] text-[#727a89] font-semibold text-center">
                            Drop your Product Images here. or{" "}
                            <label
                              htmlFor="imageInput"
                              className="font-bold text-[#009b4d] text-[9px] cursor-pointer"
                            >
                              click to Browse
                            </label>
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="w-full border-dashed border-[1px] p-0 flex rounded-lg flex-col content-center justify-center items-center border-[#cbc8c8]">
                      <label
                        htmlFor="imageInput"
                        className="flex items-center content-center justify-center w-full"
                      >
                        {selectedImage ? (
                          <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-full h-full object-contain max-h-[111px] rounded-lg mb-4"
                          />
                        ) : (
                          <i
                            className="fa-regular fa-images"
                            style={{ color: "#727a89", fontSize: "16px" }}
                          ></i>
                        )}
                      </label>
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      {!selectedImage && (
                        <div className="flex items-center content-center gap-2 mt-2">
                          <p className="text-[8px] text-[#727a89] font-semibold text-center">
                            Drop your Product Images here. or{" "}
                            <label
                              htmlFor="imageInput"
                              className="font-bold text-[#009b4d] text-[9px] cursor-pointer"
                            >
                              click to Browse
                            </label>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
                <section className="flex flex-col content-center w-full h-full px-6 py-5 bg-white rounded-lg ">
                  <div className="flex flex-col content-center w-full ">
                    <div className="flex flex-row content-center justify-between w-full">
                      <h2 className=" font-medium text-base text-[#565454]">
                        Product name
                      </h2>
                      <FaInfoCircle style={{ color: "#565454" }} />
                    </div>
                    <div className="flex items-center content-center w-full mt-2 text-center ">
                      <input
                        className=" w-full pl-5 text-[#009b4d] text-sm font-semibold bg-[#f6f6f6] h-10 rounded-lg"
                        placeholder="Product name"
                        type="text"
                        name="product"
                        value={productName}
                        onChange={handleProductNameChange}
                      ></input>
                    </div>
                  </div>
                  <div className="flex flex-col content-center w-full mt-6">
                    <div className="flex flex-row content-center justify-between w-full">
                      <h2 className=" font-medium text-base text-[#565454]">
                        Description
                      </h2>
                      <FaInfoCircle style={{ color: "#565454" }} />
                    </div>
                    <div className="w-full mt-2 ">
                      <div className="w-full flex content-center items-center rounded-t-lg border-b-[1px] border-black h-[40px] py-2 bg-[#f3f3f3] px-5">
                        <button onClick={applyUppercase}>
                          <FaFont />
                        </button>
                        <FaSortDown className="ml-1" />
                        <div className="divider w-[1.5px] mx-3 rounded-full h-full bg-[#cbc8c8]"></div>
                        <button onClick={applyBold}>
                          <FaBold />
                        </button>
                        <button onClick={applyItalic}>
                          <FaItalic className="mx-5" />
                        </button>
                        <button onClick={applyUnderline}>
                          <FaUnderline />
                        </button>
                        <div className="divider w-[1.5px] mx-3 rounded-full h-full bg-[#cbc8c8]"></div>
                        <button onClick={() => applyAlignment("left")}>
                          <FaAlignLeft />
                        </button>
                        <button onClick={() => applyAlignment("center")}>
                          <FaAlignCenter className="mx-5" />
                        </button>
                        <button onClick={() => applyAlignment("right")}>
                          <FaAlignRight />
                        </button>
                        <button onClick={() => applyAlignment("justify")}>
                          <FaAlignJustify className="mx-5" />
                        </button>
                      </div>
                      <div className=" w-full rounded-b-lg bg-[#f3f3f3]">
                        <textarea
                          id="myTextarea"
                          className="w-full h-full p-3 bg-[#f3f3f3] text-[#6f6d6d] text-sm rounded-b-lg"
                          placeholder="Product description"
                          value={productDescription}
                          onChange={handleProductDescription}
                          rows={4}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="flex content-center w-full mt-6 gap-11">
                    <div className="flex flex-col w-full ">
                      <h2 className="font-medium text-base text-[#565454]">
                        Quantity
                      </h2>
                      <input
                        className=" w-full h-10 bg-[#f6f6f6] text-[#6f6d6d] pl-5 rounded-lg mt-2"
                        placeholder="no of quantity"
                        type="number"
                        name="quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                      ></input>
                    </div>
                    <div className="flex flex-col w-full ">
                      <h2 className="font-medium text-base text-[#565454]">
                        Category
                      </h2>
                      <div className="relative mt-2">
                        <select
                          className="w-full pl-5 pr-10 h-10 bg-[#f6f6f6] text-[#6f6d6d] rounded-lg"
                          value={selectedCategory}
                          onChange={handleCategoryChange}
                        >
                          {categoryOptions.map((option) => (
                            <option
                              key={option.value}
                              disabled={option.disabled}
                              hidden={option.hidden}
                              value={option.value}
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex content-center w-full mt-6 gap-11">
                    <div className="flex flex-col w-full ">
                      <h2 className="font-medium text-base text-[#565454]">
                        Price per unit
                      </h2>
                      <div className="relative mt-2">
                        <input
                          className="w-full h-10 bg-[#f6f6f6] text-[#6f6d6d] pl-5 rounded-lg pr-10"
                          placeholder="Price per unit"
                          type="number"
                          name="price"
                          value={price}
                          onChange={handlePriceChange}
                        />
                        <div className="absolute right-2 top-2">
                          <FaAngleDown size={20} style={{ color: "#6f6d6d" }} />
                        </div>
                        <select
                          className="absolute right-0 w-10 h-10 bg-[#f6f6f6] text-[#6f6d6d] rounded-r-lg"
                          value={selectedCurrency}
                          onChange={handleCurrencyChange}
                        >
                          {currencyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col w-full ">
                      <h2 className="font-medium text-base text-[#565454]">
                        Discount
                      </h2>
                      <input
                        className=" w-full h-10 bg-[#f6f6f6] text-[#6f6d6d] pl-5 rounded-lg mt-2"
                        placeholder="discount"
                        type="number"
                        name="discount"
                        value={discount}
                        onChange={handleDiscountChange}
                      ></input>
                    </div>
                  </div>
                </section>
              </div>
            </form>
            <div className=" w-full max-w-[486px] flex flex-row content-center items-center gap-8 mt-4">
              <button
                className="w-full bg-[#f3f3f3] text-[#009b4d] font-semibold py-2 rounded-lg"
                type="submit"
              >
                Discard
              </button>
              {selectedImage && (
                <button
                  className=" w-full bg-[#009b4d] text-white font-semibold py-2 rounded-lg"
                  // type="submit"
                  onClick={handleAddProduct}
                >
                  {creatProduct?.isLoading ? "Loading..." : "Add Product"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
