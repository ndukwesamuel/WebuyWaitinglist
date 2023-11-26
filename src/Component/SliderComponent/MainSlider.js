import React from 'react';

import Buyers from '../WaitingList_Component/Buyers';
import Main from '../WaitingList_Component/Main';

const MainSlider = () => {
  return (
    <>
      <div className="carousel relative w-full h-screen overflow-hidden">
        <div className="slider flex h-full w-[400%]">
          <section className="content-1 w-full basis-full">
            <Main />
          </section>
          <section className="content-2 w-full basis-full">
            <Buyers />
          </section>
        </div>
        <div className="controls absolut w-full top-1/2 cursor-pointer">
          <span className="arrow-left left-[10px] ">left
          </span>
          <span className="arrow-right absolute right-[0px]">right</span>
        </div>
      </div>
    </>
  );
}

export default MainSlider