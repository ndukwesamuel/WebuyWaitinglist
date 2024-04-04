import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import ScrollReveal from 'scrollreveal';

import board
  from '../../assets/istockphoto-1320029684-612x612__1_-removebg.png';
import image from '../../assets/Subtract.png';
import ReferralCodeModal
  from '../../Component/ReferralCodeModalComponent/ReferralCodeModal';
import playstore from '../../img/Google-Play-PNG-Clipart.png';
import { Logout_fun } from '../../Redux/AuthenticationSlice';
import { generateReferralCodes } from '../../utilities/ReferralCode';

const OnboardingRoute = () => {
  const dispatch = useDispatch();
  const authenticationData = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data
  );
  const { fullName, email } = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("En");
  const [userImage, setUserImage] = useState(null);
  const [iconColor, setIconColor] = useState("#ffffff");

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    ScrollReveal().reveal(".image", {
      distance: "60px",
      duration: 2000,
      easing: "ease-in",
      origin: "right",
      reset: false,
    });
  });

  useEffect(() => {
    // Update icon color based on screen size
    const updateIconColor = () => {
      if (window.innerWidth <= 768) {
        setIconColor("#000000"); // Black color for mobile screens
      } else if (window.innerWidth <= 1024) {
        setIconColor("#000000"); // Black color for tablet screens
      } else {
        setIconColor("#ffffff"); // White color for larger screens
      }
    };

    // Call update function on initial load
    updateIconColor();

    // Listen to window resize event and update color accordingly
    window.addEventListener("resize", updateIconColor);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", updateIconColor);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await fetch(`/api/user/image?email=${email}`);
        const data = await response.json();
        setUserImage(data.imageUrl);
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };

    if (email) {
      fetchUserImage();
    }
  }, [email]);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setShowDropdown(false);
  };

  const translations = {
    En: {
      headerText: "Fresher Groceries, Bigger Savings, Better Community",
      paragraphText:
        "App connects farmers, streamlining buying through trusted groups for convenience and affordability",
      logOut: "Log Out",
    },
    Fr: {
      headerText:
        "Des produits d'épicerie plus frais, des économies plus importantes, une meilleure communauté",
      paragraphText:
        "L'application connecte les agriculteurs, rationalise l'achat grâce à des groupes de confiance pour plus de commodité et d'accessibilité",
      logOut: "Se déconnecter",
    },
  };

  const { headerText, paragraphText, logOut } = translations[selectedLanguage];

  return (
    <>
      <div className="relative">
        <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between w-full px-5 py-5 md:px-10 lg:px-16 ">
          <div className="flex items-center justify-center ">
            <a className="cursor-pointer " href="/">
              <h1 className="text-[21px] max-sm:text-[18px] font-extrabold text-[#565454] max-sm:text-xl max-md:text-4xl">
                WE
                <img
                  className="inline-block w-[43px] md:w-[60px] mb-[4px] ml-[2px] "
                  src={image}
                  alt=""
                ></img>
              </h1>
            </a>
          </div>
          <div className="flex items-center gap-4 ">
            <div className="flex items-center gap-2 ">
              <i
                className="fa-solid fa-globe fa-base"
                style={{ color: iconColor }}
              ></i>
              <p className="text-lg max-sm:text-base font-semibold lg:text-white max-sm:text-[#000000] md:text-[#000000]">
                {selectedLanguage}
              </p>
              <i
                className={`fa-solid fa-angle-down fa-2xs mt-1 -ml-1 ${
                  showDropdown ? "transform rotate-180" : ""
                }`}
                style={{ color: iconColor }}
                onClick={handleToggleDropdown}
              ></i>
            </div>
            {showDropdown && (
              <div className="absolute z-10 w-20 bg-white rounded-md shadow-lg top-16">
                <select
                  className="block w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                >
                  <option value="En">En</option>
                  <option value="Fr">Fr</option>
                </select>
              </div>
            )}
            <div className="divider mx-2 bg-[#ffffff] w-[1px] h-8 max-sm:hidden"></div>
            <div className="flex items-center gap-3 ">
              <div className="w-8 h-8 flex items-center max-sm:hidden justify-center rounded-full border-[2px] border-[#ffffff]">
                {userImage ? (
                  <img
                    className="w-full h-full rounded-full"
                    src={userImage}
                    alt="User Avatar"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full"></div>
                )}
              </div>
              <p className="text-lg lg:text-white max-sm:hidden max-sm:text-[#000000] md:text-[#000000]">
                Hi, {fullName}
              </p>
              <button
                onClick={() => {
                  dispatch(Logout_fun());
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.reload();
                }}
                className="text-[14px] btn rounded-lg max-sm:ml-0 ml-10 max-sm:text-[#000000] md:text-[#000000] px-5 py-2 leading-[20px] font-semibold lg:text-[#ffffff] focus:text-[#009b4d] max-sm:hover:text-[#ffffff] md:hover:text-[#ffffff]"
              >
                {logOut}
              </button>
            </div>
          </div>
        </header>
        <div className="flex w-full h-screen max-sm:flex-col ">
          <div className="flex flex-col justify-center h-screen bg-white lg:pl-16 lg:w-3/5 md:w-full max-sm:h-full magicpattern max-sm:items-center max-sm:w-full max-sm:px-5 md:px-10 ">
            <h1 className="text-[37px] leading-[50px] max-w-[600px] max-sm:max-w-full max-sm:text-[30px] max-sm:leading-[40px] max-sm:text-center font-black ">
              <span className=" text-[45px] text-[#009b4d]">Webuy...</span>{" "}
              {headerText}
            </h1>
            <p className="mt-1 max-sm:text-center text-[#565454] font-semibold max-w-[550px] text-xl max-sm:text-lg ">
              {paragraphText}
            </p>
            <div className="flex items-center w-full">
              <a href="/">
                <img className="w-[200px] " src={playstore} alt=""></img>
              </a>
              <button
                onClick={toggleModal}
                className="sm:text-[14px] text-wrap md:text-[18px] text-[#fff] font-medium rounded-lg px-5 py-[15px] bg-[#242c3f]"
                type="referral"
              >
                Referral Code
              </button>
              {showModal && (
                <ReferralCodeModal
                  referralCode={generateReferralCodes}
                  onClose={toggleModal}
                />
              )}
            </div>
          </div>
          <div className=" w-2/5 max-sm:w-full max-sm:hidden md:hidden lg:flex justify-center bg-[#009b4d] max-sm:p-0 max-sm:h-auto h-screen">
            <img
              className="board image relative max-sm:object-contain right-[160px] max-sm:right-0 object-cover"
              src={board}
              alt=""
            ></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingRoute;

