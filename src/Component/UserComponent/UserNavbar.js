import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import image from "../../assets/images/Subtract.png";
import myImage from "../../assets/DP.jpg";
import UserSidebar from "./UserSidebar";
const UserNavbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [lang, setLang] = useState("en");
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
            </div>
            <p className="hidden md:block">Adetayo Adewobi</p>
            <div className="h-[50px] w-[50px] rounded-full bg-[#009B4D] cursor-pointer flex items-center justify-center relative z-40">
              <img
                className="w-[48px] h-[48px] rounded-full"
                src={myImage}
                alt=""
              />
            </div>

            {openSidebar && (
              <div className="absolute top-[4rem] md:hidden left-0 right-[10rem] w-[10rem] h-[100vh] overflow-hidden">
                <UserSidebar lang={lang} setLang={setLang} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
