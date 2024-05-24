import React, { useState } from 'react';

import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
} from 'react-icons/ri';

import { useGetAllGroupsQuery } from '../../Redux/groupApi';

const GroupsPage = () => {
  const { data, isLoading, isError, error } = useGetAllGroupsQuery();
  console.log(data);
  const [isListVisible, setIsListVisible] = useState({});

  const toggleListVisibility = (groupId) => {
    setIsListVisible((prevState) => ({
      ...prevState,
      [groupId]: !prevState[groupId] || false,
    }));
  };
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
  return (
    <div className="flex items-center justify-center w-full pl-16 mt-8 pr-14">
      <div
        className="flex flex-col w-full h-full p-5 mt-5 bg-white rounded-xl overflow-y-scroll max-h-[500px]"
        style={{
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[15px]">
          <div className="flex flex-col ">
            <h2 className="text-[#232323] text-[16px] leading-[19px] font-bold">
              Available Groups
            </h2>
          </div>

          <i className="fa-solid fa-people-group text-[#009b4d] text-[20px] transform hover:scale-[110%] transition duration-300 ease-out"></i>
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : data.message ? (
          data.message
        ) : (
          data.groups.map((group) => (
            <div className="w-full px-[20px] py-[5px]" key={group._id}>
              <div
                className="bg-[#F8F9FC] py-[10px] rounded-[8px] w-[10rem] mb-4 p-2 flex justify-between items-center"
                onClick={() => toggleListVisibility(group._id)}
              >
                <>{group.name}</>
                {isListVisible[group._id] ? (
                  <RiArrowDropUpLine className="text-[#009b4d] text-[20px] transform hover:scale-[110%] transition duration-300 ease-out" />
                ) : (
                  <RiArrowDropDownLine className="text-[#009b4d] text-[20px] transform hover:scale-[110%] transition duration-300 ease-out" />
                )}
              </div>
              {isListVisible[group._id] && (
                <div className="w-full px-[20px] py-[5px]">
                  <div className="bg-[#F8F9FC] py-[10px] rounded-[8px]">
                    <ol className=" flex justify-between w-full text-[13px] font-medium text-[#565454]">
                      <li className="ml-3 ">Name</li>
                      <li className="ml-3 ">Address</li>
                      <li className="mr-4 ">Wallet</li>
                    </ol>
                  </div>
                  {group.members.map((member) => (
                    <div
                      className="py-[5px] mt-2 flex items-center justify-between flex-row gap-[10px]"
                      key={member?._id}
                    >
                      <div className=" flex flex-row items-center gap-[5px]">
                        <div className="flex items-center border rounded-full w-[40px] h-[40px]">
                          <img
                            className="object-center w-full h-full "
                            src={member?.profileImage}
                            alt=""
                          ></img>
                        </div>
                        <h2 className=" text-[11px] font-semibold text-[#565454]">
                          {member?.fullName}
                        </h2>
                      </div>
                      <p className=" text-[11px] font-semibold -ml-10 text-[#565454]">
                        {member?.address}
                      </p>
                      <p className=" text-[11px] font-semibold text-[#565454]">
                        NGN {member?.wallet}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GroupsPage;
