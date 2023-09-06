import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallGroup_fun } from "../../Redux/groupSlice";

function JoinGroup() {
  const { get_all_group } = useSelector((state) => state.reducer?.groupSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallGroup_fun());
    return () => {};
  }, []);

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Join Groups</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {get_all_group?.message.map((group) => (
            <div
              key={group._id}
              className="bg-white p-4 rounded shadow-md hover:shadow-lg transition duration-300"
            >
              <h2 className="text-xl font-semibold">{group.name}</h2>
              <p className="text-gray-600">{group.description}</p>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Members: {group.members.length}
                </p>
                <p className="text-sm text-gray-500">
                  Admins: {group.admins.length}
                </p>
              </div>
              {/* Add more information or buttons as needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JoinGroup;
