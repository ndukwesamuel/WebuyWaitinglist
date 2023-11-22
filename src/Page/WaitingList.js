import React, { useState } from 'react';

import Header from '../Component/WaitingList_Component/Header';
import Main from '../Component/WaitingList_Component/Main';

function WaitingList() {
  const [lang, setLang] = useState("en");

  return (
    <div className="w-full h-screen font-['Raleway']">
      <div className="absolute inset-0">
        <Header lang={lang} setLang={setLang} />
        <Main lang={lang} setLang={setLang} />
      </div>
    </div>
  );
}

export default WaitingList;
