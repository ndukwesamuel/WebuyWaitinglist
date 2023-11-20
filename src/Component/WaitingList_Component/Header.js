import React from "react";

import { useNavigate } from "react-router-dom";

const Header = ({ lang, setLang }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full ">
      <header className="flex flex-row content-center justify-between w-full">
        <div className="text-3xl">
          <a className="cursor-pointer" href="/">
            <h1 className="font-extrabold text-white ">
              WE
              <span className="font-extrabold text-[#6dad04] border-2 border-[#6dad04] px-1 ml-1">
                BUY
              </span>
            </h1>
          </a>
        </div>
        <div className="">
          <button
            className=" mr-4 outline-none bg-[#6dad04] rounded-[4px] font-semibold px-4 py-1 hover:bg-transparent hover:border-2 hover:border-[#6dad04] hover:text-[#e6e9ed] transition-all"
            onClick={() => navigate("/signup")}
          >
            {lang === "en" && "Sign Up"}
            {lang === "fn" && "s'inscrire"}
          </button>
          <i className="fa-solid fa-cart-shopping cursor-pointer text-[#e6e9ed]"></i>
        </div>
      </header>
    </div>
  );
};

export default Header;
