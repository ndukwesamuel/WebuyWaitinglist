import { useGetGroupOrderQuery } from "../../Redux/orderApi";
import { toast } from "react-toastify";

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

const GroupOrders = () => {
  const { data: orders, isLoading, isError, error } = useGetGroupOrderQuery();
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isError) {
    return toast.error(error.data.message);
  }

  const groupOrders = orders.message;

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
      order?.status === "Cancelled"
        ? "bg-red-500 text-black"
        : order?.status === "Pending"
        ? "bg-brown-500 text-black debug"
        : order?.status === "Delivered"
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
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default GroupOrders;
