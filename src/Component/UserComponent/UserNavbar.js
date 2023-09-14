import React, { useState } from "react";
import { FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import image from "../../assets/images/Subtract.png";
import profile from "../../assets/profile.png";
import UserSidebar from "./UserSidebar";
const UserNavbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const showSidebar = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <div className=" font-['Raleway'] bg-[#ffffff] w-full">
      <div className="flex items-center justify-between h-[70px] shadow-lg px-[25px] ">
        <div className=" py-[15px] flex items-center justify-center   ">
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

        <div className="flex items-center rounded-[5px]"></div>
        <div className="flex items-center gap-[20px]">
          <div className="flex items-center gap-[25px] border-r-[1px] pr-[25px]">
            <FaRegBell className="cursor-pointer text-[#565454] " />
            <FaEnvelope className="cursor-pointer text-[#565454] " />
          </div>
          <div className="flex items-center gap-[15px] " onClick={showSidebar}>
            <p>Jesse Iyoha</p>
            <div className="h-[50px] w-[50px] rounded-full bg-[#009B4D] cursor-pointer flex items-center justify-center relative z-40">
              <img src={profile} alt="" />
            </div>

            {openSidebar && (
              <div className="absolute top-[4rem] md:hidden left-0 right-[10rem] w-[10rem] h-[100vh] overflow-hidden">
                <UserSidebar />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
