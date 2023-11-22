import React, { useState } from "react";

import Header from "../Component/WaitingList_Component/Header";
import Main from "../Component/WaitingList_Component/Main";

import background from "../assets/images/medium-shot-man-delivering-groceries 1.jpg";
import Footer from "../Component/WaitingList_Component/Footer";

function WaitingList() {
  const [lang, setLang] = useState("en");

  return (
    <div className="w-full h-screen overflow-hidden font-['Raleway']">
      <div className="relative w-full h-full">
        <img
          className="object-cover w-full h-screen transition-all"
          src={background}
          alt=""
        ></img>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <Header lang={lang} setLang={setLang} />
        <Main lang={lang} setLang={setLang} />
        <Footer lang={lang} setLang={setLang} />
      </div>
    </div>
  );
}

export default WaitingList;
