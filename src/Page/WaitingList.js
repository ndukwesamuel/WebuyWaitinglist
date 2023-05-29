import React, { useState } from "react";
import Header from "../Component/WaitingList_Component/Header";
import Main from "../Component/WaitingList_Component/Main";

function WaitingList() {
  const [lang, setLang] = useState("en");

  return (
    <div className=" h-screen w-full bg-[url('../public/images/gaelle-marcel-Y1kFBWWzOP4-unsplash.jpg')] bg-no-repeat bg-center bg-cover py-8 px-28 max-sm:px-5 max-md:px-5">
      <Header lang={lang} setLang={setLang} />
      <Main lang={lang} setLang={setLang} />
    </div>
  );
}

export default WaitingList;
