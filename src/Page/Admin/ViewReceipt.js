import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import background from "../../assets/images/gaelle-marcel-Y1kFBWWzOP4-unsplash.jpg";
import Navbar from "../../Component/AdminComponent/Navbar";
// import background from "../images/gaelle-marcel-Y1kFBWWzOP4-unsplash.jpg";
import Sidebar from "../../Component/AdminComponent/Sidebar";
import { Get_All_User_Orders_fun } from "../../Redux/OrderSlice";
import { Admin_get_all_recipte_fun_ } from "../../Redux/AdminRecipteSLice";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Base_URL = process.env.REACT_APP_Url;

const UpdateRecipte = () => {
  const { token } = useSelector(
    (state) => state.reducer?.AuthenticationSlice?.data
  );

  const { state } = useLocation();
  console.log({
    state,
  });

  const { amount, createdAt, _id, receipt, status, updatedAt, user } = state;

  // const orderData = location.state;

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const { All_User_orders } = useSelector((state) => state.reducer?.OrderSlice);

  const { Admin_get_all_recipte } = useSelector(
    (state) => state.reducer?.AdminRecipteSLice
  );

  return (
    <div>
      <div className="relative w-full h-full">
        <img
          className="object-cover w-full h-full "
          src={background}
          alt=""
        ></img>
      </div>
      <div className="absolute inset-0 flex ">
        <div className=" basis-[10%] h-full">
          <Sidebar />
        </div>
        <div className=" basis-[90%]">
          <Navbar />
          <div className="flex items-center justify-center pl-12 pr-5 mt-10 ">
            <main className=" w-full  overflow-hidden table border-collapse font-['Raleway'] bg-[#fff5] shadow-md bg-opacity-5 rounded-[12.8px] mt-[15px]">
              <section className="flex content-center justify-between w-full h-[10%] bg-[#fff4] py-[12.8px] px-[30px]">
                <h1 className=" text-[24px] font-bold">Recipts</h1>
                <form className="w-[400px] max-sm:max-w-md lg:max-w-lg md:max-w-sm">
                  <div className="relative flex items-center">
                    <i className="fa-solid absolute w-[13px] h-[13px] pointer-events-none ml-4 fa-magnifying-glass fa-beat-fade"></i>
                    <input
                      type="text"
                      name="search"
                      placeholder=""
                      autoComplete="off"
                      className="w-full px-3 py-[5px] max-sm:py-[15px] pl-10 font-semibold placeholder-gray-500 text-[#565454] rounded-full border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    ></input>
                  </div>
                </form>
              </section>
              <section className=" w-[95%] max-h-[calc(89%-25.6px)] rounded-[9.6px] overflow-auto bg-[#fffb] my-[12.8px] mx-auto    ">
                <div className=" mt-8 p-4 bg-white rounded shadow-lg">
                  <h2 className="text-2xl font-bold mb-4">
                    Receipt Information
                  </h2>
                  <p>
                    <span className="font-semibold">ID:</span> {_id}
                  </p>
                  <p>
                    <span className="font-semibold">User:</span> {user.fullName}
                  </p>
                  <p>
                    <span className="font-semibold">Amount:</span> ${amount}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span> {status}
                  </p>
                  <p>
                    <span className="font-semibold">Created At:</span>{" "}
                    {createdAt}
                  </p>
                  <p>
                    <span className="font-semibold">Updated At:</span>{" "}
                    {updatedAt}
                  </p>
                  <img
                    src={receipt}
                    alt="Receipt"
                    className="mt-4"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRecipte;
