import React from 'react';

import { useNavigate } from 'react-router-dom';

import background
  from '../../assets/medium-shot-man-delivering-groceries_9714x5464_4500.0.jpg';
import Header from '../WaitingList_Component/Header';

const Main = ({ lang, setLang }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/SignUp");
  };

  function truncateFrenchText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    } else {
      const truncatedText = words.slice(0, wordLimit).join(" ") + " ...";
      return truncatedText;
    }
  }

  return (
    <>
      {/* <div className="relative w-full h-full">
        <img
          className="object-cover w-full h-screen transition-all bg-top"
          src={background}
          alt=""
        ></img>
      </div> */}

      <div
        className="w-full h-screen bg-center bg-cover lg:px-[140px] 2xl:px-[190px] max-sm:px-5 md:px-10 flex flex-col max-sm:w-full"
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "right", // Adjust this value as needed
        }}
      >
        <Header lang={lang} setLang={setLang} />
        <div className=" flex items-center justify-start my-auto font-['Raleway']">
          <div className=" lg:w-1/2 max-sm:w-full md:w-3/5 mt-[170px]">
            {lang === "en" && (
              <h1 className=" w-full leading-[53px] text-[#fcedca] text-[60px] font-black">
                Become A Group Leader.
              </h1>
            )}

            {lang === "fr" && (
              <h1 className=" w-full leading-[55px] text-[#fcedca] text-[55px] font-black">
                Devenir Cheffe de Groupe.
              </h1>
            )}

            {lang === "en" && (
              <p className="text-[#faf5e9] text-base w-full font-semibold mt-2">
                Earn up to 1,000,000 Naira per annum as a Group Leader.
              </p>
            )}

            {lang === "fr" && (
              <p className="text-[#faf5e9] text-base w-full font-semibold mt-2">
                Gagnez jusqu’à 1 000 000 de nairas par an en tant que chef de
                groupe.
              </p>
            )}

            {lang === "en" && (
              <button
                className="bg-[#009b4d] border-[0.5px] drop-shadow-md border-black text-[#ffffff] text-base font-semibold mt-4 rounded-full px-[20px] py-[10px] hover:bg-opacity-60 hover:border-none transition-transform "
                type="button"
                onClick={handleLogin}
              >
                Create a Group
              </button>
            )}

            {lang === "fr" && (
              <button
                className="bg-[#009b4d] border-[0.5px] drop-shadow-md border-black text-[#ffffff] text-base font-semibold mt-4 rounded-full px-[20px] py-[10px] hover:bg-opacity-60 hover:border-none transition-transform "
                type="button"
                onClick={handleLogin}
              >
                Créer un groupe
              </button>
            )}
          </div>
        </div>
        <div className="flex content-center items-end justify-between h-[200px] p-2 w-full gap-4 mb-2 max-sm:hidden overflow-hidden text-ellipsis">
          <div className="flex flex-col content-center w-full h-[130px] float-left p-3 rounded-3xl bg-[#665a3c] bg-opacity-80 text-[#faf5e9] font-medium border-[1px] border-[#ffffff]">
            {lang === "en" && (
              <h2 className="p-2 leading-tight text-center lg:text-base md:text-[18px] ">
                Start and grow your Group.
              </h2>
            )}

            {lang === "fr" && (
              <h2 className="px-0 lg:py-2 md:py-0 leading-tight text-center lg:text-base md:text-[18px] ">
                Démarrez et développez votre groupe.
              </h2>
            )}
            <hr></hr>
            {lang === "en" && (
              <p className="p-2 lg:text-sm md:text-[13px] ">
                Initiate and cultivate a thriving community of bulk buyers.
              </p>
            )}

            {lang === "fr" && (
              <p className="lg:py-2 md:py-1 lg:text-sm md:text-[13px] ">
                Initier et cultiver une communauté florissante d’acheteurs en
                vrac.
              </p>
            )}
          </div>
          <div className=" w-full lg:h-[150px] md:[160px] max-sm:h-auto p-2 rounded-3xl bg-[#665a3c] font-medium bg-opacity-80 text-[#faf5e9] border-[1px] border-[#ffffff]">
            {lang === "en" && (
              <h2 className="py-2 leading-tight text-center lg:text-base md:text-[18px ">
                Aggregate Demand and make orders.
              </h2>
            )}

            {lang === "fr" && (
              <h2 className="p-0 leading-tight text-center lg:text-base md:text-[18px ">
                Cumulez la demande et passez des commandes.
              </h2>
            )}

            <hr></hr>
            {lang === "en" && (
              <p className="p-1 lg:text-sm md:text-[13px] ">
                Coordinate and organize group purchase, leveraging the buying
                power to negotiate better deals, discounts, or group rates from
                suppliers.
              </p>
            )}

            {lang === "fr" && (
              <p className="p-1 lg:text-sm md:text-[13px] ">
                {truncateFrenchText("Coordonner et organiser les achats groupés, en tirant parti de l’achat Pouvoir de négocier de meilleures offres, des rabais ou des tarifs de groupe de Fournisseurs.", 20)}
                
              </p>
            )}
          </div>
          <div className=" w-full h-full max-sm:h-auto p-2 font-medium rounded-3xl bg-[#665a3c] bg-opacity-80 text-[#faf5e9] border-[1px] border-[#ffffff]">
            {lang === "en" && (
              <h2 className="p-2 leading-tight text-center lg:text-base md:text-[18px ">
                Receive orders and share to group members.
              </h2>
            )}

            {lang === "fr" && (
              <h2 className="p-1 leading-tight text-center lg:text-base md:text-[18px ">
            
                  Recevez des commandes et partagez-les avec les membres du groupe.
              </h2>
            )}

            <hr></hr>
            {lang === "en" && (
              <p className="p-2 lg:text-sm text-ellipsis md:text-[13px] ">
                Provide cost savings and availability to the group members by
                pooling resources and making bulk purchases together.
              </p>
            )}

            {lang === "fr" && (
              <p className="p-1 lg:text-sm text-ellipsis md:text-[13px] ">
              
                  Permettre aux membres du groupe de réaliser des économies et d’être disponibles en la mise en commun des ressources et la réalisation d’achats en gros.
                  
              
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
