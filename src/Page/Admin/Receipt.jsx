import React, { useEffect, useState } from "react";

import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import background from "../../assets/images/Rectangle 115.png";
import Navbar from "../../Component/AdminComponent/Navbar";
import Sidebar from "../../Component/AdminComponent/Sidebar";
import ModalContainer from "../../Component/modal-container/modal-container";
import { Admin_get_all_recipte_fun_ } from "../../Redux/AdminRecipteSLice";

const Base_URL = import.meta.env.VITE_REACT_APP_Url;

const Recipte = () => {
  const { token } = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const toggleSuccess = () => {
    setShowSuccess(!showSuccess);
  };
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedReceiptId, setSelectedReceiptId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const { Admin_get_all_recipte } = useSelector(
    (state) => state.reducer?.AdminRecipteSLice
  );

  useEffect(() => {
    dispatch(Admin_get_all_recipte_fun_());

    return () => {};
  }, [dispatch]);
  const [createLoading, setCreateLoading] = useState(false);

  const createmutation = useMutation(
    async ({ receiptId, status }) => {
      let API_URL = `${Base_URL}wallet/receipt`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let data = { receiptId, status };
      setCreateLoading(true);
      return await axios.post(API_URL, data, config);
    },
    {
      onSuccess: (response) => {
        const message = response?.data?.message || "Operation successful";
        toast.success(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setCreateLoading(false);
        // refetch();
      },
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.message || "An error occurred";
        toast.error("error here", {
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
        setCreateLoading(false);
      },
    }
  );

  const handleUpdateClick = (receiptId) => {
    setSelectedReceiptId(receiptId); // Set the selected receipt ID when "Update" is clicked
    setShowSuccess(true); // Show the modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createmutation.mutate({
      receiptId: selectedReceiptId, // Use the selected receipt ID
      status: selectedStatus,
    });
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
  };
  const statusOptions = [
    { value: "pending", label: "pending" },
    { value: "approved", label: "approved" },
    { value: "declined", label: "declined" },
  ];
  const formatDate = (dateString) => {
    const dateOrdered = new Date(dateString);
    return dateOrdered instanceof Date && !isNaN(dateOrdered)
      ? `${dateOrdered.toLocaleDateString()}`
      : "Invalid Date";
  };

  let filteredrecipts = Admin_get_all_recipte?.message?.filter((item) =>
    item?.user?.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log({
    ffd: filteredrecipts,
  });
  return (
    <div>
      {/* <div className="relative w-full h-full">
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
                <table className="w-full ">
                  <thead className="">
                    <tr className=" text-[#565454]">
                      <th className=" p-[16px] sticky top-0 left-0 bg-[#d5d1defe] border-collapse">
                        Receipt ID
                      </th>

                      <th className=" p-[16px] sticky top-0 left-0 bg-[#d5d1defe] border-collapse">
                        Username
                      </th>
                      <th
                        className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe] "
                        style={{
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Amount
                      </th>

                      <th className=" p-[16px] sticky top-0 left-0 bg-[#d5d1defe] border-collapse">
                        Date
                      </th>

                      <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className=" font-semibold text-[#565454]">
                    {filteredrecipts?.map((order) => (
                      <tr
                        className=" even:bg-[#0000000b] hover:bg-[#fff6] text-center"
                        key={order._id}
                      >
                        <td
                          className="p-[16px] border-collapse"
                          style={{
                            maxWidth: "100px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          #{order._id}
                        </td>
                        <td
                          className="p-[16px] border-collapse"
                          style={{
                            maxWidth: "200px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {order?.user?.fullName}
                        </td>
                        <td
                          className="p-[16px] border-collapse"
                          style={{
                            maxWidth: "200px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {order?.amount}
                        </td>
                        <td className=" p-[16px] border-collapse">
                          {formatDate(order?.createdAt)}
                        </td>
                        <td className="p-[10px] border-collapse text-black">
                          <p
                            className={`text-center rounded-xl py-[6.4px] px-2 -ml-4 
    ${
      order?.status === "declined"
        ? "bg-red-500 text-white"
        : order?.status === "pending"
        ? "bg-brown-500 text-white debug"
        : order?.status === "approved"
        ? "bg-green-500 text-white"
        : ""
    }`}
                          >
                            {order?.status}
                          </p>
                        </td>

                        <td
                          className="p-[16px] border-collapse"
                          style={{
                            maxWidth: "100px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Link to="/admin/view-receipt" state={order}>
                            View
                          </Link>
                        </td>
                        <td
                          className="p-[16px] border-collapse"
                          style={{
                            maxWidth: "100px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Link
                            onClick={() => {
                              handleUpdateClick(order._id);
                            }}
                          >
                            Update
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </main>
          </div>
        </div>
      </div> */}
      <div
        className="flex items-center justify-center  px-4 mt-10 "
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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
            <table className="w-full ">
              <thead className="">
                <tr className=" text-[#565454]">
                  <th className=" p-[16px] sticky top-0 left-0 bg-[#d5d1defe] border-collapse">
                    Receipt ID
                  </th>

                  <th className=" p-[16px] sticky top-0 left-0 bg-[#d5d1defe] border-collapse">
                    Username
                  </th>
                  <th
                    className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe] "
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Amount
                  </th>

                  <th className=" p-[16px] sticky top-0 left-0 bg-[#d5d1defe] border-collapse">
                    Date
                  </th>

                  <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className=" font-semibold text-[#565454]">
                {filteredrecipts?.map((order) => (
                  <tr
                    className=" even:bg-[#0000000b] hover:bg-[#fff6] text-center"
                    key={order._id}
                  >
                    <td
                      className="p-[16px] border-collapse"
                      style={{
                        maxWidth: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      #{order._id}
                    </td>
                    <td
                      className="p-[16px] border-collapse"
                      style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {order?.user?.fullName}
                    </td>
                    <td
                      className="p-[16px] border-collapse"
                      style={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {order?.amount}
                    </td>
                    <td className=" p-[16px] border-collapse">
                      {formatDate(order?.createdAt)}
                    </td>
                    <td className="p-[10px] border-collapse text-black">
                      <p
                        className={`text-center rounded-xl py-[6.4px] px-2 -ml-4 
    ${
      order?.status === "declined"
        ? "bg-red-500 text-white"
        : order?.status === "pending"
        ? "bg-brown-500 text-white debug"
        : order?.status === "approved"
        ? "bg-green-500 text-white"
        : ""
    }`}
                      >
                        {order?.status}
                      </p>
                    </td>

                    <td
                      className="p-[16px] border-collapse"
                      style={{
                        maxWidth: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Link to="/admin/view-receipt" state={order}>
                        View
                      </Link>
                    </td>
                    <td
                      className="p-[16px] border-collapse"
                      style={{
                        maxWidth: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Link
                        onClick={() => {
                          handleUpdateClick(order._id);
                        }}
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
      <ModalContainer close={toggleSuccess} show={showSuccess}>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-2">
          <div className="relative mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Update Receipt Status
            </label>

            <select
              className="absolute right-0 w-full h-10 p-2  bg-[#f6f6f6] text-[#6f6d6d] rounded-lg"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center mb-[4rem] mt-[4rem]">
            <button
              type="submit"
              className="bg-[#009B4D] text-white py-2 px-4 rounded hover:bg-[#009B4D] focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              {createLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-t-2 border-[#4f7942] border-solid rounded-full animate-spin" />
                </div>
              ) : (
                <>Update </>
              )}
            </button>
          </div>
        </form>
      </ModalContainer>
    </div>
  );
};

export default Recipte;
