import React from 'react';

import { useNavigate } from 'react-router-dom';

import background
  from '../../assets/medium-shot-man-delivering-groceries_9714x5464_4500.0.jpg';

const Main = ({ lang, setLang }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/SignUp');
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
        className="w-full h-screen bg-center bg-cover lg:px-[140px] max-sm:px-5 md:px-10 flex flex-col max-sm:h-full"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className=" flex items-center justify-start my-auto font-['Raleway']">
          <div className=" lg:w-1/2 max-sm:w-full md:w-3/5 mt-[100px]">
            {lang === "en" && (
              <h1 className=" w-full leading-[53px] text-[#fcedca] text-[55px] font-black">
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
        <div className="flex content-center justify-end w-full gap-4 mb-2 max-sm:hidden max-sm:flex-col max-sm:justify-center place-items-end max-sm:place-items-center place-content-end max-sm:place-content-center max-sm:mt-10">
          <div className="flex flex-col content-center w-full h-[150px] max-sm:h-auto float-left p-3 rounded-3xl bg-[#665a3c] bg-opacity-80 text-[#faf5e9] font-medium border-[1px] border-[#ffffff]">
            {lang === "en" && (
              <h2 className="p-2 leading-tight text-center lg:text-xl md:text-[18px] ">
                Start and grow your Group.
              </h2>
            )}

            {lang === "fr" && (
              <h2 className="px-0 py-2 leading-tight text-center lg:text-xl md:text-[18px] ">
                Démarrez et développez votre groupe.
              </h2>
            )}
            <hr></hr>
            {lang === "en" && (
              <p className="p-2 lg:text-base md:text-[13px] ">
                Initiate and cultivate a thriving community of bulk buyers.
              </p>
            )}

            {lang === "fr" && (
              <p className="p-2 lg:text-base md:text-[13px] ">
                Initier et cultiver une communauté florissante d’acheteurs en
                vrac.
              </p>
            )}
          </div>
          <div className=" w-full h-[230px] max-sm:h-auto p-3 rounded-3xl bg-[#665a3c] font-medium bg-opacity-80 text-[#faf5e9] border-[1px] border-[#ffffff]">
            {lang === "en" && (
              <h2 className="p-2 leading-tight text-center lg:text-xl md:text-[18px ">
                Aggregate Demand and make orders.
              </h2>
            )}

            {lang === "fr" && (
              <h2 className="p-2 leading-tight text-center lg:text-xl md:text-[18px ">
                Cumulez la demande et passez des commandes.
              </h2>
            )}

            <hr></hr>
            {lang === "en" && (
              <p className="p-2 lg:text-base md:text-[13px] ">
                Coordinate and organize group purchase, leveraging the buying
                power to negotiate better deals, discounts, or group rates from
                suppliers.
              </p>
            )}

            {lang === "fr" && (
              <p className="p-2 lg:text-base md:text-[13px] ">
                Coordonner et organiser les achats groupés, en tirant parti de
                l’achat Pouvoir de négocier de meilleures offres, des rabais ou
                des tarifs de groupe de Fournisseurs.
              </p>
            )}
          </div>
          <div className=" w-full h-[250px] max-sm:h-auto p-3 font-medium rounded-3xl bg-[#665a3c] bg-opacity-80 text-[#faf5e9] border-[1px] border-[#ffffff]">
            {lang === "en" && (
              <h2 className="p-2 leading-tight text-center lg:text-xl md:text-[18px ">
                Receive orders and share to group members.
              </h2>
            )}

            {lang === "fr" && (
              <h2 className="p-2 leading-tight text-center lg:text-xl md:text-[18px ">
                Recevoir des commandes et les partager avec les membres du
                groupe.
              </h2>
            )}

            <hr></hr>
            {lang === "en" && (
              <p className="p-2 lg:text-base md:text-[13px] ">
                Provide cost savings and availability to the group members by
                pooling resources and making bulk purchases together.
              </p>
            )}

            {lang === "fr" && (
              <p className="p-2 lg:text-base md:text-[13px] ">
                Permettre aux membres du groupe de réaliser des économies et
                d’être disponibles en la mise en commun des ressources et la
                réalisation d’achats en gros.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
