import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../Redux/userApi";
import { toast } from "react-toastify";
import { use } from "i18next";

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
const Users = () => {
  const { data: users, isLoading, isError, error } = useGetUsersQuery();
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isError) {
    return toast.error(error.data.message);
  }
  console.log("user", users);
  return (
    <div className="font-['Raleway']">
      <div className="w-full px-3 md:pl-20 mt-8 md:pr-14">
        <div className="flex flex-col w-full h-full p-5  mt-5 bg-white n rounded-xl ">
          <header className="w-full mb-5">
            <h1 className="text-[24px] leading-[34px] font-semibold text-[#009B4D]">
              Registered Users
            </h1>

            <hr />
          </header>
          <main className="w-full overflow-x-auto bg-[#fff5] shadow-md bg-opacity-5 rounded-[12.8px] mt-[15px]">
            <section className=" w-full max-h-[calc(89%-25.6px)] rounded-[9.6px] overflow-auto bg-[#fffb] my-[12.8px] mx-auto    ">
              <div className="flex justify-center">
                <table className=" w-full table-auto">
                  <thead>
                    <tr className=" text-[#565454]">
                      <th className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe] ">
                        Name
                      </th>
                      <th className=" p-[16px] sticky top-0 left-0 bg-[#d5d1defe] border-collapse">
                        email
                      </th>
                      <th className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe] ">
                        verified
                      </th>
                      <th className=" p-[16px] border-collapse sticky top-0 left-0 bg-[#d5d1defe]">
                        User Admin
                      </th>
                      <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                        Admin
                      </th>
                      <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                        wallet
                      </th>
                      <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                        Country
                      </th>
                      <th className=" p-[16px] sticky top-0 left-0 border-collapse bg-[#d5d1defe]">
                        referred users
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" font-semibold text-[#565454] ">
                    {users &&
                      users.data?.map((user) => (
                        <tr
                          className=" even:bg-[#0000000b] hover:bg-[#fff6]"
                          key={user._id}
                        >
                          <td className=" p-[16px] border-collapse">
                            {user?.fullName}
                          </td>
                          <td className=" p-[16px] border-collapse">
                            {user?.email}
                          </td>
                          <td className=" p-[16px] border-collapse">
                            {user && user?.verified === true ? "Yes" : "No"}
                          </td>

                          <td className="p-[16px] border-collapse text-black">
                            {user && user?.isUserAdmin === true ? "Yes" : "No"}
                          </td>
                          <td className=" p-[16px] border-collapse">
                            {user && user?.isAdmin === true ? "Yes" : "No"}
                          </td>
                          <td className=" p-[16px] border-collapse">
                            {user?.wallet}
                          </td>
                          <td className=" p-[16px] border-collapse">
                            {user?.country}
                          </td>
                          {/* <td>
                            <Link
                              onClick={() => {
                                handleUpdateClick(user._id);
                              }}
                            >
                              Update
                            </Link>
                          </td> */}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      </div>
      {/* <ModalContainer close={toggleSuccess} show={showSuccess}>
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
      </ModalContainer> */}
    </div>
  );
};

export default Users;
