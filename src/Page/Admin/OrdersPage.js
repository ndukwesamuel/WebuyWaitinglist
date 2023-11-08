import React from "react";

// import background from "../images/gaelle-marcel-Y1kFBWWzOP4-unsplash.jpg";
import Sidebar from "../../Component/AdminComponent/Sidebar";
import Navbar from "../../Component/AdminComponent/Navbar";
import background from "../../assets/images/gaelle-marcel-Y1kFBWWzOP4-unsplash.jpg";
import Orange from "../../assets/images/Orange.png";
import banana from "../../assets/images/Rectangle 45.png";
import tomato from "../../assets/images/Tomato.png";
const OrdersPage = () => {
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
          <div className=" flex items-center  px-24 mt-10 justify-center">
            <main className=" w-full  overflow-hidden table border-collapse font-['Raleway'] bg-[#fff5] shadow-md bg-opacity-5 rounded-[12.8px] mt-[15px]">
              <section className=" w-full h-[10%] bg-[#fff4] py-[12.8px] px-[16px]">
                <h1 className=" text-[24px] font-bold">Orders</h1>
              </section>
              <section className=" w-[95%] max-h-[calc(89%-25.6px)] rounded-[9.6px] overflow-auto bg-[#fffb] my-[12.8px] mx-auto    ">
                <table className=" w-full ">
                  <thead className="">
                    <tr className=" text-[#565454]">
                      <th className=" p-[16px] sticky top-0 left-0 bg-[#d5d1defe] border-collapse">
                        {" "}
                        Order ID{" "}
                      </th>
                      <th className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe] ">
                        {" "}
                        Product's Name{" "}
                      </th>
                      <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                        {" "}
                        Address{" "}
                      </th>
                      <th className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe]">
                        {" "}
                        Order Date{" "}
                      </th>

                      <th className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe]">
                        {" "}
                        Price{" "}
                      </th>
                      <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                        {" "}
                        Status{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" font-semibold text-[#565454]">
                    <tr className=" even:bg-[#0000000b] hover:bg-[#fff6]">
                      <td className=" p-[16px] border-collapse"> #734589 </td>
                      <td className=" p-[16px] border-collapse">
                        <div className=" flex flex-row items-center">
                          <img
                            className=" w-[60px] h-[50px] align-middle mr-[8px]"
                            src={tomato}
                            alt="tomato"
                          ></img>{" "}
                          <p className=" text-[15px]">Tomato</p>
                        </div>{" "}
                      </td>
                      <td className=" p-[16px] border-collapse"> Benin </td>
                      <td className=" p-[16px] border-collapse">
                        {" "}
                        17 Dec, 2022{" "}
                      </td>
                      <td className=" p-[16px] border-collapse">NGN50,000</td>
                      <td className="  p-[16px] border-collapse text-black">
                        <p className="bg-[#009b4d] text-center rounded-[32px] py-[6.4px] px-auto">
                          Delivered
                        </p>
                      </td>
                    </tr>
                    <tr className=" even:bg-[#0000000b] hover:bg-[#fff6]">
                      <td className=" p-[16px] border-collapse"> #734589 </td>
                      <td className=" p-[16px] border-collapse">
                        <div className=" flex flex-row items-center">
                          <img
                            className=" w-[60px] h-[50px] align-middle mr-[8px]"
                            src={banana}
                            alt="banana"
                          ></img>{" "}
                          <p className=" text-[15px]">Banana</p>
                        </div>{" "}
                      </td>
                      <td className=" p-[16px] border-collapse"> Benin </td>
                      <td className=" p-[16px] border-collapse">
                        {" "}
                        17 Dec, 2022{" "}
                      </td>
                      <td className=" p-[16px] border-collapse">NGN50,000</td>
                      <td className="  p-[16px] border-collapse text-black">
                        <p className="bg-[#aa6a09] py-[6.4px] px-auto text-center rounded-[32px]">
                          Pending
                        </p>
                      </td>
                    </tr>
                    <tr className=" even:bg-[#0000000b] hover:bg-[#fff6]">
                      <td className=" p-[16px] border-collapse"> #734589 </td>
                      <td className=" p-[16px] border-collapse">
                        <div className=" flex flex-row items-center">
                          <img
                            className=" w-[60px] h-[50px] align-middle mr-[8px]"
                            src={Orange}
                            alt="Oranges"
                          ></img>{" "}
                          <p className=" text-[15px]">Oranges</p>
                        </div>{" "}
                      </td>
                      <td className=" p-[16px] border-collapse"> Benin </td>
                      <td className=" p-[16px] border-collapse">
                        {" "}
                        17 Dec, 2022{" "}
                      </td>
                      <td className=" p-[16px] border-collapse">NGN50,000</td>
                      <td className="  p-[16px] border-collapse text-black">
                        <p className="bg-[#f60707] py-[6.4px] px-auto text-center rounded-[32px]">
                          Cancelled
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
