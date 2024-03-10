import React from 'react';

import background
  from '../../assets/images/gaelle-marcel-Y1kFBWWzOP4-unsplash.jpg';
import board
  from '../../assets/istockphoto-1320029684-612x612__1_-removebg.png';
import UserSidebar from '../../Component/UserComponent/UserSidebar';
import playstore from '../../img/Google-Play-PNG-Clipart.png';
import UserNavbar from '../FacilitatorFolder/Header';

const OnboardingRoute = () => {
  return (
    <>
      <div className="relative w-full h-screen">
        <img
          className="object-cover w-full h-full "
          src={background}
          alt=""
        ></img>
      </div>
      <div className="absolute inset-0 flex">
        <div className=" border-none outline-none basis-[15%]">
          <UserSidebar />
        </div>
        <div className=" basis-[90%]">
          <UserNavbar />
          <div className="flex items-center justify-center px-12 mt-10">
            <main className="flex w-full bg-white rounded-2xl ">
              <div className="w-[60%] rounded-l-2xl h-full p-10  bg-white">
                <h1 className="mt-8 text-3xl max-w-[450px] font-black leading-10 ">
                  <span className=" text-4xl text-[#009b4d]">Webuy...</span> Fresher Groceries, <br></br> Bigger
                  Savings, Better Community
                </h1>
                <p className="mt-1 text-[#565454] font-medium max-w-[450px] text-lg ">
                  App connects farmers, streamlining buying through trusted groups for convenience and affordability
                </p>
                <a href="/">
                  <img className="w-[150px] " src={playstore} alt=""></img>
                </a>
              </div>
              <div className=" w-[40%] h-full rounded-r-2xl bg-[#009b4d]">
                <img
                  className="board relative right-[160px]"
                  src={board}
                  alt=""
                ></img>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnboardingRoute