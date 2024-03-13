import React, {
  useEffect,
  useState,
} from 'react';

import { useSelector } from 'react-redux';

import board
  from '../../assets/istockphoto-1320029684-612x612__1_-removebg.png';
import image from '../../assets/Subtract.png';
import playstore from '../../img/Google-Play-PNG-Clipart.png';

const OnboardingRoute = () => {
  const authenticationData = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data
  );
  const { fullName } = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("En");
  const [userImage, setUserImage] = useState(null); 

  useEffect(() => {
    if (authenticationData) {
      const { email } = authenticationData;
      const fetchUserImage = async () => {
        try {
          const response = await fetch(`/api/user/image?email=${email}`);
          const data = await response.json();
          setUserImage(data.imageUrl);
        } catch (error) {
          console.error("Error fetching user image:", error);
        }
      };

      fetchUserImage();
    }
  }, [authenticationData]);

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
    },
    Fr: {
      headerText:
        "Des produits d'épicerie plus frais, des économies plus importantes, une meilleure communauté",
      paragraphText:
        "L'application connecte les agriculteurs, rationalise l'achat grâce à des groupes de confiance pour plus de commodité et d'accessibilité",
    },
  };

  const { headerText, paragraphText } = translations[selectedLanguage];

  return (
    <>
      <div className="relative">
        <header className=" w-full px-16 py-5 flex items-center justify-between absolute top-0 left-0 right-0 z-30 ">
          <div className="flex items-center justify-center ">
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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <i
                className="fa-solid fa-globe fa-base"
                style={{ color: "#ffffff" }}
              ></i>
              <p className="text-white font-semibold text-lg">
                {selectedLanguage}
              </p>
              <i
                className={`fa-solid fa-angle-down fa-2xs mt-1 -ml-1 ${
                  showDropdown ? "transform rotate-180" : ""
                }`}
                style={{ color: "#ffffff" }}
                onClick={handleToggleDropdown}
              ></i>
            </div>
            {showDropdown && (
              <div className="absolute top-16 w-20 bg-white rounded-md shadow-lg z-10">
                <select
                  className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                >
                  <option value="En">En</option>
                  <option value="Fr">Fr</option>
                </select>
              </div>
            )}
            <div className="divider mx-2 bg-[#ffffff] w-[1px] h-8"></div>
            <div className="flex items-center gap-3 ">
              <div className="w-8 h-8 flex items-center justify-center rounded-full border-[2px] border-[#ffffff]">
                <img
                  className="w-full h-full rounded-full"
                  src={userImage} // Replace userImage with the URL of the user's image
                  alt="User Avatar"
                />
              </div>
              <p className="text-white text-lg">
                {fullName}
              </p>
            </div>
          </div>
        </header>
        <div className="flex">
          <div className=" w-3/5 h-screen bg-white flex flex-col pl-16 justify-center">
            <h1 className="text-[37px] leading-[50px] max-w-[600px] font-black ">
              <span className=" text-[45px] text-[#009b4d]">Webuy...</span>{" "}
              {headerText}
            </h1>
            <p className="mt-1 text-[#565454] font-semibold max-w-[550px] text-xl ">
              {paragraphText}
            </p>
            <a href="/">
              <img className="w-[200px] " src={playstore} alt=""></img>
            </a>
          </div>
          <div className=" w-2/5 flex justify-center bg-[#009b4d] h-screen">
            <img
              className="board relative right-[160px] object-cover"
              src={board}
              alt=""
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnboardingRoute