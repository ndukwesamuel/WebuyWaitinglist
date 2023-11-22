import React from "react";

const Main = ({ lang, setLang }) => {
  return (
    <>
      <div className="font-['Raleway'] px-[140px]">
        {lang === "en" && (
          <h1 className=" w-1/2 leading-[70px] mt-[200px] text-[#fcedca] text-[76px] font-black">
            Become A Group Leader.
          </h1>
        )}

        {lang === "fn" && (
          <h1 className=" w-1/2 leading-[70px] mt-[200px] text-[#fcedca] text-[76px] font-black">
            Devenir Cheffe de Groupe.
          </h1>
        )}

        {lang === "en" && (
          <p className="text-[#faf5e9] text-[20px] w-[370px] font-semibold mt-4">
            Earn up to 1,000,000 Naira per annum as a Group Leader.
          </p>
        )}

        {lang === "fn" && (
          <p className="text-[#faf5e9] text-[20px] w-[370px] font-semibold mt-4">
            Gagnez jusqu’à 1 000 000 de nairas par an en tant que chef de
            groupe.
          </p>
        )}

        {lang === "en" && (
          <button
            className="bg-[#009b4d] border-[0.5px] drop-shadow-md border-black text-[#ffffff] text-base font-semibold mt-4 rounded-full px-[20px] py-[10px] hover:bg-opacity-60 hover:border-none transition-transform "
            type="button"
          >
            Create a Group
          </button>
        )}

        {lang === "fn" && (
          <button
            className="bg-[#009b4d] border-[0.5px] drop-shadow-md border-black text-[#ffffff] text-base font-semibold mt-4 rounded-full px-[20px] py-[10px] hover:bg-opacity-60 hover:border-none transition-transform "
            type="button"
          >
            Créer un groupe
          </button>
        )}
      </div>
    </>
  );
};

export default Main;
