import React from "react";
import { useGetRevenueQuery } from "../../Redux/orderApi";
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
import orange from "../../assets/images/Orange.png";
import banana from "../../assets/images/Rectangle 45.png";
import seeds from "../../assets/images/Seeds.png";
import tomato from "../../assets/images/Tomato.png";
import PieComponent from "../../Component/AdminComponent/PieComponent";

// import PieComponent from ".";
const LoadingSkeleton = () => {
  return (
    <>
      <div className="rounded-xl font-['Raleway'] w-full border-[1.5px] mt-5 border-[#f3f3f3]">
        <div className="w-full bg-gray-200 animate-pulse">
          <div className="h-40"></div>
        </div>
        <div className="w-full p-3">
          <div className="h-4 mb-2 bg-gray-200 animate-pulse"></div>
          <div className="h-3 mb-2 bg-gray-200 animate-pulse"></div>
          <div className="h-8 mb-2 bg-gray-200 animate-pulse"></div>
          <div className="h-3 bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    </>
  );
};
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
  const { data, isLoading, isError, error } = useGetRevenueQuery();
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isError) {
    return toast.error(error.data.message);
  }
  console.log("main", data.totalOrders);
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
              <h1 className="font-bold text-[19px] ">{data?.totalRevenue}</h1>
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
              <h1 className="font-bold text-[19px] ">{data?.totalOrders}</h1>
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

      <div className="flex mt-[15px] w-full h-[350px] gap-[30px]">
        <div className="basis-[80%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[10px] px-[30px] border-b-[1px] border-[#EDEDED] mb-[20px]">
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

        <div className="basis-[20%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED]">
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
        <div className="basis-[65%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[30px] border-b-[1px] border-[#EDEDED] mb-[15px]">
            <h2 className="text-[#232323] text-[16px] leading-[19px] font-bold">
              Recent Orders
            </h2>
            <p className=" text-[13px] text-[#707070] font-medium cursor-pointer">
              View details
            </p>
          </div>
          <div className=" w-full px-[30px] py-[5px]">
            <div className="bg-[#F8F9FC] py-[10px] rounded-[8px]">
              <ol className=" flex justify-around w-full text-[13px] font-medium text-[#565454]">
                <li className="-ml-6 ">Product</li>
                <li>Order ID</li>
                <li>Address</li>
                <li>Price</li>
                <li className="-mr-4 ">Status</li>
              </ol>
            </div>
            <div className=" py-[5px] flex flex-col gap-[10px]">
              <div className="flex items-center justify-between ">
                <div className=" flex flex-row items-center gap-[10px] ">
                  <div className="w-[70px] h-[47px] rounded-[10px] border">
                    <img
                      className="transform hover:scale-[103%] transition duration-300 ease-out"
                      src={banana}
                      alt=""
                    ></img>
                  </div>
                  <div className="flex flex-col ">
                    <h3 className=" text-[13px] font-semibold text-[#565454]">
                      Banana
                    </h3>
                    <p className="text-[11px] text-[#565454] font-medium">
                      Quantity: 20
                    </p>
                  </div>
                </div>
                <p className=" text-[13px] font-semibold text-[#565454]">
                  #70304034
                </p>
                <p className="text-[13px] font-semibold text-[#565454]">
                  Salt lake, 2nd
                </p>
                <p className="text-[13px] font-semibold text-[#565454]">
                  NGN 120,000
                </p>
                <button
                  className="text-[11px] bg-[#009b4d] text-white py-[7px] px-[20px] rounded-[5px] font-semibold transform hover:scale-[103%] transition duration-300 ease-out "
                  type="button"
                >
                  Completed
                </button>
              </div>
              <div className="flex items-center justify-between ">
                <div className=" flex flex-row items-center gap-[10px] ">
                  <div className="w-[70px] h-[47px] rounded-[10px] border">
                    <img
                      className="transform hover:scale-[103%] transition duration-300 ease-out"
                      src={orange}
                      alt=""
                    ></img>
                  </div>
                  <div className="flex flex-col ">
                    <h3 className=" text-[13px] font-semibold text-[#565454]">
                      Orange
                    </h3>
                    <p className="text-[11px] text-[#565454] font-medium">
                      Quantity: 200
                    </p>
                  </div>
                </div>
                <p className=" text-[13px] font-semibold text-[#565454]">
                  #70304078
                </p>
                <p className="text-[13px] font-semibold text-[#565454]">
                  Tacoma lake, 42nd
                </p>
                <p className="text-[13px] font-semibold text-[#565454]">
                  NGN 200,000
                </p>
                <button
                  className="text-[11px] bg-[#aa6a09] text-white w-[98px] h-[30px] rounded-[5px] font-semibold transform hover:scale-[103%] transition duration-300 ease-out"
                  type="button"
                >
                  Pending
                </button>
              </div>
              <div className="flex items-center justify-between ">
                <div className=" flex flex-row items-center gap-[10px] ">
                  <div className="w-[70px] h-[47px] rounded-[10px] border">
                    <img
                      className="transform hover:scale-[103%] transition duration-300 ease-out"
                      src={tomato}
                      alt=""
                    ></img>
                  </div>
                  <div className="flex flex-col ">
                    <h3 className=" text-[13px] font-semibold text-[#565454]">
                      Tomatoes
                    </h3>
                    <p className="text-[11px] text-[#565454] font-medium">
                      Quantity: 50
                    </p>
                  </div>
                </div>
                <p className=" text-[13px] font-semibold text-[#565454]">
                  #70304067
                </p>
                <p className="text-[13px] font-semibold text-[#565454]">
                  Palm cove, 32nd
                </p>
                <p className="text-[13px] font-semibold text-[#565454]">
                  NGN 1,200,000
                </p>
                <button
                  className="text-[11px] bg-[#009b4d] text-white w-[98px] h-[32px] rounded-[5px] transform hover:scale-[103%] transition duration-300 ease-out font-semibold"
                  type="button"
                >
                  Completed
                </button>
              </div>
              <div className="flex items-center justify-between ">
                <div className=" flex flex-row items-center gap-[10px] ">
                  <div className="w-[70px] h-[47px] rounded-[10px] border">
                    <img src="" alt=""></img>
                  </div>
                  <div className="flex flex-col ">
                    <h3 className=" text-[13px] font-semibold text-[#565454]">
                      Vegetables
                    </h3>
                    <p className="text-[11px] text-[#565454] font-medium">
                      Quantity: 20
                    </p>
                  </div>
                </div>
                <p className=" text-[13px] font-semibold text-[#565454]">
                  #70304089
                </p>
                <p className="text-[13px] font-semibold text-[#565454]">
                  Virginia lake, 52nd
                </p>
                <p className="text-[13px] font-semibold text-[#565454]">
                  NGN 250,000
                </p>
                <button
                  className="text-[11px] bg-[#aa6a09] text-white w-[98px] h-[30px] rounded-[5px] font-semibold transform hover:scale-[103%] transition duration-300 ease-out"
                  type="button"
                >
                  Pending
                </button>
              </div>
              <div className="flex items-center justify-between ">
                <div className=" flex flex-row items-center gap-[10px] ">
                  <div className="w-[70px] h-[47px] rounded-[10px] border ">
                    <img
                      className="transform hover:scale-[103%] transition duration-300 ease-out"
                      src={seeds}
                      alt=""
                    ></img>
                  </div>
                  <div className="flex flex-col ">
                    <h3 className=" text-[13px] font-semibold text-[#565454]">
                      Seeds
                    </h3>
                    <p className="text-[11px] text-[#565454] font-medium">
                      Quantity: 20 bags
                    </p>
                  </div>
                </div>
                <p className=" text-[13px] font-semibold text-[#565454]">
                  #70304090
                </p>
                <p className="text-[13px] font-semibold text-[#565454]">
                  Novotel, new town
                </p>
                <p className="text-[13px] font-semibold text-[#565454]">
                  NGN 120,000
                </p>
                <button
                  className="text-[11px] bg-[#f60707] text-white w-[98px] h-[30px] rounded-[5px] font-semibold transform hover:scale-[103%] transition duration-300 ease-out"
                  type="button"
                >
                  Cancelled
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-[35%] border bg-white shadow-md cursor-pointer rounded-[4px]">
          <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[15px]">
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
          <div className="w-full px-[15px] py-[5px]">
            <div className="bg-[#F8F9FC] py-[10px] px-2 rounded-[8px]">
              <ol className=" flex justify-between w-full text-[13px] font-medium text-[#565454]">
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
