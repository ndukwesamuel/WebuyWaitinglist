import React, { useEffect, useState } from "react";
import { FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Profile_fun } from "../../Redux/ProfileSlice";
import { Settings, LogOut, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logout_fun } from "../../Redux/AuthenticationSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { data: profile } = useSelector(
    (state) => state?.reducer?.ProfileSlice
  );

  useEffect(() => {
    dispatch(Profile_fun());
  }, [dispatch]);

  const showProfile = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(Logout_fun());
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div className="font-['Raleway'] bg-[#ffffff] w-full shadow-lg">
      <div className="flex items-center justify-between py-2 px-4 md:px-[25px]">
        {/* Search - Hidden on mobile */}
        <div className="hidden md:flex items-center rounded-[5px]">
          <input
            type="text"
            className="bg-[#F8F9FC] h-[30px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal"
            placeholder="Search for..."
          />
          <div className="bg-[#009B4D] h-[30px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]">
            <FaSearch color="white" />
          </div>
        </div>
        {/* Empty div for small screens to maintain flex layout */}

        <div className="md:hidden"></div>

        {/* Right side: notifications and profile */}
        <div className="flex items-center gap-[20px]">
          <div className="hidden sm:flex items-center gap-[25px] border-r-[1px] pr-[25px]">
            <FaRegBell className="cursor-pointer text-[#565454]" />
            <FaEnvelope className="cursor-pointer text-[#565454]" />
          </div>

          <div
            className="flex items-center gap-[15px] relative cursor-pointer"
            onClick={showProfile}
          >
            <p className="font-medium text-[15px] text-[#565454] hidden sm:block">
              {profile && profile.data && profile.data.message.user.fullName}
            </p>
            <div className="w-8 h-8 flex items-center justify-center rounded-full border-[2px] border-[#ffffff]">
              {profile && profile.data ? (
                <img
                  className="w-full h-full rounded-full"
                  src={profile.data.message.profileImage}
                  alt="User Avatar"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-full"></div>
              )}
            </div>

            {open && (
              <div className="bg-white border h-auto py-3 w-[150px] absolute bottom-[-135px] z-20 right-0 pt-[15px] pl-[15px] space-y-[10px] shadow-md rounded-md">
                <p className="cursor-pointer text-[#565454] hover:text-[#009B4D] font-semibold">
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center gap-[5px]"
                  >
                    <User size={20} /> Profile
                  </Link>
                </p>
                <div className="cursor-pointer text-[#565454] hover:text-[#009B4D] font-semibold">
                  <p className="flex items-center gap-[5px]">
                    <Settings size={20} />
                    Settings
                  </p>
                </div>
                <div className="cursor-pointer text-[#565454] hover:text-[#009B4D]">
                  <Button
                    variant="destructive"
                    className="flex items-center -ml-3 gap-3 font-semibold"
                    onClick={handleLogout}
                  >
                    <LogOut size={20} />
                    Log out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
