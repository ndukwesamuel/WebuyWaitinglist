import React from "react";

const Header = ({ lang, setLang }) => {
  return (
    <div className="w-full ">
      <header className="flex flex-row content-center justify-between">
        <div className="">
          <i className="hidden text-2xl text-white cursor-pointer fa-solid fa-bars max-md:block max-sm:block"></i>
          <ul className="flex flex-row gap-8 text-[#e6e9ed] max-md:hidden max-sm:hidden ">
            <li className="relative h-full ">
              <a
                className="hover:after:absolute hover:after:rounded-[10px] hover:after:bottom-[-13px] hover:after:block hover:after:bg-[#6dad04] hover:after:w-full hover:after:h-[2px]"
                href="/"
              >
                {lang === "en" && "About"}
                {lang === "fn" && "À propos"}
              </a>
            </li>
            <li className="relative h-full ">
              <a
                className="hover:after:absolute hover:after:rounded-[10px] hover:after:bottom-[-13px] hover:after:block hover:after:bg-[#6dad04] hover:after:w-full hover:after:h-[2px]"
                href="/"
              >
                {lang === "en" && "Features"}
                {lang === "fn" && "Fonctionnalités"}
              </a>
            </li>
            <li className="relative h-full ">
              <a
                className="hover:after:absolute hover:after:rounded-[10px] hover:after:bottom-[-13px] hover:after:block hover:after:bg-[#6dad04] hover:after:w-full hover:after:h-[2px]"
                href="/"
              >
                {lang === "en" && "Download"}
                {lang === "fn" && "Téléchargement"}
              </a>
            </li>
          </ul>
        </div>
        <div className="text-3xl -ml-[150px] max-md:ml-[100px]">
          <a className="cursor-pointer" href="/">
            <h1 className="font-extrabold text-white ">
              WE
              <span className="font-extrabold text-[#6dad04] border-2 border-[#6dad04] px-1 ml-1">
                BUY
              </span>
            </h1>
          </a>
        </div>
        <div className=" max-sm:hidden">
          <button
            className=" mr-4 outline-none bg-[#6dad04] rounded-[4px] font-semibold px-4 py-1 hover:bg-transparent hover:border-2 hover:border-[#6dad04] hover:text-[#e6e9ed] transition-all"
            type="Submit"
          >
            {lang === "en" && "Log In "}
            {lang === "fn" && "Connexion"}
          </button>
          <i className="fa-solid fa-cart-shopping cursor-pointer text-[#e6e9ed]"></i>
        </div>
      </header>
    </div>
  );
};

export default Header;
