import React, { useState } from "react";
import { Link } from "react-router-dom";
import image from "../../assets/images/Subtract.png";
import { useDispatch } from "react-redux";
import { Logout_fun } from "../../Redux/AuthenticationSlice";

const UserSidebar = ({ lang, setLang }) => {
  const dispatch = useDispatch();

  return (
    <div className=" bg-[#ffffff] h-screen font-['Raleway'] px-[25px]">
      <div className="flex items-center ml-[10px] pt-[8rem] gap-[15px] py-[15px]  cursor-pointer">
        <i className="fa-solid fa-house text-[#565454]"></i>
        <Link
          // to="/dashboard"
          to="/facilitator"
          className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          Home
        </Link>
      </div>
      <div className="flex items-center ml-[10px] gap-[16px] py-[15px]   cursor-pointer">
        <i className="fa-solid fa-address-card text-[#565454]"></i>
        <Link
          to="/dashboard/profile"
          className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          Profile
        </Link>
      </div>
      <div className="flex items-center ml-[10px] gap-[13px] py-[15px]   cursor-pointer">
        <i className="fa-regular fa-message text-[#565454]"></i>{" "}
        <Link
          to=""
          className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          Message
        </Link>
      </div>
      <div className="flex items-center ml-[10px] gap-[15px] py-[15px]   cursor-pointer">
        <i className="fa-solid fa-wallet text-[#565454]"></i>
        <Link
          to="/dashboard/wallet"
          className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d] "
        >
          Wallet
        </Link>
      </div>

      <div className="flex items-center ml-[10px] gap-[15px] py-[15px]   cursor-pointer">
        <i className="fa-solid fa-gear text-[#565454]"></i>
        <Link
          to=""
          className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          settings
        </Link>
      </div>
      <div className="pt-[15px] mt-[70px]  ">
        <div className="flex items-center ml-[10px] gap-[10px] py-[15px] cursor-pointer">
          <i className="fa-solid fa-arrow-right-from-bracket text-[#565454]"></i>{" "}
          <p
            className="text-[14px] leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
            onClick={() => {
              dispatch(Logout_fun());
              localStorage.clear();
              sessionStorage.clear();
              window.location.reload();
            }}
          >
            Log Out
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
