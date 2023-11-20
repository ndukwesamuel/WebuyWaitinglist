import { Link, useNavigate } from "react-router-dom";
import background from "../../assets/images/medium-shot-man-delivering-groceries 1.jpg";
import image from "../../assets/images/Subtract.png";
export function GroupPage({ params, lang, setLang }) {
  return (
    <>
      <div className="w-full  overflow-hidden font-['Raleway']">
        <div className="relative w-full h-full">
          <img
            className="object-cover w-full h-screen transition-all"
            src={background}
            alt=""
          ></img>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <NewHeader lang={lang} setLang={setLang} />
          <NewMain lang={lang} setLang={setLang} />
          <Footer lang={lang} setLang={setLang} />
        </div>
      </div>
    </>
  );
}

export const Footer = ({ lang, setLang }) => {
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
              Initier et cultiver une communauté florissante d’acheteurs en
              vrac.
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
              Permettre aux membres du groupe de réaliser des économies et
              d’être disponibles en la mise en commun des ressources et la
              réalisation d’achats en gros.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export const NewHeader = ({ lang, setLang }) => {
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

export const NewMain = ({ lang, setLang }) => {
  const navigation = useNavigate();
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
          <Link
            to="/signup"
            className="bg-[#009b4d] border-[0.5px] drop-shadow-md border-black text-[#ffffff] text-base font-semibold mt-4 rounded-full px-[20px] py-[10px] hover:bg-opacity-60 hover:border-none transition-transform "
            type="button"
            // onClick={() => navigation("/signup")}
          >
            Create a Group
          </Link>
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
