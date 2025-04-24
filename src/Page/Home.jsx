import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Hero from "@/Component/Home/Hero";
import HeroBuyer from "@/Component/Home/HeroBuyer";
const Home = () => {
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
          <Hero />
        </SwiperSlide>
        <SwiperSlide className="flex items-center content-center">
          <HeroBuyer />{" "}
        </SwiperSlide>
      </Swiper>

      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque
        voluptate ullam voluptatum. Maxime aspernatur rem dolores a repellendus
        necessitatibus atque totam nesciunt consectetur, tenetur, nobis soluta.
        Voluptatem voluptates laboriosam quam.
      </div>
    </>
  );
};

export default Home;
