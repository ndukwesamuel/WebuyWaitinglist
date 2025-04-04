import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import background from "../../assets/images/gaelle-marcel-Y1kFBWWzOP4-unsplash.jpg";
import Navbar from "../../Component/AdminComponent/Navbar";
// import background from "../images/gaelle-marcel-Y1kFBWWzOP4-unsplash.jpg";
import Sidebar from "../../Component/AdminComponent/Sidebar";
import { Get_All_User_Orders_fun } from "../../Redux/OrderSlice";

const Base_URL = import.meta.env.VITE_REACT_APP_Url;

const OrdersPage = () => {
  const { token } = useSelector(
    (state) => state.reducer?.AuthenticationSlice?.data
  );
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const { All_User_orders } = useSelector((state) => state.reducer?.OrderSlice);

  useEffect(() => {
    dispatch(Get_All_User_Orders_fun());

    return () => {};
  }, [dispatch]);

  // let filtered = AllProductData?.filter(
  //   (product) =>
  //     product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     product.category.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // const ProductDetails = ({ productId }) => {
  //   const [productDetails, setProductDetails] = useState({
  //     name: "",
  //     image: "",
  //   });

  //   useEffect(() => {
  //     const fetchProductDetails = async () => {
  //       let API_URL = `${Base_URL}products/${productId}`;
  //       console.log({ token, API_URL });

  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       };
  //       try {
  //         const response = await axios.get(API_URL, config);

  //         setProductDetails(response.data);
  //       } catch (error) {
  //         console.error("Error fetching product details:", error);
  //       }
  //     };

  //     fetchProductDetails();
  //   }, [productId]);

  //   return (
  //     <div>
  //       <img src={productDetails.image} alt={productDetails.name} />
  //       <p className="text-[15px]">{productDetails.name}</p>
  //     </div>
  //   );
  // };
  const formatDate = (dateString) => {
    const dateOrdered = new Date(dateString);
    return dateOrdered instanceof Date && !isNaN(dateOrdered)
      ? `${dateOrdered.toLocaleDateString()}`
      : "Invalid Date";
  };

  let filteredOrders = All_User_orders?.orders?.filter(
    (order) =>
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.user?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order?.orderItems?.some((product_info) =>
        product_info?.product?.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ) ||
      order?.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formatDate(order?.dateOrdered)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
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
                <h1 className=" text-[24px] font-bold">Orders</h1>
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
                        {" "}
                        Order ID
                      </th>

                      <th className=" p-[16px] sticky top-0 left-0 bg-[#d5d1defe] border-collapse">
                        {" "}
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
                        {" "}
                        Product's Name
                      </th>
                      <th className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe]">
                        Price
                      </th>
                      <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                        Address
                      </th>
                      <th className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe]">
                        Order Date
                      </th>
                      <th
                        className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]"
                        style={{
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Total Amount
                      </th>
                      <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className=" font-semibold text-[#565454]">
                    {filteredOrders?.map((order) => (
                      <tr
                        className=" even:bg-[#0000000b] hover:bg-[#fff6]"
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
                          <div>
                            {order?.orderItems?.map((product_info) => {
                              return (
                                <div key={product_info._id}>
                                  <li className="text-[15px] list-none">
                                    {product_info?.product?.name}
                                  </li>
                                </div>
                              );
                            })}
                          </div>
                        </td>
                        <td className=" p-[16px] border-collapse">
                          <div className="">
                            {order?.orderItems?.map((product_info) => {
                              // console.log({
                              //   hhh: product_info?.product?.image,
                              // });

                              return (
                                <div className="">
                                  {/* <img
                                    className=" w-[60px] h-[50px] rounded-[12.8px]"
                                    src={product_info?.product?.image}
                                    alt="tomato"
                                  ></img> */}

                                  <li
                                    className=" text-[15px] list-none"
                                    key={product_info._id}
                                  >
                                    {product_info?.product?.price}
                                  </li>
                                </div>
                              );
                            })}
                          </div>
                        </td>
                        <td
                          className=" p-[16px] border-collapse"
                          style={{
                            maxWidth: "200px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {`${order?.shippingAddress1},  ${order?.shippingAddress2}, ${order?.city}, ${order?.country}`}
                        </td>
                        <td className=" p-[16px] border-collapse">
                          {formatDate(order?.dateOrdered)}
                        </td>
                        <td className=" p-[16px] border-collapse">
                          NGN{order?.totalPrice}
                        </td>
                        <td className="p-[10px] border-collapse text-black">
                          <p
                            className={`text-center rounded-xl py-[6.4px] px-2 -ml-4 
    ${
      order?.status === "Cancelled"
        ? "bg-red-500 text-white"
        : order?.status === "Pending"
        ? "bg-brown-500 text-white debug"
        : order?.status === "Delivered"
        ? "bg-green-500 text-white"
        : ""
    }`}
                          >
                            {order?.status}
                          </p>
                        </td>
                      </tr>
                    ))}
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
