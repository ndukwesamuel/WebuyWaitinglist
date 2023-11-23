import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { Link } from 'react-router-dom';

<<<<<<< HEAD
import image from "../assets/istockphoto-1320029684-612x612__1_-removebg.png";
import background from "../assets/markus-spiske-ezYZfFnzARM-unsplash.jpg";
import ModalContainer from "../Component/modal-container/modal-container";
import { RegisterFun, resetSignup } from "../Redux/Auth";
import { MdOutlineMail } from "react-icons/md";
import { CiLock, CiUser } from "react-icons/ci";
=======
import image from '../assets/istockphoto-1320029684-612x612__1_-removebg.png';
import background from '../assets/markus-spiske-ezYZfFnzARM-unsplash.jpg';
import ModalContainer from '../Component/modal-container/modal-container';
import {
  RegisterFun,
  resetSignup,
} from '../Redux/Auth';
>>>>>>> 9267c328321a886649cf16e797d18490f7335591

const SignUp = () => {
  const { data, isLoading } = useSelector((state) => state.reducer?.Auth);
  const dispatch = useDispatch();

  const [loginform, setLoginform] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const { email, firstName, lastName, password } = loginform;

  const handleChange = (e) => {
    setLoginform({
      ...loginform,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let name = `${firstName} ${lastName}`;

    let newData = {
      name: name,
      email: loginform?.email,
      password: loginform?.password,
    };

    dispatch(RegisterFun(newData));
  };

  const [showSuccess, setShowSuccess] = useState(false);

  const toggleSuccess = () => {
    setShowSuccess(!showSuccess);
    dispatch(resetSignup());
  };

  useEffect(() => {
    if (data) {
      setShowSuccess(true);
    }
  }, [data]);

  return (
    <div
      className=" min-h-screen py-10 px-2"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
<<<<<<< HEAD
      <div className=" md:flex md:justify-center">
        <div className="bg-white   shadow-2xl flex justify-center   rounded-xl py-5 md:w-[50%]  lg:py-36 ">
          <div>
            <div className="text-center">
              <p className="text-[30px] font-medium text-[#009B4D] lg:text-[40px]">
                Register Here,
              </p>
              <p className="lg:text-[20px]">
                If you already have an account register
              </p>
              <p className="lg:text-[20px]">
                You can
                <Link
                  to="/login"
                  className="text-[#009B4D] text-[15px] font-medium "
                >
                  Login here !
                </Link>
=======
      <div className="relative z-10 font-['Raleway'] flex content-center justify-center w-full h-full bg-center bg-no-repeat bg-cover">
        <div className="flex flex-row absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[1000px] xl:max-w-[1440px] md:w-full max-sm:w-full max-sm:bg-transparent rounded-xl rounded-l-xl h-[500px] z-40">
          <div className=" w-1/2 h-full max-sm:hidden bg-[#5F8575] rounded-l-xl">
            <img
              className="w-auto h-full ml-4 max-sm:hidden"
              src={image}
              alt=""
            ></img>
          </div>
          <div className="w-1/2 p-7 max-sm:p-0 max-sm:w-full">
            <div className="flex flex-col content-center justify-center w-full max-sm:w-full max-sm:-mt-3">
              <h1 className="text-[#4F7942] text-[40px] max-sm:text-[#ffffff] max-sm:text-[40px] max-sm:text-center font-semibold">
                Welcome
              </h1>
              <p className="text-[#4F7942] font-semibold max-sm:text-white max-sm:text-[25px] max-sm:text-center max-sm:font-medium opacity-70">
                Let's get you started!
>>>>>>> 9267c328321a886649cf16e797d18490f7335591
              </p>
            </div>

            <form className=" flex-col gap-4 justify-center">
              <div className="my-5">
                <ReusableInput
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  id="fname"
                  label="First Name"
                  placeholder="Enter your first name here"
                  icon={CiUser}
                />
              </div>

              <div className="my-5">
                <ReusableInput
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  id="lname"
                  placeholder="Enter your last name here"
                  label="Last Name"
                  icon={CiUser}
                />
              </div>

              <div className="my-5">
                <ReusableInput
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  id="email"
                  placeholder="Youremail@gmail.com"
                  label="Email Address"
                  icon={MdOutlineMail}
                />
              </div>

              <div className="my-5">
                <ReusableInput
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  id="password"
                  placeholder="Password"
                  label="Password"
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
                  <> Create Account </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

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
