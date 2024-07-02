import React, { useState } from "react";

import axios from "axios";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import avatar from "../../assets/Ellipse 13.png";
import avatar1 from "../../assets/Ellipse 14.png";
import avatar2 from "../../assets/Ellipse 15.png";
import avatar3 from "../../assets/Ellipse 16.png";
import avatar4 from "../../assets/Ellipse 17.png";
import PieComponent from "../../Component/AdminComponent/PieComponent";
import { LoadingSkeleton } from "../../Component/Loader/LoadingSkeleton";
import { useGetGroupOrderQuery } from "../../Redux/orderApi";

// import PieComponent from ".";

const Base_URL = process.env.REACT_APP_Url;

const datas = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    uv: 5490,
    pv: 1300,
    amt: 2100,
  },
  {
    name: "Sep",
    uv: 7490,
    pv: 2300,
    amt: 2100,
  },
  {
    name: "Oct",
    uv: 3490,
    pv: 7300,
    amt: 2100,
  },
  {
    name: "Nov",
    uv: 2490,
    pv: 6300,
    amt: 2100,
  },
  {
    name: "Dec",
    uv: 8490,
    pv: 5300,
    amt: 2100,
  },
];
const Main = () => {
  // const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data?.data
  );

  console.log({
    rer: token,
  });

  const {
    data: orders,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetGroupOrderQuery();

  const createmutation = useMutation(
    async ({ orderId, status }) => {
      let API_URL = `${Base_URL}history/group-order`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let data = { orderId, status };
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
        refetch();
      },
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.message || "An error occurred";
        toast.error(errorMessage, {
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

  // const { data, isLoading, isError, error } = useGetRevenueQuery();
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isError) {
    return toast.error(error.data.message);
  }

  let filteredOrders = [];

  if (orders && Array.isArray(orders.message)) {
    filteredOrders = orders.message.filter(
      (order) =>
        order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order?.groupId?.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        order?.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order?.groupId?.country
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        order?.productId?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleUpdateClick = (selectedOrderId) => {
    setSelectedOrderId(selectedOrderId);
    setShowSuccess(true);
  };

  const formatDate = (dateString) => {
    const dateOrdered = new Date(dateString);
    return dateOrdered instanceof Date && !isNaN(dateOrdered)
      ? `${dateOrdered.toLocaleDateString()}`
      : "Invalid Date";
  };

  return (
    <div className="px-[25px] pt-[10px] pb-[40px] font-['Raleway'] z-0">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] leading-[34px] font-semibold text-[#232323] cursor-pointer">
          Dashboard
        </h1>
        <button className="bg-[#009B4D] h-[32px] rounded-[3px] text-white flex items-center justify-center px-[8px] transform hover:scale-[103%] transistion duration-300 ease-out">
          Generate Report
        </button>
      </div>
      <div className="grid grid-cols-4 gap-[30px] mt-[10px]">
        <div className=" h-[130px] rounded-[8px] bg-white px-[20px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out flex flex-col items-center justify-center gap-3">
          <div className="flex flex-row items-center gap-4">
            <div className=" bg-[#D9D9D9] flex items-center justify-center rounded-[50%] w-[60px] h-[60px]">
              <i className="fa-solid fa-money-bills text-[24px] text-[#009B4D]"></i>
            </div>
            <div>
              <h2 className="font-medium text-[16px]">Total Revenue</h2>
              {/* <h1 className="font-bold text-[19px] ">{data?.totalRevenue}</h1> */}
            </div>
          </div>
          <div className="flex items-center flex-row gap-1 text-[12px]">
            <div className=" bg-[#009b4d] flex items-center justify-center rounded-[50%] w-[17px] h-[17px]">
              <i className="fa-solid fa-arrow-up transform: rotate-45 text-white text-[8px]"></i>
            </div>
            <p className=" text-[10px]">
              <span className=" text-[#009B4D]">+37% </span>from last month (NGN
              100,185)
            </p>
          </div>
        </div>
        <div className=" h-[130px] rounded-[8px] bg-white px-[20px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transistion duration-300 ease-out flex flex-col items-center justify-center gap-3">
          <div className="flex flex-row items-center gap-4 -ml-6">
            <div className=" bg-[#D9D9D9] flex items-center justify-center rounded-[50%] w-[60px] h-[60px]">
              <i className="fa-solid fa-cart-shopping text-[24px] text-[#009B4D]"></i>
            </div>
            <div>
              <h2 className="font-medium text-[16px]">Total Orders</h2>
              {/* <h1 className="font-bold text-[19px] ">{data?.totalOrders}</h1> */}
            </div>
          </div>
          <div className="flex items-center flex-row gap-1 text-[12px]">
            <div className=" bg-[#F60707] flex items-center justify-center rounded-[50%] w-[17px] h-[17px]">
              <i className="fa-solid fa-arrow-up fa-flip-vertical transform: -rotate-[135deg] text-white text-[8px]"></i>
            </div>
            <p className=" text-[10px]">
              <span className=" text-[#009B4D]">-10% </span>from last month (305
              orders)
            </p>
          </div>
        </div>
        <div className=" h-[130px] rounded-[8px] bg-white px-[20px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transistion duration-300 ease-out flex flex-col items-center justify-center gap-3">
          <div className="flex flex-row items-center gap-4 -ml-5">
            <div className=" bg-[#D9D9D9] flex items-center justify-center rounded-[50%] w-[60px] h-[60px]">
              <i className="fa-solid fa-user-group text-[24px] text-[#009B4D]"></i>
            </div>
            <div>
              <h2 className="font-medium text-[16px]">Today's Visitors</h2>
              <h1 className="font-bold text-[19px] ">1,459</h1>
            </div>
          </div>
          <div className="flex items-center flex-row gap-1 text-[12px]">
            <div className=" bg-[#009b4d] flex items-center justify-center rounded-[50%] w-[17px] h-[17px]">
              <i className="fa-solid fa-arrow-up transform: rotate-45 text-white text-[8px]"></i>
            </div>
            <p className=" text-[10px]">
              <span className=" text-[#009B4D]">+23% </span>from last yesterday
              (123 visitors)
            </p>
          </div>
        </div>
        <div className=" h-[130px] rounded-[8px] bg-white px-[20px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transistion duration-300 ease-out flex flex-col items-center justify-center gap-3">
          <div className="flex flex-row items-center gap-4">
            <div className=" bg-[#D9D9D9] flex items-center justify-center rounded-[50%] w-[60px] h-[60px]">
              <i className="fa-solid fa-percent text-[24px] text-[#009B4D]"></i>
            </div>
            <div>
              <h2 className="font-medium text-[16px]">Converson Rate</h2>
              <h1 className="font-bold text-[19px] ">20%</h1>
            </div>
          </div>
          <div className="flex items-center flex-row gap-1 text-[12px]">
            <div className=" bg-[#F60707] flex items-center justify-center rounded-[50%] w-[17px] h-[17px]">
              <i className="fa-solid fa-arrow-up fa-flip-vertical transform: -rotate-[135deg] text-white text-[8px]"></i>
            </div>
            <p className=" text-[10px]">
              <span className=" text-[#009B4D]">-15%</span> from yesterday (6.5%
              rate)
            </p>
          </div>
        </div>
      </div>

      <div className="flex mt-[15px] w-full h-[350px] gap-[30px] rounded-xl">
        <div className="basis-[80%] border bg-white shadow-md cursor-pointer rounded-xl">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[10px] rounded-xl px-[30px] border-b-[1px] border-[#EDEDED] mb-[20px]">
            <h2 className="text-[#232323] text-[16px] leading-[19px] font-bold">
              Sales Activity
            </h2>
            <div className=" text-[12px]">
              <div className="flex flex-row items-center gap-1 ">
                <div className=" rounded-full w-[7px] h-[7px] bg-[#f60707]"></div>
                <p className="text-[#707070]">Revenue</p>
              </div>
              <div className="flex flex-row items-center gap-1 ">
                <div className=" rounded-full w-[7px] h-[7px] bg-[#009b4d]"></div>
                <p className="text-[#707070]">Sales</p>
              </div>
            </div>
          </div>

          <div className=" w-full text-[13px]">
            {/* <canvas id="myAreaChart"></canvas> */}
            {/* <Line options={options} data={data} /> */}
            <ResponsiveContainer width="100%" height={270}>
              <AreaChart
                data={datas}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
                <ReferenceLine
                  y={4000}
                  label="Max"
                  stroke="red"
                  strokeDasharray="3 3"
                />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="basis-[20%] border bg-white shadow-md cursor-pointer rounded-xl">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] rounded-xl px-[20px] border-b-[1px] border-[#EDEDED]">
            <div>
              <h2 className=" text-[16px] font-bold text-[#232323]">
                Order Status
              </h2>
              <p className=" text-[12px] text-[#707070]">
                Total earning of the month
              </p>
            </div>
            <i className="fa-solid fa-arrow-trend-up cursor-pointer text-[#009b4d] transform hover:scale-[120%] transition duration-300 ease-out"></i>
          </div>

          <div className="pl-[35px]">
            <PieComponent />

            {}
          </div>
        </div>
      </div>

      <div className="flex mt-[15px] w-full py-[10px] gap-[30px]">
        <div className="basis-[65%] border rounded-xl bg-white shadow-md cursor-pointer">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] rounded-xl px-[20px] border-b-[1px] border-[#EDEDED] mb-[15px]">
            <h2 className="text-[#232323] text-[16px] leading-[19px] font-bold">
              Recent Orders
            </h2>
            <p className=" text-[13px] text-[#707070] font-medium cursor-pointer">
              View details
            </p>
          </div>
          {isError && toast.error(error.data.message)}
          <main className="w-full overflow-x-auto bg-[#fff5] shadow-md bg-opacity-5 rounded-[12.8px] mt-[15px]">
            <section className=" w-[95%] max-h-[calc(89%-25.6px)] rounded-[9.6px] overflow-auto bg-[#fffb] my-[12.8px] mx-auto    ">
              <div className="flex justify-center">
                <table className="w-full table-auto ">
                  <thead>
                    <tr className=" text-[#565454] text-[13px]">
                      <th className=" p-[16px] sticky top-0 left-0 bg-[#d5d1defe] border-collapse">
                        Order ID
                      </th>
                      <th className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe] ">
                        Name
                      </th>
                      <th className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe] ">
                        Country
                      </th>
                      <th className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe]">
                        Date
                      </th>
                      <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                        Status
                      </th>
                      <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                        item
                      </th>
                      <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                        Quantity
                      </th>
                      <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                        Total Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" font-semibold text-[#565454] text-[11px] ">
                    {filteredOrders &&
                      filteredOrders?.map((order) => (
                        <tr
                          className=" even:bg-[#0000000b] hover:bg-[#fff6] text-[11px]"
                          key={order._id}
                        >
                          <td className=" p-[16px] border-collapse">
                            #{order?._id}
                          </td>
                          <td className=" p-[16px] border-collapse">
                            {order?.groupId?.name}
                          </td>
                          <td className=" p-[16px] border-collapse">
                            {order?.groupId.country}
                          </td>
                          <td className=" p-[16px] border-collapse">
                            {formatDate(order?.createdAt)}
                          </td>
                          <td className="p-[16px] border-collapse text-black">
                            <p
                              className={`text-center rounded-full py-[6.4px] px-auto 
    ${
      order?.status === "Pending"
        ? "bg-red-500 text-black"
        : order?.status === "Processing"
        ? "bg-brown-500 text-black debug"
        : order?.status === "Completed"
        ? "bg-green-500 text-black"
        : ""
    }`}
                            >
                              {order?.status}
                            </p>
                          </td>
                          <td className=" p-[16px] border-collapse">
                            {order?.productId?.name}
                          </td>
                          <td className=" p-[16px] border-collapse">
                            {order?.totalQuantity}
                          </td>
                          <td className=" p-[16px] border-collapse">
                            #{order?.totalAmount}
                          </td>
                          <td>
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
              </div>
            </section>
          </main>
        </div>
        <div className="basis-[35%] border bg-white rounded-xl shadow-md cursor-pointer">
          <div className="bg-[#F8F9FC] flex items-center justify-between rounded-xl py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[15px]">
            <div className="flex flex-col ">
              <h2 className="text-[#232323] text-[16px] leading-[19px] font-bold">
                Group Members
              </h2>
              <p className="font-medium text-[12px] text-[#707070]">
                Members in your group
              </p>
            </div>
            <i className="fa-solid fa-people-group text-[#009b4d] text-[20px] transform hover:scale-[110%] transition duration-300 ease-out"></i>
          </div>
          <div className="w-full px-[15px] py-[0px]">
            <div className="bg-[#fff5] py-4 px-2 rounded-[9.6px] shadow-lg">
              <ol className=" flex justify-between w-full text-[13px] font-bold text-[#565454]">
                <li className="">Name</li>
                <li className="">Address</li>
                <li className="">Wallet</li>
              </ol>
            </div>
            <div className="py-[5px] mt-2 flex items-center justify-between flex-row gap-[10px]">
              <div className=" flex flex-row items-center gap-[5px]">
                <div className="flex items-center border rounded-full w-[40px] h-[40px]">
                  <img
                    className="object-center w-full h-full "
                    src={avatar}
                    alt=""
                  ></img>
                </div>
                <h2 className=" text-[11px] font-semibold text-[#565454]">
                  Mark Wahlberg
                </h2>
              </div>
              <p
                className=" text-[11px] font-semibold -ml-10 text-[#565454]"
                style={{
                  maxWidth: "60px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Salt lake, 2nd
              </p>
              <p className=" text-[11px] font-semibold text-[#565454]">
                NGN 200,000
              </p>
            </div>
            <div className="py-[5px] flex items-center justify-between flex-row gap-[10px]">
              <div className=" flex flex-row items-center gap-[5px]">
                <div className="flex items-center border rounded-full w-[40px] h-[40px]">
                  <img
                    className="object-center w-full h-full "
                    src={avatar1}
                    alt=""
                  ></img>
                </div>
                <h2 className=" text-[11px] font-semibold text-[#565454]">
                  Chris Hemsworth
                </h2>
              </div>
              <p
                className=" text-[11px] font-semibold -ml-10 text-[#565454]"
                style={{
                  maxWidth: "70px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Virgin lake, 32nd
              </p>
              <p className=" text-[11px] font-semibold text-[#565454]">
                NGN 500,000
              </p>
            </div>
            <div className="py-[5px] flex items-center justify-between flex-row gap-[10px]">
              <div className=" flex flex-row items-center gap-[5px]">
                <div className="flex items-center border rounded-full w-[40px] h-[40px]">
                  <img
                    className="object-center w-full h-full "
                    src={avatar2}
                    alt=""
                  ></img>
                </div>
                <h2 className=" text-[11px] font-semibold text-[#565454]">
                  Will Smith
                </h2>
              </div>
              <p
                className=" text-[11px] font-semibold text-[#565454]"
                style={{
                  maxWidth: "70px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Mira tower, sector V
              </p>
              <p className=" text-[11px] font-semibold text-[#565454]">
                NGN 1,200,000
              </p>
            </div>
            <div className="py-[5px] flex items-center justify-between flex-row gap-[10px]">
              <div className=" flex flex-row items-center gap-[5px]">
                <div className="flex items-center border rounded-full w-[40px] h-[40px]">
                  <img
                    className="object-center w-full h-full "
                    src={avatar3}
                    alt=""
                  ></img>
                </div>
                <h2 className=" text-[11px] font-semibold text-[#565454]">
                  Jessica Alba
                </h2>
              </div>
              <p
                className=" text-[11px] font-semibold text-[#565454]"
                style={{
                  maxWidth: "90px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Novotel, new town.
              </p>
              <p className=" text-[11px] font-semibold text-[#565454]">
                NGN 100,000
              </p>
            </div>
            <div className="py-[5px] flex items-center justify-between flex-row gap-[10px]">
              <div className=" flex flex-row items-center gap-[5px]">
                <div className="flex items-center border rounded-full w-[40px] h-[40px]">
                  <img
                    className="object-center w-full h-full "
                    src={avatar4}
                    alt=""
                  ></img>
                </div>
                <h2 className=" text-[11px] font-semibold text-[#565454]">
                  Denzel Washington
                </h2>
              </div>
              <div
                className=" text-[11px] font-semibold -ml-10 text-[#565454]"
                style={{
                  maxWidth: "60px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Salt lake, 2nd
              </div>
              <div className=" text-[11px] font-semibold text-[#565454]">
                NGN 800,000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
