import React from "react";
import Main from "./Main";
import OrdersPage from "./OrdersPage";
import GroupOrders from "./GroupOrders";

import Navbar from "../../Component/AdminComponent/Navbar";
import Sidebar from "../../Component/AdminComponent/Sidebar";
import background from "../../assets/images/Rectangle 115.png";
import { Route, Routes } from "react-router-dom";
import ProductsList from "./Products/ProductsList";
import GroupPage from "../UserDashboard/GroupPage";
import GroupsPage from "../Admin/GroupsPage";

import AddProducts from "./Products/AddProducts";
import AddCategory from "./Products/AddCategory";

import { useSelector } from "react-redux";
import Category from "./Category";
import Receipt from "./Receipt";
import ViewReceipt from "./ViewReceipt";
import UpdateReceipt from "./UpdateReceipt";
import Users from "./Users";

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
            <Route path="/group-orders" element={<GroupOrders />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/Addproduct" element={<AddProducts />} />
            <Route path="/category" element={<AddCategory />} />
            {/* <Route path="/category" element={<Category />} />
            // <Route path="/Addcategory" element={<Category />} /> */}
            <Route path="/group" element={<GroupsPage />} />
            <Route path="/receipt" element={<Receipt />} />
            <Route path="/view-receipt" element={<ViewReceipt />} />
            <Route path="/users" element={<Users />} />

            <Route path="/update-receipt" element={<UpdateReceipt />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminRoute;
