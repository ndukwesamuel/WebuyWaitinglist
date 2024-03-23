import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetGroupOrderQuery } from "../../Redux/orderApi";
import { toast } from "react-toastify";
import ModalContainer from "../../Component/modal-container/modal-container";
import axios from "axios";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { LoadingSkeleton } from "../../Component/Loader/LoadingSkeleton";

const Base_URL = process.env.REACT_APP_Url;

const GroupOrders = () => {
  const { token } = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data
  );
  const toggleSuccess = () => {
    setShowSuccess(!showSuccess);
  };
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isError) {
    return toast.error(error.data.message);
  }
  const groupOrders = orders.message;

  const handleUpdateClick = (selectedOrderId) => {
    setSelectedOrderId(selectedOrderId);
    setShowSuccess(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    createmutation.mutate({
      orderId: selectedOrderId,
      status: selectedStatus,
    });
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
  };
  const statusOptions = [
    { value: "pending", label: "pending" },
    { value: "processing", label: "processing" },
    { value: "completed", label: "completed" },
  ];

  const formatDate = (dateString) => {
    const dateOrdered = new Date(dateString);
    return dateOrdered instanceof Date && !isNaN(dateOrdered)
      ? `${dateOrdered.toLocaleDateString()}`
      : "Invalid Date";
  };

  return (
    <div className="font-['Raleway']">
      <div className="w-full px-3 md:pl-20 mt-8 md:pr-14">
        <div className="flex flex-col w-full h-full p-5  mt-5 bg-white n rounded-xl ">
          <header className="w-full mb-5">
            <h1 className="text-[24px] leading-[34px] font-semibold text-[#009B4D]">
              Group Orders
            </h1>

            <hr />
          </header>
          {isError && toast.error(error.data.message)}
          <main className="w-full overflow-x-auto bg-[#fff5] shadow-md bg-opacity-5 rounded-[12.8px] mt-[15px]">
            <section className=" w-[95%] max-h-[calc(89%-25.6px)] rounded-[9.6px] overflow-auto bg-[#fffb] my-[12.8px] mx-auto    ">
              <div className="flex justify-center">
                <table className=" w-full table-auto">
                  <thead>
                    <tr className=" text-[#565454]">
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
                  <tbody className=" font-semibold text-[#565454] ">
                    {groupOrders &&
                      groupOrders?.map((order) => (
                        <tr
                          className=" even:bg-[#0000000b] hover:bg-[#fff6]"
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
      </div>
      <ModalContainer close={toggleSuccess} show={showSuccess}>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-2">
          <div className="mb-4 relative">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Update Order Status
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

export default GroupOrders;
