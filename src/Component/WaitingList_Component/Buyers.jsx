import React from "react";

import { useNavigate } from "react-router-dom";

import buyers from "../../assets/horizontal-shot-happy-surprised-woman-reacts-something-funny-carries-freshly-picked-vegetables-from-garden-keeps-clean-eating-prefers-vegetarian-food-poses-indoor-empty-space-text.jpg";
import Header from "./Header";

const Main = ({ lang, setLang }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/SignUp");
  };

  return (
    <>
      <div
        className=" w-full h-screen bg-center bg-cover lg:px-[140px] max-sm:pt-44 max-sm:px-5 md:px-10 flex items-center justify-end max-sm:w-full "
        style={{
          backgroundImage: `url(${buyers})`,
        }}
      >
        <Header lang={lang} setLang={setLang} />
        <div className="w-1/2 max-sm:w-full">
          {lang === "en" && (
            <h1 className=" text-[60px] max-sm:text-center text-shadow-inner text-stroke font-black text-[#009b4d] text-opacity-60 leading-[60px] max-sm:leading-[55px] font-['Raleway']">
              Affordable, <br></br>
              <span className="font-['Gothic'] text-shadow-inner tracking-wide text-[#009b4d] lg:text-[60px] max-sm:text-[50px] md:text-[50px] text-opacity-60 uppercase">
                Convenient!
              </span>
            </h1>
          )}

          {lang === "fr" && (
            <h1 className=" text-[60px] max-sm:text-center text-shadow-inner text-stroke font-black text-[#009b4d] text-opacity-60 leading-[60px] max-sm:leading-[55px] font-['Raleway']">
              Abordable, <br></br>
              <span className="font-['Gothic'] text-shadow-inner tracking-wide text-[#009b4d] lg:text-[60px] text-opacity-60 uppercase">
                pratique!
              </span>
            </h1>
          )}

          {lang === "en" && (
            <p className="text-[#faf5e9] text-lg max-sm:text-base max-sm:text-center leading-tight w-full font-['Raleway'] font-semibold mt-1">
              Get groceries and foodstuffs that are the most affordable on the
              continent with zero stress.
            </p>
          )}

          {lang === "fr" && (
            <p className="text-[#faf5e9] text-lg max-sm:text-base max-sm:text-center leading-tight w-full font-['Raleway'] font-semibold mt-1">
              Obtenez les produits d’épicerie et les aliments les plus
              abordables sur le continent sans stress.
            </p>
          )}

          {lang === "en" && (
            <div className="flex w-full max-sm:justify-center">
              <button
                className="bg-[#009b4d] bg-opacity-60 drop-shadow-2xl border-[0.5px] border-black font-['Raleway'] text-[#ffffff] text-base font-semibold mt-6 rounded-full px-8 py-2 hover:bg-opacity-60 hover:border-none transition-transform "
                type="button"
                onClick={handleLogin}
              >
                Join a Group
              </button>
            </div>
          )}

          {lang === "fr" && (
            <div className="flex w-full max-sm:justify-center">
              <button
                className="bg-[#009b4d] bg-opacity-60 drop-shadow-2xl border-[0.5px] border-black font-['Raleway'] text-[#ffffff] text-base font-semibold mt-6 rounded-full px-8 py-2 hover:bg-opacity-60 hover:border-none transition-transform "
                type="button"
                onClick={handleLogin}
              >
                Rejoindre un groupe
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
