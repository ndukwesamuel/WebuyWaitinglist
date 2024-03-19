import React from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import image from '../../assets/images/Subtract.png';
import { Logout_fun } from '../../Redux/AuthenticationSlice';

const UserSidebar = ({ lang, setLang }) => {
  const dispatch = useDispatch();

  return (
    <div className=" bg-[#ffffff] outline-none border-none h-screen font-['Raleway'] flex flex-col gap-3 px-[25px] w-full">
      <div className=" py-[15px] flex items-center justify-center   ">
        <a className="cursor-pointer " href="/">
          <h1 className="text-[21px] font-extrabold text-[#565454] max-sm:text-3xl max-md:text-4xl">
            WE
            <img
              className="inline-block w-[40px] md:w-[60px] mb-[4px] ml-[2px] "
              src={image}
              alt=""
            ></img>
          </h1>
        </a>
      </div>
      
      <div className="flex items-center ml-[10px] pt-[5rem] border-b-[1px] border-[#99999999] hover:border-[#009b4d] gap-[15px] py-[15px] cursor-pointer">
        <i className="fa-solid fa-house text-[#565454]"></i>
        <Link
          // to="/dashboard"
          to="/facilitator"
          className="text-base leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          Home
        </Link>
      </div>
      <div className="flex items-center ml-[10px] gap-[16px] py-[15px] border-b-[1px] hover:border-[#009b4d] border-[#99999999] cursor-pointer">
        <i className="fa-solid fa-address-card text-[#565454]"></i>
        <Link
          to="/dashboard/profile"
          className="text-base leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          Profile
        </Link>
      </div>
      <div className="flex items-center ml-[10px] gap-[13px] py-[15px] border-b-[1px] hover:border-[#009b4d] border-[#99999999]  cursor-pointer">
        <i className="fa-regular fa-message text-[#565454]"></i>{" "}
        <Link
          to=""
          className="text-base leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          Message
        </Link>
      </div>
      <div className="flex items-center ml-[10px] gap-[15px] py-[15px] border-b-[1px] hover:border-[#009b4d] border-[#99999999]  cursor-pointer">
        <i className="fa-solid fa-wallet text-[#565454]"></i>
        <Link
          to="/dashboard/wallet"
          className="text-base leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d] "
        >
          Wallet
        </Link>
      </div>

      <div className="flex items-center ml-[10px] gap-[15px] py-[15px] border-b-[1px] hover:border-[#009b4d] border-[#99999999]  cursor-pointer">
        <i className="fa-solid fa-gear text-[#565454]"></i>
        <Link
          to=""
          className="text-base leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
        >
          Settings
        </Link>
      </div>
      <div className="pt-[15px] mt-[70px]  ">
        <div className="flex items-center ml-[10px] gap-[10px] py-[15px] cursor-pointer">
          <i className="fa-solid fa-arrow-right-from-bracket text-[#565454]"></i>{" "}
          <p
            className="text-base leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
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
