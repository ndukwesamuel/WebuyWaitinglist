import React, { useState, useEffect } from "react";
import image from "../assets/istockphoto-1320029684-612x612__1_-removebg.png";
import { toast } from "react-toastify";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";


const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const API_URL = process.env.REACT_APP_Local;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const userId = searchParams.get("userId");
      const resetToken = searchParams.get("resetToken");

      const response = await axios.post(
        API_URL + "user/reset-password",
        {
          userId,
          resetToken,
          newPassword: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setResetSuccess(true);
        // Optionally, you can redirect the user or perform any other actions
      } else {
        toast.error(response.data.message || "Password reset failed");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("An error occurred while resetting the password");
    }
  };

  useEffect(() => {
    if (searchParams.has("userId") && searchParams.has("resetToken")) {
      const userId = searchParams.get("userId");
      const resetToken = searchParams.get("resetToken");

      const resetPassword = async (userId, resetToken) => {
        try {
          const response = await axios.post(
            API_URL + "user/reset-password",
            {
              userId,
              resetToken,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.success) {
            toast.success(`${response.data.message}`);
            navigate("/login");
          } else {
            toast.error(response.data.message);
            navigate("/");
          }
        } catch (error) {
          toast.error(error.message);
          navigate("/");
        }
      };

      resetPassword(userId, resetToken);
    }
  }, []);



  return (
    <div className="flex content-center justify-center relative w-full h-screen">
      <div className="flex content-center justify-center w-full h-full bg-no-repeat bg-cover bg-center relative z-10">
        <div className="flex flex-row absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[1000px] max-sm:w-full max-sm:bg-transparent rounded-xl rounded-l-xl h-[500px] z-40">
          <div className="w-1/2 h-full max-sm:hidden bg-[#5F8575] rounded-l-xl">
            <img className="w-auto h-full ml-4 max-sm:hidden" src={image} alt="" />
          </div>
          <div className="w-1/2 p-7 max-sm:p-0 max-sm:w-full">
            <div className="w-[200px] max-sm:w-full flex flex-col content-center justify-center max-sm:-mt-3">
              <h1 className="text-[#4F7942] text-[40px] max-sm:text-[#ffffff] max-sm:text-[40px] max-sm:text-right font-semibold">
                Reset Password
              </h1>
              <p className="text-[#4F7942] max-sm:text-[#ffffff] max-sm:text-[25px] max-sm:font-semibold opacity-70 max-sm:text-right">
                Enter your new password below.
              </p>
            </div>
            <div
              id="form"
              className="flex flex-col rounded-md p-6 max-sm:mt-3 w-auto content-center justify-center"
            >
              <form
                action=""
                className="ml-8 max-sm:mx-auto content-center justify-center flex flex-col"
              >
                <div
                  id="password"
                  className="flex flex-col gap-[4px] mb-3 max-sm:text-[#ffffff] max-sm:text-base"
                >
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    placeholder="Enter new password"
                    className="border-b-[2px] rounded-[4px] p-1 pl-2 focus:border-b-[2px] active:border-[#4F7942] focus:outline-none outline-none w-[250px] text-[10px] border-[#4F7942] max-sm:text-sm max-sm:text-[#000000]"
                  />
                </div>
                <div
                  id="confirmPassword"
                  className="flex flex-col gap-[4px] mb-3 max-sm:text-[#ffffff] max-sm:text-base"
                >
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    className="border-b-[2px] rounded-[4px] p-1 pl-2 focus:border-b-[2px] active:border-[#4F7942] focus:outline-none outline-none w-[250px] text-[10px] border-[#4F7942] max-sm:text-sm max-sm:text-[#000000]"
                  />
                </div>
                <button
                  className="text-[#ffffff] hover:text-[#355E3B] max-sm:hover:text-[#ffffff] hover:bg-transparent hover:border-[1px] hover:border-[#355E3B] bg-[#355E3B] text-center px-[55px] py-[7px] max-sm:py-[10px] text-[14px] max-sm:text-[17px] rounded-full mx-auto"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  };  
export default ResetPassword;