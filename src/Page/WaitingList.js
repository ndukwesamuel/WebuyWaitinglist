import 'swiper/css';
import 'swiper/css/pagination';

import React, { useState } from 'react';

import { Pagination } from 'swiper/modules';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import Buyers from '../Component/WaitingList_Component/Buyers';
import Main from '../Component/WaitingList_Component/Main';

function WaitingList() {
  const [lang, setLang] = useState("en");

  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper w-full h-full font-['Raleway']">
        <SwiperSlide className="">
          {" "}
          <Main lang={lang} setLang={setLang} />{" "}
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <Buyers lang={lang} setLang={setLang} />{" "}
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default WaitingList;
