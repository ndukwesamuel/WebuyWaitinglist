import React, { useState } from "react";

import { FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";

import profile from "../../assets/profile.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const showProfile = () => {
    // alert("helloo")
    setOpen(!open);
  };

  return (
    <div className=" font-['Raleway'] bg-[#ffffff] w-full">
      <div className="flex items-center justify-between h-[50px] shadow-lg px-[25px] ">
        <div className="flex items-center rounded-[5px]">
          <input
            type="text"
            className=" bg-[#F8F9FC] h-[30px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal"
            placeholder="Search for..."
          />
          <div className="bg-[#009B4D] h-[30px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]">
            <FaSearch color="white" />
          </div>
        </div>
        <div className="flex items-center gap-[20px]">
          <div className="flex items-center gap-[25px] border-r-[1px] pr-[25px]">
            <FaRegBell className="cursor-pointer text-[#565454] " />
            <FaEnvelope className="cursor-pointer text-[#565454] " />
          </div>
          <div
            className="flex items-center gap-[15px] relative"
            onClick={showProfile}
          >
            <p className="font-medium text-[15px] text-[#565454]">
              Jesse Iyoha
            </p>
            <div className="h-[40px] w-[40px] rounded-full bg-[#009B4D] cursor-pointer flex items-center justify-center relative z-40">
              <img src={profile} alt="" />
            </div>

            {open && (
              <div className="bg-white border h-[120px] w-[150px] absolute bottom-[-135px] z-20 right-0 pt-[15px] pl-[15px] space-y-[10px]">
                <p className="cursor-pointer text-[#565454] hover:text-[#009B4D] font-semibold">
                  Profile
                </p>
                <p className="cursor-pointer text-[#565454] hover:text-[#009B4D] font-semibold">
                  Settings
                </p>
                <p className="cursor-pointer text-[#565454] hover:text-[#009B4D] font-semibold">
                  Log out
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
