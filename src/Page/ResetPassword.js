import React, { useState, useEffect } from "react";
import image from "../assets/istockphoto-1320029684-612x612__1_-removebg.png";
import background from "../assets/markus-spiske-ezYZfFnzARM-unsplash.jpg";

import { toast } from "react-toastify";
import axios from "axios";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { usePasswordResetMutation } from "../Redux/PasswordResetApi";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
const ResetPassword = () => {
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [resetPassword, { isLoading, isSuccess, isError, error }] =
    usePasswordResetMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("All field must be filled");
    } else if (newPassword !== confirmPassword) {
      toast.error("Passwords doesn't match");
    } else if (newPassword.length < 6) {
      toast.error("Password must be at least 6 character");
    } else {
      searchParams.has("userId") && searchParams.has("uniqueString");
      const userId = searchParams.get("userId");
      const uniqueString = searchParams.get("uniqueString");
      const response = await resetPassword({
        userId,
        uniqueString,
        newPassword,
      });
      console.log(response);
      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        if (response.data.error === true) {
          toast.error(response.data.message);
          navigate("/forget-password");
        } else {
          toast.success(response.data.message);
          navigate("/login");
        }
      }
    }
  };

  return (
    <div
      className=" min-h-screen py-10 px-2"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className=" md:flex md:justify-center">
        <div className="bg-white   shadow-2xl flex justify-center   rounded-xl py-5 md:w-[50%]  lg:py-36 ">
          <div>
            <div className="text-center">
              <p className="text-[30px] font-medium text-[#009B4D] lg:text-[40px]">
                Reset Password
              </p>
              <p className="lg:text-[20px]">Enter your new password below.</p>
              <p className="lg:text-[20px]">
                You can{" "}
                <Link
                  to="/signup"
                  className="text-[#009B4D] text-[15px] font-medium "
                >
                  Register here !{" "}
                </Link>
              </p>
            </div>

            <form className=" flex-col gap-4 justify-center">
              <div className="my-5">
                <ReusableInput
                  type="password"
                  name="password"
                  value={newPassword}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="Enter new password"
                  label="New Password"
                  icon={CiLock}
                />
              </div>

              <div className="my-5">
                <ReusableInput
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  label="Confirm Password"
                  icon={CiLock}
                />
              </div>

              {/* <p className="mx-auto mt-3  "> */}
              <Link
                to="/forget-password"
                className="text-[12px] flex justify-end cursor-pointer"
              >
                Forget Password ?
              </Link>
              {/* </p> */}

              <button
                className="text-[#ffffff] hover:text-[#355E3B] mt-10  hover:bg-transparent hover:border-[1px] hover:border-[#355E3B] bg-[#009B4D] text-center px-[55px] py-[7px]  text-[14px] rounded-[10px]  w-full"
                type="button"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <div className="w-4 h-4 border-t-2 border-[#4f7942] border-solid rounded-full animate-spin" />
                  </div>
                ) : (
                  <> Reset Password </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
const ReusableInput = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  icon: Icon,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="mb-3">
      <label htmlFor="" className="block">
        {label}
      </label>
      <div className="flex items-center gap-4 border-b-[1px] border-[#99999999]">
        {Icon && <Icon />}
        <input
          className="outline-none w-full"
          type={isPasswordVisible ? "text" : type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <div onClick={togglePasswordVisibility} className="cursor-pointer">
            {isPasswordVisible ? "👁️" : "🙈"}
          </div>
        )}
      </div>
    </div>
  );
};
