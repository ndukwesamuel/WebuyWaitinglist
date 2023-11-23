import React, { useState } from "react";
import image from "../assets/istockphoto-1320029684-612x612__1_-removebg.png";
import background from "../assets/markus-spiske-ezYZfFnzARM-unsplash.jpg";

import { useReqPasswordResetMutation } from "../../Redux/PasswordResetApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";

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
                Forget Password
              </p>
              <p className="lg:text-[20px]">
                Enter your email to reset your password.
              </p>
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
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="Enter your email"
                  label="Email"
                  icon={MdOutlineMail}
                />
              </div>

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
                  <> Forget Password</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
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
