import React from "react";

// import background from "../images/gaelle-marcel-Y1kFBWWzOP4-unsplash.jpg";
import orange from "../../assets/images/Orange.png";

const OrdersPage = () => {
  return (
    <div className=" font-['Raleway']">
      <div className=" border bg-[#F8F9FC] shadow-md cursor-pointer mt-[15px] mx-[25px] rounded-[4px]">
        <div className=" flex items-center py-[20px] px-[30px] mb-[10px]">
          <h2 className="text-[#009b4d] text-[24px] leading-[19px] font-bold">
            Order{" "}
            <span className="text-[#565454] text-[12px]">17 Order found</span>
          </h2>
        </div>
        <div className=" w-full px-[30px]">
          <div className=" -ml-6">
            <ol className=" font-bold flex items-center gap-[45px] w-full text-[15px]  text-[#565454]">
              <li className="relative h-full">
                <a
                  className="hover:after:absolute hover:after:rounded-[10px] hover:after:bottom-[-3px] hover:after:block hover:after:bg-[#009b4d] hover:after:w-full hover:after:h-[1px] focus:after:absolute focus:after:rounded-[10px] focus:after:bottom-[-3px] focus:after:block hover:text-[#009b4d] focus:text-[#009b4d] focus:after:bg-[#009b4d] focus:after:w-full focus:after:h-[1px]"
                  href="/"
                  target="blank"
                >
                  All Orders
                </a>{" "}
              </li>
              <li className="relative h-full">
                <a
                  className="hover:after:absolute hover:after:rounded-[10px] hover:after:bottom-[-3px] hover:after:block hover:after:bg-[#009b4d] hover:after:w-full hover:after:h-[1px] focus:after:absolute focus:after:rounded-[10px] focus:after:bottom-[-3px] hover:text-[#009b4d] focus:text-[#009b4d] focus:after:block focus:after:bg-[#009b4d] focus:after:w-full focus:after:h-[1px]"
                  href="/"
                >
                  Completed
                </a>{" "}
              </li>
              <li className="relative h-full">
                <a
                  className="hover:after:absolute hover:after:rounded-[10px] hover:after:bottom-[-3px] hover:after:block hover:after:bg-[#009b4d] hover:after:w-full hover:after:h-[1px] focus:after:absolute focus:after:rounded-[10px] hover:text-[#009b4d] focus:text-[#009b4d] focus:after:bottom-[-3px] focus:after:block focus:after:bg-[#009b4d] focus:after:w-full focus:after:h-[1px]"
                  href="/"
                >
                  Pending
                </a>{" "}
              </li>
            </ol>
          </div>
          <div className="flex flex-row text-[13px] font-bold gap-[200px] text-[#565454] pt-[10px]">
            <div className=" w-[50%] pt-3">
              <ul className=" flex flex-row gap-[65px] items-center">
                <li>Order ID</li>
                <li className="">Product's Name</li>
                <li className=" ml-[80px]">Address</li>
              </ul>
            </div>
            <div className=" w-[50%] pt-3">
              <ul className=" flex flex-row items-center justify-around ">
                <li>Date</li>
                <li>Price</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className=" py-[5px] flex flex-col text-[#565454] font-semibold gap-[10px] text-[13px]">
            <ul className="flex flex-row items-center gap-[45px]">
              <li>
                <a href="/">#70304034</a>
              </li>
              <li className=" flex flex-row items-center gap-[10px]">
                <div className="w-[50px] flex items-center h-[50px]">
                  <img
                    className="transform w-auto hover:scale-[103%] transition duration-300 ease-out "
                    src={orange}
                    alt=""
                  ></img>
                </div>
                <div>
                  <h3 className="">Orange</h3>
                </div>
              </li>
              <li className=" ml-[96px]">Merlin Metrix, Second floor.</li>
              <li className=" ml-[145px]">20/03/2020</li>
              <li className="">NGN 40,000</li>
              <li className=" ml-[30px]">
                <button
                  className="text-[11px] bg-[#009b4d] text-white py-[7px] px-[20px] rounded-[5px] font-semibold transform hover:scale-[103%] transition duration-300 ease-out "
                  type="button"
                >
                  Completed
                </button>
              </li>
            </ul>
          </div>
          <div className=" py-[5px] flex flex-col text-[#565454] font-semibold gap-[10px] text-[13px]">
            <ul className="flex flex-row items-center gap-[45px]">
              <li>
                <a href="/">#70304034</a>
              </li>
              <li className=" flex flex-row items-center gap-[10px]">
                <div className="w-[50px] flex items-center h-[50px]">
                  <img
                    className="transform w-auto hover:scale-[103%] transition duration-300 ease-out "
                    src={orange}
                    alt=""
                  ></img>
                </div>
                <div>
                  <h3 className="">Orange</h3>
                </div>
              </li>
              <li className=" ml-[96px]">Merlin Metrix, Second floor.</li>
              <li className=" ml-[145px]">20/03/2020</li>
              <li className="">NGN 40,000</li>
              <li className=" ml-[30px]">
                <button
                  className="text-[11px] bg-[#009b4d] text-white py-[7px] px-[20px] rounded-[5px] font-semibold transform hover:scale-[103%] transition duration-300 ease-out "
                  type="button"
                >
                  Completed
                </button>
              </li>
            </ul>
          </div>
          <div className=" py-[5px] flex flex-col text-[#565454] font-semibold gap-[10px] text-[13px]">
            <ul className="flex flex-row items-center gap-[45px]">
              <li>
                <a href="/">#70304034</a>
              </li>
              <li className=" flex flex-row items-center gap-[10px]">
                <div className="w-[50px] flex items-center h-[50px]">
                  <img
                    className="transform w-auto hover:scale-[103%] transition duration-300 ease-out "
                    src={orange}
                    alt=""
                  ></img>
                </div>
                <div>
                  <h3 className="">Orange</h3>
                </div>
              </li>
              <li className=" ml-[96px]">Merlin Metrix, Second floor.</li>
              <li className=" ml-[145px]">20/03/2020</li>
              <li className="">NGN 40,000</li>
              <li className=" ml-[30px]">
                <button
                  className="text-[11px] bg-[#009b4d] text-white py-[7px] px-[20px] rounded-[5px] font-semibold transform hover:scale-[103%] transition duration-300 ease-out "
                  type="button"
                >
                  Completed
                </button>
              </li>
            </ul>
          </div>
          <div className=" py-[5px] flex flex-col text-[#565454] font-semibold gap-[10px] text-[13px]">
            <ul className="flex flex-row items-center gap-[45px]">
              <li>
                <a href="/">#70304034</a>
              </li>
              <li className=" flex flex-row items-center gap-[10px]">
                <div className="w-[50px] flex items-center h-[50px]">
                  <img
                    className="transform w-auto hover:scale-[103%] transition duration-300 ease-out "
                    src={orange}
                    alt=""
                  ></img>
                </div>
                <div>
                  <h3 className="">Orange</h3>
                </div>
              </li>
              <li className=" ml-[96px]">Merlin Metrix, Second floor.</li>
              <li className=" ml-[145px]">20/03/2020</li>
              <li className="">NGN 40,000</li>
              <li className=" ml-[30px]">
                <button
                  className="text-[11px] bg-[#009b4d] text-white py-[7px] px-[20px] rounded-[5px] font-semibold transform hover:scale-[103%] transition duration-300 ease-out "
                  type="button"
                >
                  Completed
                </button>
              </li>
            </ul>
          </div>
          <div className=" py-[5px] flex flex-col text-[#565454] font-semibold gap-[10px] text-[13px]">
            <ul className="flex flex-row items-center gap-[45px]">
              <li>
                <a href="/">#70304034</a>
              </li>
              <li className=" flex flex-row items-center gap-[10px]">
                <div className="w-[50px] flex items-center h-[50px]">
                  <img
                    className="transform w-auto hover:scale-[103%] transition duration-300 ease-out "
                    src={orange}
                    alt=""
                  ></img>
                </div>
                <div>
                  <h3 className="">Orange</h3>
                </div>
              </li>
              <li className=" ml-[96px]">Merlin Metrix, Second floor.</li>
              <li className=" ml-[145px]">20/03/2020</li>
              <li className="">NGN 40,000</li>
              <li className=" ml-[30px]">
                <button
                  className="text-[11px] bg-[#009b4d] text-white py-[7px] px-[20px] rounded-[5px] font-semibold transform hover:scale-[103%] transition duration-300 ease-out "
                  type="button"
                >
                  Completed
                </button>
              </li>
            </ul>
          </div>
          <div className=" py-[5px] flex flex-col text-[#565454] font-semibold gap-[10px] text-[13px]">
            <ul className="flex flex-row items-center gap-[45px]">
              <li>
                <a href="/">#70304034</a>
              </li>
              <li className=" flex flex-row items-center gap-[10px]">
                <div className="w-[50px] flex items-center h-[50px]">
                  <img
                    className="transform w-auto hover:scale-[103%] transition duration-300 ease-out "
                    src={orange}
                    alt=""
                  ></img>
                </div>
                <div>
                  <h3 className="">Orange</h3>
                </div>
              </li>
              <li className=" ml-[96px]">Merlin Metrix, Second floor.</li>
              <li className=" ml-[145px]">20/03/2020</li>
              <li className="">
                <div className=" w-auto max-w-fit relative">NGN 40,000</div>
              </li>
              <li className=" ml-[30px] relative">
                <button
                  className="text-[11px] bg-[#009b4d] max-w-fit text-white py-[7px] px-[20px] rounded-[5px] font-semibold transform hover:scale-[103%] transition duration-300 ease-out "
                  type="button"
                >
                  Completed
                </button>
              </li>
            </ul>
          </div>

          {/* <div className=" py-[10px] flex flex-col gap-[10px]">
          <ol className="flex items-center justify-between ">
            <li className=" flex flex-row -ml-4 items-center gap-[10px] ">
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
            </li>
            <li className=" text-[13px] font-semibold text-[#565454]">
              #70304034
            </li>
            <li className="text-[13px] font-semibold text-[#565454]">
              Salt lake, 2nd
            </li>
            <li className="text-[13px] font-semibold text-[#565454]">
              10/3/2020
            </li>
            <li className="text-[13px] font-semibold text-[#565454]">
              20/4/2020
            </li>
            <li className="text-[13px] font-semibold text-[#565454]">
              NGN 120,000
            </li>
            <li>
              <button
                className="text-[11px] bg-[#009b4d] text-white py-[7px] px-[20px] rounded-[5px] font-semibold transform hover:scale-[103%] transition duration-300 ease-out "
                type="button"
              >
                Completed
              </button>
            </li>
          </ol>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
