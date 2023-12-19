import React, { useEffect, useState } from "react";
import axios from "axios";

// import background from "../images/gaelle-marcel-Y1kFBWWzOP4-unsplash.jpg";
import Sidebar from "../../Component/AdminComponent/Sidebar";
import Navbar from "../../Component/AdminComponent/Navbar";
import background from "../../assets/images/gaelle-marcel-Y1kFBWWzOP4-unsplash.jpg";
import Orange from "../../assets/images/Orange.png";
import banana from "../../assets/images/Rectangle 45.png";
import tomato from "../../assets/images/Tomato.png";
import { useDispatch, useSelector } from "react-redux";
import { Get_All_User_Orders_fun } from "../../Redux/OrderSlice";
const Base_URL = process.env.REACT_APP_Url;

const OrdersPage = () => {
  const { token } = useSelector(
    (state) => state.reducer?.AuthenticationSlice?.data
  );

  const dispatch = useDispatch();

  const { All_User_orders } = useSelector((state) => state.reducer?.OrderSlice);

  console.log({ All_User_orders: All_User_orders?.orders });
  useEffect(() => {
    dispatch(Get_All_User_Orders_fun());

    return () => {};
  }, []);

  // let filtered = AllProductData?.filter(
  //   (product) =>
  //     product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     product.category.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const ProductDetails = ({ productId }) => {
    const [productDetails, setProductDetails] = useState({
      name: "",
      image: "",
    });

    useEffect(() => {
      const fetchProductDetails = async () => {
        let API_URL = `${Base_URL}products/${productId}`;
        console.log({ token, API_URL });

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const response = await axios.get(API_URL, config);

          setProductDetails(response.data);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      fetchProductDetails();
    }, [productId]);

    return (
      <div>
        <img src={productDetails.image} alt={productDetails.name} />
        <p className="text-[15px]">{productDetails.name}</p>
      </div>
    );
  };

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
                        Order ID
                      </th>

                      <th className=" p-[16px] sticky top-0 left-0 bg-[#d5d1defe] border-collapse">
                        {" "}
                        Username
                      </th>
                      <th className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe] ">
                        {" "}
                        Product's Name{" "}
                      </th>
                      <th className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe]">
                        {" "}
                        Price{" "}
                      </th>
                      <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                        {" "}
                        Address{" "}
                      </th>
                      <th className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe]">
                        {" "}
                        Order Date{" "}
                      </th>

                      <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                        {" "}
                        Status{" "}
                      </th>
                    </tr>
                  </thead>

                  <tbody className=" font-semibold text-[#565454]">
                    {All_User_orders?.orders?.map((order) => (
                      <tr className=" even:bg-[#0000000b] hover:bg-[#fff6]">
                        <td className=" p-[16px] border-collapse"> #734589 </td>
                        <td className=" p-[16px] border-collapse">
                          {" "}
                          {order?.user?.fullName}{" "}
                        </td>
                        <td className=" p-[16px] border-collapse">
                          <div className=" ">
                            {order?.orderItems?.map((product_info) => {
                              console.log({
                                hhh: product_info?.product?.image,
                              });

                              return (
                                <div className="">
                                  {/* <img
                                    className=" w-[60px] h-[50px] rounded-[12.8px]"
                                    src={product_info?.product?.image}
                                    alt="tomato"
                                  ></img> */}

                                  <li className=" text-[15px]">
                                    {product_info?.product?.name}
                                  </li>
                                </div>
                              );
                            })}
                          </div>{" "}
                        </td>
                        <td className=" p-[16px] border-collapse">
                          <div className=" ">
                            {order?.orderItems?.map((product_info) => {
                              console.log({
                                hhh: product_info?.product?.image,
                              });

                              return (
                                <div className="">
                                  {/* <img
                                    className=" w-[60px] h-[50px] rounded-[12.8px]"
                                    src={product_info?.product?.image}
                                    alt="tomato"
                                  ></img> */}

                                  <li className=" text-[15px]">
                                    {product_info?.product?.price}
                                  </li>
                                </div>
                              );
                            })}
                          </div>{" "}
                        </td>
                        <td className=" p-[16px] border-collapse">
                          {" "}
                          {`${order?.shippingAddress1},  ${order?.shippingAddress2}, ${order?.city}, ${order?.country}`}
                        </td>
                        <td className=" p-[16px] border-collapse">
                          {" "}
                          {order?.dateOrdered}
                        </td>
                        <td className=" p-[16px] border-collapse">
                          NGN{order?.totalPrice}
                        </td>
                        <td className="p-[16px] border-collapse text-black">
                          <p
                            className={`text-center rounded-[32px] py-[6.4px] px-auto 
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
