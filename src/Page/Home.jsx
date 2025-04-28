import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Hero from "@/Component/Home/Hero";
import HeroBuyer from "@/Component/Home/HeroBuyer";
import { Suspense, lazy } from "react";

const ProductPage = lazy(() => import("./product/ProductPage"));
const Footer = lazy(() => import("@/Component/Footer"));
const Home = () => {
  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
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
      <section className="py-10">
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductPage />
        </Suspense>
      </section>

      <footer>
        <Suspense fallback={<div>Loading footer...</div>}>
          <Footer />
        </Suspense>
      </footer>
    </>
  );
};

export default Home;
