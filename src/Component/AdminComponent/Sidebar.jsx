import React, { useState } from 'react';

import { FaTachometerAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import image from '../../assets/images/Subtract.png';
import { Logout_fun } from '../../Redux/AuthenticationSlice';

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
          to="/admin/group-orders"
          className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          Orders
        </Link>
      </div>
      <div className="flex items-center gap-[13px] py-[15px] border-b-[0.5px] border-[#000000]/[0.3] cursor-pointer">
        <i className="fa-solid fa-users text-[#565454]"></i>
        <Link
          to="/admin/group"
          className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          Groups
        </Link>
      </div>

      <div className="flex items-center gap-[13px] py-[15px] border-b-[0.5px] border-[#000000]/[0.3] cursor-pointer">
        <i className="fa-solid fa-cart-shopping text-[#565454]"></i>

        <Link
          to="/admin/products"
          className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          Products
        </Link>
      </div>

      <div className="flex items-center gap-[13px] py-[15px] border-b-[0.5px] border-[#000000]/[0.3] cursor-pointer">
        <i className="fa-solid fa-users text-[#565454]"></i>
        <Link
          to="/admin/category"
          className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          Category
        </Link>
      </div>
      <div className="flex items-center gap-[13px] py-[15px] border-b-[0.5px] border-[#000000]/[0.3] cursor-pointer">
        <i className="fa-solid fa-users text-[#565454]"></i>
        <Link
          to="/admin/users"
          className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          Users
        </Link>
      </div>

      <div className="flex items-center ml-1 gap-[17px] py-[15px] border-b-[0.5px] border-[#000000]/[0.3] cursor-pointer">
        {/* <i className="fa-solid fa-users text-[#565454]"></i> */}
        <i className="fa-solid fa-receipt"></i>

        <Link
          to="/admin/receipt"
          className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          Receipt
        </Link>
      </div>

      <div className="pt-[15px] mt-[10px] border-b-[0.5px] border-[#000000]/[0.3]">
        <p className="text-[10px] font-extrabold leading-[16px] text-[#565454]/[0.4]">
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
