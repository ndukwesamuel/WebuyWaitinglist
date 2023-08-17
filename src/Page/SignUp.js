import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function SignUp() {
  const SignUpmutation = useMutation(
    async (data) => {
      // Your API request code here
      // Use formData to send the image data to the API
      let API_URL = `https://webuyam.onrender.com/api/user/register`;

      // let API_URL = "https://webuyam.onrender.com";
      // const tokengot = localStorage.getItem("token");

      // console.log(data);

      const fake = {
        name: "Adetayo",
        email: "ndukwesamuel@gmail.com",
        password: "111111",
      };

      const config = {
        headers: {
          // "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
          // "Content-type": "application/json",
        },
      };

      try {
        const response = await axios.post(API_URL, fake, config);
        console.log(response.data); // Logging the response data
        // return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        // Success toast notification
        toast.success(" successfully!", {
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
      onError: () => {
        // Error toast notification
        toast.error("Error occurred while submitting .", {
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
      {SignUpmutation.isLoading && <div>Loading...</div>}
      <button
        className="btn btn-primary"
        onClick={() => SignUpmutation.mutate("this is me")}
      >
        SignUp
      </button>
    </div>
  );
}

export default SignUp;
