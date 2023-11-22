import React from "react";
import Main from "./Main";
import OrdersPage from "./OrdersPage";

import Navbar from "../../Component/AdminComponent/Navbar";
import Sidebar from "../../Component/AdminComponent/Sidebar";
import background from "../../assets/images/Rectangle 115.png";
import { Route, Routes } from "react-router-dom";
import ProductsList from "./Products/ProductsList";
import GroupPage from "../UserDashboard/GroupPage";
import AddProducts from "./Products/AddProducts";
import { useSelector } from "react-redux";

function AdminRoute() {
  const data = useSelector((state) => state.reducer?.AuthenticationSlice);
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
            <Route path="/products" element={<ProductsList />} />
            <Route path="/Addproduct" element={<AddProducts />} />

            <Route path="/group" element={<GroupPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminRoute;
