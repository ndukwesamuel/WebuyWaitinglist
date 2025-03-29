import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

import React, { useState } from 'react';

import {
  Autoplay,
  Navigation,
} from 'swiper/modules';
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
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper w-full h-full font-['Raleway']"
      >
        <SwiperSlide className="flex items-center content-center">
          <Main lang={lang} setLang={setLang} />{" "}
        </SwiperSlide>
        <SwiperSlide className="flex items-center content-center">
          <Buyers lang={lang} setLang={setLang} />{" "}
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default WaitingList;
