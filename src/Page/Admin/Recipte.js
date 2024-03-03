import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import background from "../../assets/images/gaelle-marcel-Y1kFBWWzOP4-unsplash.jpg";
import Navbar from "../../Component/AdminComponent/Navbar";
// import background from "../images/gaelle-marcel-Y1kFBWWzOP4-unsplash.jpg";
import Sidebar from "../../Component/AdminComponent/Sidebar";
import { Get_All_User_Orders_fun } from "../../Redux/OrderSlice";
import { Admin_get_all_recipte_fun_ } from "../../Redux/AdminRecipteSLice";
import { Link } from "react-router-dom";

const Base_URL = process.env.REACT_APP_Url;

const Recipte = () => {
  const { token } = useSelector(
    (state) => state.reducer?.AuthenticationSlice?.data
  );

  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const { All_User_orders } = useSelector((state) => state.reducer?.OrderSlice);

  const { Admin_get_all_recipte } = useSelector(
    (state) => state.reducer?.AdminRecipteSLice
  );
  console.log({
    Admin_get_all_recipte,
  });

  useEffect(() => {
    dispatch(Admin_get_all_recipte_fun_());

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

  let filteredrecipts = Admin_get_all_recipte?.message?.filter((item) =>
    item?.user?.fullName.toLowerCase().includes(searchQuery.toLowerCase())
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
                <table className="w-full ">
                  <thead className="">
                    <tr className=" text-[#565454]">
                      <th className=" p-[16px] sticky top-0 left-0 bg-[#d5d1defe] border-collapse">
                        {" "}
                        Recipte ID
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
                        Amount
                      </th>

                      <th className=" p-[16px] sticky top-0 left-0 bg-[#d5d1defe] border-collapse">
                        {" "}
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
                          <Link to="/admin/update-recipte" state={order}>
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
      </div>
    </div>
  );
};

export default Recipte;
