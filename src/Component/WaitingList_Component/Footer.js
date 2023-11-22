import React from 'react';

const Footer = ({lang, setLang}) => {
  return (
    <>
      <div className="flex flex-row w-full gap-4 px-[140px] place-content-end place-items-end ">
        <div className="flex flex-col content-center w-[245px] h-[290px] float-left p-3 rounded-t-3xl bg-[#665a3c] bg-opacity-80 text-[#faf5e9] font-medium border-[1px] border-[#ffffff]">
          {lang === "en" && (
            <h2 className="px-5 mb-2 leading-tight text-center ">
              Start and grow your Group.
            </h2>
          )}

          {lang === "fn" && (
            <h2 className="px-3 mb-2 leading-tight text-center ">
              Démarrez et développez votre groupe.
            </h2>
          )}
          <hr></hr>
          {lang === "en" && (
            <p className="mt-2 mb-5 text-[13px] ">
              Initiate and cultivate a thriving community of bulk buyers.
            </p>
          )}

          {lang === "fn" && (
            <p className="mt-2 mb-5 text-[13px] ">
              Initier et cultiver une communauté florissante d’acheteurs en vrac.
            </p>
          )}
        </div>
        <div className=" w-[245px] h-[300px] px-3 py-3 rounded-t-3xl bg-[#665a3c] font-medium bg-opacity-80 text-[#faf5e9] border-[1px] border-[#ffffff]">
          {lang === "en" && (
            <h2 className="px-4 mb-1 leading-tight text-center ">
              Aggregate Demand and make orders.
            </h2>
          )}

          {lang === "fn" && (
            <h2 className="px-4 mb-1 leading-tight text-center ">
              Cumulez la demande et passez des commandes.
            </h2>
          )}

          <hr></hr>
          {lang === "en" && (
            <p className="mt-1 mb-2 text-[13px] ">
              Coordinate and organize group purchase, leveraging the buying
              power to negotiate better deals, discounts, or group rates from
              suppliers.
            </p>
          )}

          {lang === "fn" && (
            <p className="mt-1 mb-2 text-[13px] ">
              Coordonner et organiser les achats groupés, en tirant parti de
              l’achat Pouvoir de négocier de meilleures offres, des rabais ou
              des tarifs de groupe de Fournisseurs.
            </p>
          )}
        </div>
        <div className=" w-[245px] h-[310px] mt-4 py-2 px-2 font-medium rounded-t-3xl bg-[#665a3c] bg-opacity-80 text-[#faf5e9] border-[1px] border-[#ffffff]">
          {lang === "en" && (
            <h2 className="px-4 mb-2 leading-tight text-center ">
              Receive orders and share to group members.
            </h2>
          )}

          {lang === "fn" && (
            <h2 className="px-1 mb-1 leading-tight text-center ">
              Recevoir des commandes et les partager avec les membres du groupe.
            </h2>
          )}

          <hr></hr>
          {lang === "en" && (
            <p className="mt-2 mb-2 text-[13px] ">
              Provide cost savings and availability to the group members by
              pooling resources and making bulk purchases together.
            </p>
          )}

          {lang === "fn" && (
            <p className="mt-1 mb-2 text-[13px] ">
              Permettre aux membres du groupe de réaliser des économies et d’être disponibles en la mise en commun des ressources et la réalisation d’achats en gros.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Footer