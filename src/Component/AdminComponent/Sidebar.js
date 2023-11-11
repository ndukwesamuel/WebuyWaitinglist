import React, { useState } from "react";

import { FaTachometerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import image from "../../assets/images/Subtract.png";
import { useDispatch } from "react-redux";
import { Logout_fun } from "../../Redux/AutenticationSlice";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const showProductDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className=" bg-[#ffffff] h-full fixed top-0 left-0 font-['Raleway'] px-[25px]">
      <div className=" py-[15px] flex items-center justify-center border-b-[0.5px] border-[#000000]/[0.3] ">
        <a className="cursor-pointer " href="/">
          <h1 className="text-[21px] font-extrabold text-[#565454] max-sm:text-3xl max-md:text-4xl">
            WE
            <img
              className="inline-block w-[60px] mb-[4px] ml-[2px] "
              src={image}
              alt=""
            ></img>
          </h1>
        </a>
      </div>
      <div className="flex items-center gap-[15px] py-[15px] border-b-[0.5px] border-[#000000]/[0.3] cursor-pointer">
        <FaTachometerAlt className="text-[#565454] hover:text-[#009b4d]" />
        <Link
          to="/admin"
          className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-[16px] py-[15px] border-b-[0.5px] border-[#000000]/[0.3] cursor-pointer">
        <i className="fa-solid fa-bag-shopping text-[#565454]"></i>
        <Link
          to="/admin/orders"
          className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          Orders
        </Link>
      </div>
      <div className="flex items-center gap-[13px] py-[15px] border-b-[0.5px] border-[#000000]/[0.3] cursor-pointer">
        <i class="fa-solid fa-users text-[#565454]"></i>
        <Link
          to="/group/group-page"
          className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          Groups
        </Link>
      </div>
      <div className="flex items-center gap-[15px] py-[15px] border-b-[0.5px] border-[#000000]/[0.3] cursor-pointer">
        <i className="fa-solid fa-cart-shopping text-[#565454]"></i>
        <p className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d] ">
          Products
        </p>
        <i
          onClick={showProductDropdown}
          className="fa-solid fa-chevron-down fa-beat text-[10px] mt-1 -ml-1 text-[#565454]"
        ></i>

        {open && (
          <div className="bg-white border absolute left-[135px] top-[265px] z-50  space-y-[2px] w-[120px] p-3 pr-4 rounded-[8px]">
            <Link to="/Product-list">
              <p className="cursor-pointer text-[13px] text-[#565454] hover:text-[#009B4D] font-semibold">
                Product list
              </p>
            </Link>

            <Link to="/Add-products">
              <p className="cursor-pointer text-[#565454] text-[13px] hover:text-[#009B4D] font-semibold">
                Add products
              </p>
            </Link>
          </div>
        )}
      </div>
      <div className="flex items-center gap-[15px] py-[15px] border-b-[0.5px] border-[#000000]/[0.3] cursor-pointer">
        <i className="fa-solid fa-envelope text-[#565454]"></i>
        <p className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]">
          Messages
        </p>
      </div>
      <div className="pt-[15px] mt-[70px] border-b-[0.5px] border-[#000000]/[0.3]">
        <p className="text-[10px] font-extrabold leading-[16px] text-[#565454]/[0.4]">
          {" "}
          ADDONS
        </p>
        <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
          <div className="flex items-center gap-[10px]">
            <i className="fa-solid fa-circle-info text-[#565454]"></i>{" "}
            <p className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]">
              Help Center
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[10px] py-[15px]  cursor-pointer">
          <i className="fa-solid fa-gear text-[#565454]"></i>
          <p className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]">
            Settings
          </p>
        </div>
        <div className="flex items-center gap-[10px] py-[15px] cursor-pointer">
          <i className="fa-solid fa-arrow-right-from-bracket text-[#565454]"></i>{" "}
          <p
            onClick={() => {
              dispatch(Logout_fun());
              localStorage.clear();
              sessionStorage.clear();
              window.location.reload();
            }}
            className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
          >
            Log Out
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
