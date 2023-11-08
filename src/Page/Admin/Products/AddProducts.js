import { useState } from "react";

import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaAngleDown,
  FaBold,
  FaChevronDown,
  FaFont,
  FaInfoCircle,
  FaItalic,
  FaPlusCircle,
  FaSortDown,
  FaUnderline,
} from "react-icons/fa";

import Navbar from "../../components/AdminComponent/Navbar";
import Sidebar from "../../components/AdminComponent/Sidebar";
import background from "../../images/gaelle-marcel-Y1kFBWWzOP4-unsplash.jpg";

const AddProducts = () => {
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(""); // State to store the input value
  const [selectedCurrency, setSelectedCurrency] = useState("dollar"); // Default currency

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  // Define a mapping of currency symbols

  const currencyOptions = [
    { value: "dollar", label: "$" },
    { value: "naira", label: "₦" },
    { value: "franc", label: "Fr" },
  ];

  return (
    <div className=" font-['Raleway']">
      <div className="relative w-full h-full">
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
          <div className=" mt-8 pl-20 pr-14 w-full h-full">
            <header className=" w-full">
              <h1 className=" text-[24px] leading-[34px] font-semibold text-white  ">
                Add Product
              </h1>
              <p className=" text-white uppercase text-[10px] font-extralight">
                webuy/product/add products
              </p>
            </header>
            <div className=" w-full h-full flex mt-8 flex-row content-center justify-between gap-6">
              <section className=" flex flex-col content-center gap-8">
                <div className="flex content-center items-center justify-center w-[150px] h-[150px] bg-white rounded-lg">
                  <FaPlusCircle size={"40"} style={{ color: "#009b4d" }} />
                </div>
                <div className="flex content-center items-center justify-center w-[150px] h-[150px] bg-white rounded-lg">
                  <FaPlusCircle size={"40"} style={{ color: "#009b4d" }} />
                </div>
                <div className="flex content-center items-center justify-center w-[150px] h-[150px] bg-white rounded-lg">
                  <FaPlusCircle size={"40"} style={{ color: "#009b4d" }} />
                </div>
                <div className="flex content-center items-center justify-center w-[150px] h-[150px] bg-white rounded-lg">
                  <FaPlusCircle size={"40"} style={{ color: "#009b4d" }} />
                </div>
              </section>
              <section className=" w-[350px] h-full bg-white rounded-lg"></section>
              <section className=" flex flex-col content-center w-[450px] h-full bg-white rounded-lg py-4 px-6">
                <div className=" w-full flex flex-col content-center">
                  <div className="w-full flex flex-row content-center justify-between">
                    <h2 className=" font-medium text-base text-[#565454]">
                      Product name
                    </h2>
                    <FaInfoCircle style={{ color: "#565454" }} />
                  </div>
                  <div className="w-full mt-2 text-center flex content-center items-center pl-5 text-[#009b4d] font-semibold bg-[#f6f6f6] h-10 rounded-lg">
                    <p className=" text-sm">Cat Fish Bundle</p>
                  </div>
                </div>
                <div className="w-full flex flex-col content-center mt-6">
                  <div className="w-full flex flex-row content-center justify-between">
                    <h2 className=" font-medium text-base text-[#565454]">
                      Description
                    </h2>
                    <FaInfoCircle style={{ color: "#565454" }} />
                  </div>
                  <div className=" w-full mt-2">
                    <div className=" w-full flex content-center items-center rounded-t-lg border-b-[1px] border-black h-[40px] py-2 bg-[#f3f3f3] px-5">
                      <FaFont />
                      <FaSortDown className=" ml-1" />
                      <div className=" w-[1.5px] mx-3 rounded-full h-full bg-[#cbc8c8]"></div>
                      <FaBold />
                      <FaItalic className=" mx-5" />
                      <FaUnderline />
                      <div className=" w-[1.5px] mx-3 rounded-full h-full bg-[#cbc8c8]"></div>
                      <FaAlignLeft />
                      <FaAlignCenter className=" mx-5" />
                      <FaAlignRight />
                      <FaAlignJustify className=" mx-5" />
                    </div>
                    <div className=" w-full h-auto rounded-b-lg bg-[#f3f3f3] p-5">
                      <p className=" text-[#6f6d6d] text-base">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Netus et malesuada fames ac turpis egestas
                        sed tempus. Aliquet nec ullamcorper sit amet risus
                        nullam. Duis tristique sollicitudin nibh sit.
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" w-full flex mt-6 content-center gap-11">
                  <div className=" w-full flex flex-col">
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
                  <div className=" w-full flex flex-col">
                    <h2 className="font-medium text-base text-[#565454]">
                      Category
                    </h2>
                    <div className="w-full mt-2 text-center flex content-center justify-between items-center px-5 text-[#6f6d6d] font-semibold bg-[#f6f6f6] h-10 rounded-lg">
                      <p className=" text-sm">Bag of seeds</p>
                      <FaChevronDown size={13} />
                    </div>
                  </div>
                </div>
                <div className=" w-full flex mt-6 content-center gap-11">
                  <div className=" w-full flex flex-col">
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
                  <div className=" w-full flex flex-col">
                    <h2 className="font-medium text-base text-[#565454]">
                      Discount
                    </h2>
                    <div className="w-full mt-2 text-center flex content-center justify-between items-center px-5 text-[#6f6d6d] font-semibold bg-[#f6f6f6] h-10 rounded-lg">
                      <p className=" text-sm">Bag of seeds</p>
                      <FaChevronDown size={13} />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
