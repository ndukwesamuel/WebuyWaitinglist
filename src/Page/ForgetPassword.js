import React, { useState } from "react";
import image from "../assets/istockphoto-1320029684-612x612__1_-removebg.png";
import background from "../assets/markus-spiske-ezYZfFnzARM-unsplash.jpg";

import { useReqPasswordResetMutation } from "../Redux/PasswordResetApi";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const [resetPassword, { isLoading, isSuccess, isError, error, data }] =
    useReqPasswordResetMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
    } else {
      const response = await resetPassword({ email });
      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success(response.data.message);
      }
    }
  };

  return (
    <div
      className="relative flex content-center justify-center w-full h-screen md:px-6"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex content-center justify-center relative w-full h-screen">
        <div className="flex content-center justify-center w-full h-full bg-no-repeat bg-cover bg-center relative z-10">
          <div className="flex flex-row absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[1000px] max-sm:w-full max-sm:bg-transparent rounded-xl rounded-l-xl h-[500px] z-40">
            <div className="w-1/2 h-full max-sm:hidden bg-[#5F8575] rounded-l-xl">
              <img
                className="w-auto h-full ml-4 max-sm:hidden"
                src={image}
                alt=""
              />
            </div>
            <div className="w-1/2 p-7 max-sm:p-0 max-sm:w-full">
              <div className="w-[200px] max-sm:w-full flex flex-col content-center justify-center max-sm:-mt-3">
                <h1 className="text-[#4F7942] text-[40px] max-sm:text-[#ffffff] max-sm:text-[40px] max-sm:text-right font-semibold">
                  Forget Password
                </h1>
                <p className="text-[#4F7942] max-sm:text-[#ffffff] max-sm:text-[25px] max-sm:font-semibold opacity-70 max-sm:text-right">
                  Enter your email to reset your password.
                </p>
              </div>
              <div
                id="form"
                className="flex flex-col rounded-md p-6 max-sm:mt-3 w-auto content-center justify-center"
              >
                <form className="ml-8 max-sm:mx-auto content-center justify-center flex flex-col">
                  <div
                    id="email"
                    className="flex flex-col gap-[4px] mb-3 max-sm:text-[#ffffff] max-sm:text-base"
                  >
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      placeholder="Enter your email"
                      className="border-b-[2px] rounded-[4px] p-1 pl-2 focus:border-b-[2px] active:border-[#4F7942] focus:outline-none outline-none w-[250px] text-[10px] border-[#4F7942] max-sm:text-sm max-sm:text-[#000000]"
                    />
                  </div>
                  <button
                    className="text-[#ffffff] hover:text-[#355E3B] max-sm:hover:text-[#ffffff] hover:bg-transparent hover:border-[1px] hover:border-[#355E3B] bg-[#355E3B] text-center px-[55px] py-[7px] max-sm:py-[10px] text-[14px] max-sm:text-[17px] rounded-full mx-auto"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Forget Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
