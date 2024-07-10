import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import background from "../../assets/images/gaelle-marcel-Y1kFBWWzOP4-unsplash.jpg";
import Navbar from "../../Component/AdminComponent/Navbar";
// import background from "../images/gaelle-marcel-Y1kFBWWzOP4-unsplash.jpg";
import Sidebar from "../../Component/AdminComponent/Sidebar";

import {
  Admin_get_single_recipte_fun,
  AdminRecipteSLice_reset,
} from "../../Redux/AdminRecipteSLice";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import axios from "axios";
let main_url = process.env.REACT_APP_Url;

const Base_URL = process.env.REACT_APP_Url;

const UpdateRecipte = () => {
  const { token } = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data?.data
  );

  const { Admin_get_single_recipte, Admin_single_recipte } = useSelector(
    (state) => state.reducer?.AdminRecipteSLice
  );

  const { state } = useLocation();

  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  console.log({
    ss: token,
  });

  useEffect(() => {
    dispatch(Admin_get_single_recipte_fun(state?._id));
    return () => {
      dispatch(AdminRecipteSLice_reset());
    };
  }, [dispatch, state?._id]);

  const UpdateUserWalletmutation = useMutation(
    (formData) => {
      // Your API request code here
      // Use formData to send the image data to the API

      let API_URL = `${main_url}wallet/receipt`;
      // let API_URL = "http://localhost:5000/api/wallet/receipt/";
      console.log({
        ddd: formData,
        API_URL,
        token,
      });

      // const tokengot = data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      return axios.post(API_URL, formData, config);
    },
    {
      onSuccess: (data) => {
        console.log({
          aaaa: data?.data,
        });
        toast.success("Updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
      onError: (error) => {
        console.log({
          error: error?.response?.data?.message,
        });
        toast.error(`${error?.response?.data?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          className: "Forbidden403",
        });
      },
    }
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
                  <div className="flex justify-between">
                    <h2 className="text-2xl font-bold mb-4">
                      Receipt Information
                    </h2>

                    <div>
                      {Admin_single_recipte?.message?.status === "pending" ? (
                        <div className="flex gap-10">
                          <button
                            className="bg-red-500  text-white font-bold py-2 px-4 rounded"
                            onClick={() =>
                              UpdateUserWalletmutation.mutate("declined")
                            }
                          >
                            {UpdateUserWalletmutation?.isLoading
                              ? "Loading..."
                              : "Decline"}
                          </button>

                          <button
                            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() =>
                              UpdateUserWalletmutation.mutate({
                                status: "approved",
                                receiptId: Admin_single_recipte?.message?._id,
                              })
                            }
                          >
                            {UpdateUserWalletmutation?.isLoading
                              ? "Loading..."
                              : "Approve"}
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-10">
                          <button className="bg-yellow-500  text-white font-bold py-2 px-4 rounded">
                            {Admin_single_recipte?.message?.status}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <p>
                    <span className="font-semibold">ID:</span>{" "}
                    {Admin_single_recipte?.message?._id}
                  </p>
                  <p>
                    <span className="font-semibold">User:</span>{" "}
                    {Admin_single_recipte?.message?.user?.fullName}
                  </p>
                  <p>
                    <span className="font-semibold">Amount: </span>
                    {Admin_single_recipte?.message?.amount}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {Admin_single_recipte?.message?.status}
                  </p>
                  <p>
                    <span className="font-semibold">Created At:</span>{" "}
                    {Admin_single_recipte?.message?.createdAt}
                  </p>
                  <p>
                    <span className="font-semibold">Updated At:</span>{" "}
                    {Admin_single_recipte?.message?.updatedAt}
                  </p>
                  <img
                    src={Admin_single_recipte?.message?.receipt}
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
