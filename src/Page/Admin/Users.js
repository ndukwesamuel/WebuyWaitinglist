import { useState } from 'react';

import axios from 'axios';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { LoadingSkeleton } from '../../Component/Loader/LoadingSkeleton';
import ModalContainer from '../../Component/modal-container/modal-container';
import { useGetUsersQuery } from '../../Redux/userApi';

const Base_URL = process.env.REACT_APP_Url;

const Users = () => {
  const { token } = useSelector(
    (state) => state?.reducer?.AuthenticationSlice?.data
  );
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUsersQuery();
  const toggleSuccess = () => {
    setShowSuccess(!showSuccess);
  };
  const [amount, setAmount] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const createmutation = useMutation(
    async ({ id, amount }) => {
      let API_URL = `${Base_URL}wallet/update/${id}`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let data = { amount };
      setCreateLoading(true);
      return await axios.patch(API_URL, data, config);
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
        setAmount("");
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
        setAmount("");
      },
    }
  );
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  if (isError) {
    return toast.error(error.data.message);
  }

  const handleUpdateClick = (selectedUserId) => {
    setSelectedUserId(selectedUserId);
    setShowSuccess(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you?");
    if (confirmed) {
      createmutation.mutate({
        id: selectedUserId,
        amount: amount,
      });
    }
  };
  let filteredUsers = users?.data?.filter(
    (user) =>
      user._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user?.country.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );
  return (
    <div className="font-['Raleway']">
      <div className="w-full px-3 mt-8 md:px-14">
        <div
          className="flex flex-col w-full h-full p-5 overflow-y-scroll max-h-[600px]  mt-5 bg-white rounded-xl "
          style={{
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <header className="flex content-center justify-between w-full h-[10%] bg-[#fff4] py-[12.8px] px-[30px]">
            <h1 className="text-[24px] leading-[34px] font-semibold text-[#009B4D]">
              Registered Users
            </h1>
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
          </header>
          <hr />
          <main className="w-full overflow-x-auto bg-[#fff5] shadow-md bg-opacity-5 rounded-[12.8px] mt-[15px]">
            <section className=" w-full max-h-[calc(89%-25.6px)] rounded-[9.6px] overflow-auto bg-[#fffb] my-[12.8px] mx-auto    ">
              <div className="flex justify-center ">
                <table className="w-full table-auto ">
                  <thead className="">
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
                    {filteredUsers &&
                      filteredUsers?.map((user) => (
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
                          <td className=" p-[16px] border-collapse">
                            {user?.referredUsers.length}
                          </td>
                          <td>
                            <Link
                              onClick={() => {
                                handleUpdateClick(user._id);
                              }}
                            >
                              <i class="fa-solid fa-pen-to-square"></i>
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
          <div className="relative mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Update user's wallet : Enter Amount
            </label>

            <input
              type="text"
              className="p-2 mx-auto border-2 outline-none"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              value={amount}
            />
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

export default Users;
