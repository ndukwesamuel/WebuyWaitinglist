import React from "react";

import image from "../../assets/images/Subtract.png";

const Header = ({ lang, setLang }) => {
  return (
    <>
      <div className="flex flex-row px-[140px] pt-[20px] absolute  items-center justify-between w-full ">
        <a className="cursor-pointer " href="/">
          <h1 className="text-[25px] font-extrabold text-[#faf5e9] max-sm:text-3xl max-md:text-4xl">
            WE
            <img
              className="inline-block w-[70px] mb-[4px] ml-[2px] "
              src={image}
              alt=""
            ></img>
          </h1>
        </a>
        <div>
          <input
            className=" p-3 w-[200px] h-7 bg-[#faf5e9] opacity-25 rounded-full"
            type="text"
            name="search"
            value={lang === "fn" ? "rechercher" : "search"}
          ></input>
          <i class="fa-sharp fa-solid fa-magnifying-glass relative right-[25px] top-[1px]"></i>

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
            onClick={() => setLang("fn")}
          >
            FR
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
