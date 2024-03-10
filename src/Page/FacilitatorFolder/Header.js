import React, {
  useEffect,
  useState,
} from 'react';

import { FaChevronDown } from 'react-icons/fa6';
import { IoCartOutline } from 'react-icons/io5';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { Logout_fun } from '../../Redux/AuthenticationSlice';
import {
  AllProduct_fun,
  GetUSerCart_Fun,
} from '../../Redux/ProductSlice';

const UserNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, fullName } = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data
  );
  const { AllProductData, isLoading, cart_data, cart_isSuccess } = useSelector(
    (state) => state?.reducer?.ProductSlice
  );

  const [openSidebar, setOpenSidebar] = useState(false);
  const [lang, setLang] = useState("en");
  const showSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  useEffect(() => {
    dispatch(GetUSerCart_Fun());

    // i will remove the product
    dispatch(AllProduct_fun());

    return () => {};
  }, [dispatch, cart_isSuccess]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const options = [
    { name: "Orders", link: "orders" },
    { name: "My Account", link: "#" },
  ];
  return (
    <div className=" font-['Raleway'] bg-[#ffffff] w-full ">
      <div className="flex items-center justify-between py-3 shadow-lg px-[55px] ">
        {/* <div className="flex items-center justify-center ">
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
        </div> */}

        <div className="flex items-center rounded-[5px]"></div>
        <div className="flex items-center gap-[20px]">
          <div className="flex items-center gap-[15px] " onClick={showSidebar}>
            <div className="flex gap-[.25rem] cursor-pointer">
              <i className="fa-solid fa-globe text-[#565454]"></i>

              <FaChevronDown className="text-[10px] mt-[.5rem] mr-2" />

              <div className="relative flex">
                <IoCartOutline
                  className="text-[20px] "
                  onClick={() => navigate("/facilitator/cart")}
                />
                <span className="ab absolute top-[-7px] left-[18px] bottom-4">
                  {cart_data?.userCart?.items?.length}
                </span>
              </div>
            </div>
            <p className="hidden md:block"></p>
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-200"
                id="options-menu"
                onClick={toggleDropdown}
              >
                Hi {fullName}
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {options.map((option, index) => (
                      <Link
                        key={index}
                        to={`/facilitator/${option.link}`}
                        className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        {console.log(`/${option?.link}`)}

                        {option?.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                dispatch(Logout_fun());
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
              }}
              className="text-[14px] border-2 px-4 py-2 leading-[20px] rounded-lg font-semibold text-[#565454] hover:text-[#009b4d] focus:text-[#009b4d]"
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
