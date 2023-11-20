import React, { useState } from "react";

import Header from "../Component/WaitingList_Component/Header";
import Main from "../Component/WaitingList_Component/Main";
import background from "../assets/images/medium-shot-man-delivering-groceries 1.jpg";
import image from "../assets/images/Subtract.png";
import { GroupPage } from "./Homepage/GroupSlide";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function HomePage() {
  const [lang, setLang] = useState("en");

  return (
    <>
      <GroupPage lang={lang} setLang={setLang} />
      {/* <GroupPage lang={lang} setLang={setLang} /> */}
    </>
  );
}

export default HomePage;

// src/App.js

const MainSLide = () => {
  const slides = [<GroupPage />, <GroupPage />];

  return (
    <div className="App">
      <Slide slides={slides} />
    </div>
  );
};

// src/Slide.js

const Slide = ({ slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Adjust the autoplay speed in milliseconds (2 seconds in this example)
  };

  return (
    <div className="slide-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <img src={slide} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
