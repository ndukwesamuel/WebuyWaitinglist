import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallGroup_fun } from "../../Redux/groupSlice";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import axios from "axios";
let main_url = process.env.REACT_APP_Local;

function JoinGroup() {
  const { get_all_group } = useSelector((state) => state.reducer?.groupSlice);
  const dispatch = useDispatch();

  const { data, isLoading, isSuccess } = useSelector(
    (state) => state.reducer?.AutenticationSlice
  );

  useEffect(() => {
    dispatch(getallGroup_fun());
    return () => {};
  }, []);

  const JoinGroupmutation = useMutation(
    (formData) => {
      // Your API request code here
      // Use formData to send the image data to the API
      const tokengot = data?.token;

      console.log(formData);

      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          // Accept: "multipart/form-data",

          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${tokengot}`,
        },
      };

      let joinurl = `${main_url}group/${formData}/join`;

      console.log(joinurl);

      console.log(config);

      return axios.get(joinurl, config);
    },
    {
      onSuccess: () => {
        toast.success("Form submitted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
      onError: (error) => {
        console.log(error);
        console.error("Error occurred while submitting the form:", error);
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

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Join Groups</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {get_all_group?.message.map((group) => (
            <div
              key={group._id}
              className="bg-white cursor-pointer debug p-4 rounded shadow-md hover:shadow-lg transition duration-300"
              onClick={() => JoinGroupmutation.mutate(group._id)}
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
