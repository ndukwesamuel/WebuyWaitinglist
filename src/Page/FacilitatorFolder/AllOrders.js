import React, { useEffect, useState } from "react";

import { FaSearch, FaSlidersH } from "react-icons/fa";
import { useMutation } from "react-query";
import axios from "axios";

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

import { Link } from "react-router-dom";
import {
  AllProduct_fun,
  GetUSerCart_Fun,
  UserOrders_fun,
} from "../../Redux/ProductSlice";
import ModalContainer, {
  Reusable_modal,
} from "../../Component/modal-container/modal-container";
import { Payment_fun } from "../../Redux/PaymentSlice";
const Base_URL = process.env.REACT_APP_Url;

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

const AllOrders = () => {
  const { AllProductData, isLoading, cart_data, userOrders_data } = useSelector(
    (state) => state?.reducer?.ProductSlice
  );
  const { All_User_orders } = useSelector((state) => state.reducer?.OrderSlice);

  console.log({ userOrders_data });
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const filtered = cart_data?.userCart?.items?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Item 1",
      price: 10,
      quantity: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg",
      description: "Description for Item 1",
    },
    {
      id: 2,
      name: "Item 2",
      price: 15,
      quantity: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg",

      description: "Description for Item 2",
    },
    // Add your actual cart items here
  ]);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems?.filter((item) => item?.id !== itemId);
    setCartItems(updatedCart);
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems?.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    );
    setCartItems(updatedCart);
  };

  useEffect(() => {
    dispatch(UserOrders_fun());

    // i will remove the product

    return () => {};
  }, []);

  return (
    <div className="font-['Raleway']">
      <div className="w-full px-3 md:pl-20 mt-8 md:pr-14">
        <div className="flex flex-col w-full h-full p-5  mt-5 bg-white n rounded-xl ">
          <header className="w-full mb-5">
            <h1 className="text-[24px] leading-[34px] font-semibold text-[#009B4D]">
              Cart
            </h1>

            <hr />
          </header>
          <div className="relative w-full">
            <input
              className="w-full pl-8 pr-12 py-2 border-2 border-[#f3f3f3] rounded-xl text-xs"
              type="text"
              name="search"
              value={searchQuery}
              placeholder="Search products..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#c3c2c2] text-xs" />
            <FaSlidersH className="absolute text-xs text-black transform -translate-y-1/2 right-4 top-1/2" />
          </div>

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

                      <th className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe]">
                        {" "}
                        Amount
                      </th>

                      <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                        {" "}
                        Status{" "}
                      </th>
                    </tr>
                  </thead>

                  <tbody className=" font-semibold text-[#565454]">
                    {userOrders_data?.message?.map((order) => (
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

export default AllOrders;

// CartSummary.js

const CartSummary = ({ cartItems }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { token } = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data
  );

  const ss = useSelector((state) => state?.reducer?.AuthenticationSlice?.data);

  console.log({ ss });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSuccess = () => {
    setShowSuccess(!showSuccess);
    // dispatch(resetSignup());
  };
  const calculateTotalPrice = () => {
    return cartItems?.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const [shippingAddress, setShippingAddress] = useState({
    shippingAddress1: "",
    shippingAddress2: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const makeAuthorizationRequest = (authorizationUrl) => {
    console.log({ authorizationUrl });
    axios
      .get(authorizationUrl)
      .then((response) => {
        console.log("Successful request to authorization_url", response);

        // Handle the response as needed
      })
      .catch((error) => {
        console.error("Error making request to authorization_url", error);

        // Handle the error as needed
      });
  };

  const Paymentmutation = useMutation(
    (formData) => {
      let API_URL = `${Base_URL}checkout/payment`;

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
        let newdata = data?.data;
        let newdata2 = JSON.parse(newdata);
        console.log({ newdata2 });

        makeAuthorizationRequest(newdata2.authorization_url);

        console.log({ newdata2 });
        toast.success(`Product has been orders!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(GetUSerCart_Fun());
      },
      onError: (error) => {
        toast.error(`${error?.response?.data?.msg}`, {
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
  const createmutation = useMutation(
    (formData) => {
      let API_URL = `${Base_URL}orders`;

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
        console.log({ data });
        toast.success(`Product has been orders!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(GetUSerCart_Fun());
      },
      onError: (error) => {
        toast.error(`${error?.response?.data?.msg}`, {
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

  const [shippingAddress1, setShippingAddress1] = useState("aquinas college");
  const [shippingAddress2, setShippingAddress2] = useState("hospital road");
  const [city, setCity] = useState("akure");
  const [zip, setZip] = useState("00000");
  const [country, setCountry] = useState("Nigeria");
  const [phone, setPhone] = useState("123456");
  // const [user, setUser] = useState("654d19e95101748a438e1e06");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      orderItems: cartItems.map((item) => ({
        quantity: item?.quantity,
        product: item?.productId?._id,

        // Assuming you have a 'product' property in your cart item

        // quantity: 10,
        // product: "656ec883a71f3b20c1b70341",
      })),

      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      // user,
    };

    // createmutation.mutate(orderData);

    dispatch(Payment_fun(orderData));
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="bg-gray-100 p-4 border">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>₦{calculateTotalPrice()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping:</span>
          <span>₦0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">₦{calculateTotalPrice()}</span>
        </div>
      </div>
      {cartItems?.length > 0 && (
        <button
          className="mt-4 bg-[#009B4D] text-white py-2 px-4 rounded w-full"
          onClick={() => setShowSuccess(true)}
        >
          Checkout
        </button>
      )}
      <ModalContainer close={toggleSuccess} show={showSuccess}>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Shipping Address 1:
            </label>
            <input
              type="text"
              value={shippingAddress1}
              onChange={(e) => setShippingAddress1(e.target.value)}
              className="border rounded w-full py-2 px-3"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Shipping Address 2:
            </label>
            <input
              type="text"
              value={shippingAddress2}
              onChange={(e) => setShippingAddress2(e.target.value)}
              className="border rounded w-full py-2 px-3"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border rounded w-full py-2 px-3"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Zip conde
            </label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="border rounded w-full py-2 px-3"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Country
            </label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setCountry(e.target.value)}
              className="border rounded w-full py-2 px-3"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded w-full py-2 px-3"
            />
          </div>

          {/* Repeat similar structure for other fields */}

          <div className="mb-4 flex justify-center">
            <button
              type="submit"
              className="bg-[#009B4D] text-white py-2 px-4 rounded hover:bg-[#009B4D] focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Pay
            </button>
          </div>
        </form>
      </ModalContainer>
    </div>
  );
};

// CartPage.js

const CartPage = ({ cartItems, onRemoveItem, onUpdateQuantity }) => {
  const dispatch = useDispatch();
  const [itemImages, setItemImages] = useState({});
  const { token } = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data
  );

  let placeholderImageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg";

  const imageFun = (id) => {
    // return itemImages[id] || placeholderImageUrl;
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg";
  };

  const handledecreaseitem = useMutation(
    (formData) => {
      let API_URL = `${Base_URL}cart/decreaseItem`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      return axios.patch(API_URL, formData, config);
    },
    {
      onSuccess: (data) => {
        toast.success(`item has been deducted from cart !`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(GetUSerCart_Fun());
      },
      onError: (error) => {
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

  const createmutation = useMutation(
    (formData) => {
      let API_URL = `${Base_URL}cart/addItem`;

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
        toast.success(`Product updated in  cart !`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(GetUSerCart_Fun());
      },
      onError: (error) => {
        toast.error(`${error?.response?.data?.msg}`, {
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

  const handleAddToCart = (item) => {
    let formData = {
      productId: item?.productId?._id,
      quantity: "1",
      price: item?.price,
      name: item?.name,
    };

    createmutation.mutate(formData);
  };

  const handleremoveToCart = (item) => {
    let formData = {
      productId: item?.productId?._id,
      quantity: "1",
    };

    handledecreaseitem.mutate(formData);
  };

  const handleDelete = (item) => {
    const deleteProduct = async () => {
      try {
        await axios.delete(`${Base_URL}cart/deleteItem`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            // Add any other headers as needed
          },
          data: { productId: item?.productId?._id },
        });

        // If you need to handle success, you can add your logic here
        console.log("Product deleted successfully");

        // Dispatch the GetUSerCart_Fun() function after successful deletion
        dispatch(GetUSerCart_Fun());
      } catch (error) {
        // Handle errors appropriately, e.g., show an error message to the user
        console.error("Error deleting product:", error.response.data);
      }
    };

    // Call the deleteProduct function when the handleDelete is invoked
    deleteProduct();
  };

  return (
    <div className="container mx-auto my-8   ">
      {cartItems?.length === 0 ? (
        <p className="text-center ">Your cart is empty</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4">
          {cartItems?.map((item, index) => (
            <li key={index} className="border p-4">
              <div className="flex  flex-col md:flex-row items-center gap-5">
                <img
                  // src={item?.image}
                  src={item?.productId?.image}
                  alt={item?.name}
                  className="w-32 rounded-md h-32 object-cover "
                />
                <div className="w-full">
                  <div className="flex gap-5">
                    <div className="w-[80%]">
                      <h2 className="text-lg font-semibold">{item?.name}</h2>
                      <p className="text-gray-600">₦{item?.price}</p>
                      <p className="text-gray-600">{item?.description}</p>
                    </div>

                    <p
                      className="w-[20%]"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      ₦{item?.price * item?.quantity}
                    </p>
                  </div>

                  <div className="flex w-full items-center  mt-5 justify-between ">
                    <div
                      className="flex items-center text-red-500 cursor-pointer "
                      //   className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(item)}
                    >
                      <MdDeleteOutline className="text-red-500 hover:text-red-700" />

                      <p className="text-red-500 hover:text-red-700">Remove</p>
                    </div>

                    <div className="flex ">
                      <button
                        onClick={() =>
                          // onUpdateQuantity(item?.id, item?.quantity - 1)

                          handleremoveToCart(item)
                        }
                        className="px-2  border bg-[#009B4D] rounded text-white"
                      >
                        -
                      </button>
                      <span className="mx-2">{item?.quantity}</span>
                      <button
                        onClick={() => {
                          onUpdateQuantity(item?.id, item?.quantity + 1);

                          handleAddToCart(item);
                        }}
                        className="px-2  border bg-[#009B4D] rounded text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
