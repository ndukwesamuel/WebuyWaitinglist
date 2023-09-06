import React from "react";
import Main from "./Main";
import OrdersPage from "./OrdersPage";

import Navbar from "../../Component/AdminComponent/Navbar";
import Sidebar from "../../Component/AdminComponent/Sidebar";
import background from "../../assets/images/Rectangle 115.png";
import { Route, Routes } from "react-router-dom";
import GroupPage from "./GroupPage";

function GroupRoute() {
  return (
    <div className="">
      <div className="relative w-full h-screen">
        <img
          className="object-cover w-full h-full "
          src={background}
          alt=""
        ></img>
      </div>
      <div className="absolute inset-0 flex overflow-scroll">
        <div className=" basis-[12%] h-full">
          <Sidebar />
        </div>
        <div className=" basis-[88%]">
          <Navbar />

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/group-page" element={<GroupPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default GroupRoute;
