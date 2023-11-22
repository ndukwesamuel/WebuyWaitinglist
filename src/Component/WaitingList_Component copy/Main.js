import React, { useState } from "react";

import Modal from "./Modal";

const Main = ({ lang, setLang }) => {
  const [Email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [join, setJoin] = useState(false);

  const Submit = async (e) => {
    e.preventDefault();

    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: "post",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify([[Email, new Date().toLocaleDateString()]]),
      };

      fetch(
        "https://v1.nocodeapi.com/samheart/google_sheets/EiIEnYxkJVtmxmoL?tabId=Sheet1",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      setIsOpen(true);
      setEmail("");
      setJoin(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isOpen && <Modal setIsOpen={setIsOpen} isOpen={isOpen} />}
      <div className="w-full mt-[80px] text-white">
        <a className="cursor-pointer" href="/">
          {lang === "en" && (
            <h1 className="font-extrabold text-center text-white lg:text-5xl max-sm:text-3xl md:text-4xl ">
              WE
              <span className="font-extrabold text-[#6dad04] border-2 border-[#6dad04] px-1 ml-1">
                BUY
              </span>{" "}
              is launching soon...
            </h1>
          )}

          {lang === "fn" && (
            <h1 className="text-5xl font-extrabold text-center text-white max-sm:text-3xl max-md:text-4xl ">
              NOUS ACHETONS sera bientôt lancé...
            </h1>
          )}
        </a>

        {lang === "en" && (
          <p className="text-lg font-semibold leading-8 text-center mt-7 max-sm:text-base max-md:text-lg max-sm:text-left max-sm:mt-3">
            Getting groceries and foodstuff doesn't have to be so
            <span className="text-[#6dad04] border-2 border-[#6dad04] ml-3 p-1 text-3xl max-sm:text-lg md:text-2xl font-extrabold hover:border-none hover:underline hover:decoration-wavy hover:decoration-[#6dad04] hover:decoration-2 transition-all">
              difficult and expensive
            </span>
            . We are building Africa's largest digital infrastructure
            for group buying . Don't miss out on the chance to save money on
            your purchases. Be the first to know when we launch, join the
            wait-list.
          </p>
        )}

        {lang === "fn" && (
          <>
            <p className="mt-6 text-lg font-semibold text-center max-sm:text-base max-md:text-lg max-sm:text-left max-sm:mt-3">
              Faire les courses et acheter des produits alimentaires ne doit pas
              être si
              <span className="text-[#6dad04] border-2 border-[#6dad04] ml-3 p-1 text-2xl max-sm:text-lg font-extrabold hover:border-none hover:underline hover:decoration-wavy hover:decoration-[#6dad04] hover:decoration-2 transition-all">
                difficile et cher
              </span>{" "}
              . Nous construisons l'infrastructure numérique la plus grande
              d'Afrique pour les achats en groupe. Ne manquez pas l'occasion
              d'économiser de l'argent sur vos achats. Soyez les premiers
              informés de notre lancement, rejoignez la liste d'attente.
            </p>
          </>
        )}

        <div className="flex content-center justify-center gap-1 mt-4">
          {lang === "en" && (
            <button
              className="mt-2 transition-all bg-[#6dad04] px-8 py-2 max-sm:px-4 font-semibold rounded-md hover:border-2 border-[#6dad04] hover:bg-transparent max-sm:text-sm max-md:text-base"
              type="button"
              onClick={() => setLang("fn")}
            >
              français
              <i className="ml-1 fa-solid fa-user-group"></i>
            </button>
          )}
          {lang === "fn" && (
            <button
              className="mt-2 transition-all bg-[#6dad04] px-8 py-2 max-sm:px-4 font-semibold rounded-md hover:border-2 border-[#6dad04] hover:bg-transparent max-sm:text-sm max-md:text-base"
              type="button"
              onClick={() => setLang("en")}
            >
              English
              <i className="ml-1 fa-solid fa-user-group"></i>
            </button>
          )}

          <button
            className="mt-2 transition-all bg-[#6dad04] px-8 py-2 max-sm:px-4 font-semibold rounded-md hover:border-2 border-[#6dad04] hover:bg-transparent max-sm:text-sm max-md:text-base"
            type="button"
            onClick={() => setJoin(true)}
          >
            Join the Wait-list
            <i className="ml-1 fa-solid fa-user-group"></i>
          </button>
        </div>
        <div className="flex content-center justify-center text-center w-300px">
          {join && (
            <form className="mt-4">
              <h2 className="text-lg">Count me In!</h2>
              <div className="relative ">
                <input
                  className="w-[300px] max-sm:w-[250px] block h-9 mt-1 border-none outline-none bg-[#ffffff] text-[#000000] text-center cursor-pointer text-sm rounded-full focus:outline-[2px] focus:outline-[#6dad04] "
                  placeholder="Enter your email here*"
                  type="email"
                  value={Email}
                  name="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                ></input>

                <button
                  className="mt-3 text-sm font-semibold bg-transparent border-2 border-[#6dad04] rounded-full px-6 max-sm:px-4 py-2 hover:bg-[#6dad04] transition-all"
                  type="button"
                  onClick={Submit}
                >
                  {lang === "fn" ? "Inscrivez-moi " : "   Sign Me Up!"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
