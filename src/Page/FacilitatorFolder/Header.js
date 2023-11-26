import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import image from "../../assets/images/Subtract.png";
import myImage from "../../assets/DP.jpg";
import UserSidebar from "../../Component/UserComponent/UserSidebar";
import { IoCart } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Logout_fun } from "../../Redux/AuthenticationSlice";

const UserNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openSidebar, setOpenSidebar] = useState(false);
  const [lang, setLang] = useState("en");
  const showSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <div className=" font-['Raleway'] bg-[#ffffff] w-full ">
      <div className="flex items-center justify-between h-[70px] shadow-lg px-[25px] ">
        <div className=" py-[15px] flex items-center justify-center   ">
          <a className="cursor-pointer " href="/facilitator">
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

        <div className="flex items-center rounded-[5px]"></div>
        <div className="flex items-center gap-[20px]">
          <div className="flex items-center gap-[15px] " onClick={showSidebar}>
            <div className="flex gap-[.25rem] cursor-pointer">
              <i className="fa-solid fa-globe text-[#565454]"></i>

              <FaChevronDown className="text-[10px] mt-[.5rem]" />
              <IoCartOutline
                className="text-[20px] "
                onClick={() => navigate("/facilitator/cart")}
              />
            </div>
            <p className="hidden md:block">Adetayo Adewobi</p>
            <button
              onClick={() => {
                dispatch(Logout_fun());
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }}
              className="text-[14px] border-2 px-2 leading-[20px] font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
