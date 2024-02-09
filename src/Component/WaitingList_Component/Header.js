import React from 'react';

import image from '../../assets/Subtract.png';

const Header = ({ lang, setLang }) => {
  return (
    <>
      <div className="flex flex-row lg:px-[140px] max-sm:px-5 md:px-10 2xl:px-[190px] pt-[20px] absolute top-0 left-0  items-center justify-between w-full ">
        <a className="cursor-pointer " href="/">
          <h1 className="text-[23px] font-extrabold text-[#faf5e9] max-sm:text-3xl max-md:text-4xl">
            WE
            <img
              className="inline-block w-[60px] mb-[4px] ml-[2px] "
              src={image}
              alt=""
            ></img>
          </h1>
        </a>
        <div className="flex items-center gap-2">
          <input
            className=" p-3 w-[200px] h-7 max-sm:hidden bg-[#faf5e9] opacity-25 rounded-full"
            type="text"
            name="search"
            value={lang === "fr" ? "rechercher" : "search"}
          ></input>
          <i className="fa-sharp fa-solid fa-magnifying-glass max-sm:hidden relative right-[25px] top-[1px]"></i>

          <button
            className=" bg-transparent text-[#faf5e9] focus:text-[#009b4d] focus:text-opacity-60 font-semibold text-md"
            type="button"
            onClick={() => setLang("en")}
          >
            EN -
          </button>
          <button
            className=" bg-transparent ml-2 text-[#faf5e9] font-semibold text-md focus:text-[#009b4d] focus:text-opacity-60"
            type="button"
            onClick={() => setLang("fr")}
          >
            FR
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
