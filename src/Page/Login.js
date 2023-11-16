import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import image from "../assets/istockphoto-1320029684-612x612__1_-removebg.png";
import background from "../assets/markus-spiske-ezYZfFnzARM-unsplash.jpg";
import ModalContainer from "../Component/modal-container/modal-container";
import { Login_fun } from "../Redux/AutenticationSlice";
import { resetSignup } from "../Redux/Auth";

const Login = () => {
  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useSelector(
    (state) => state.reducer?.AutenticationSlice
  );

  const dispatch = useDispatch();

  const [loginform, setLoginform] = useState({
    email: "",

    password: "",
  });

  const { email, password } = loginform;

  const handleChange = (e) => {
    setLoginform({
      ...loginform,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newData = {
      email: loginform?.email,
      password: loginform?.password,
    };
    dispatch(Login_fun(newData));
  };

  const [showSuccess, setShowSuccess] = useState(false);

  const toggleSuccess = () => {
    setShowSuccess(!showSuccess);
    dispatch(resetSignup());
  };

  useEffect(() => {
    if (data && isSuccess) {
      if (data?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [data, dispatch, isSuccess, navigate]);

  return (
    <div
      className="flex content-center justify-center relative w-full h-screen md:px-6"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex content-center justify-center w-full h-full  bg-no-repeat bg-cover bg-center relative z-10">
        <div className="flex flex-row absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[1000px] md:w-full xl:max-w-[1440px] max-sm:w-full max-sm:bg-transparent rounded-xl rounded-l-xl h-[500px] z-40">
          <div className=" w-1/2 h-full max-sm:hidden bg-[#5F8575] rounded-l-xl">
            <img
              className=" w-auto h-full ml-4 max-sm:hidden"
              src={image}
              alt=""
            ></img>
          </div>
          <div className="w-1/2 p-7 pl-10 max-sm:p-0 max-sm:w-full">
            <div className="w-[200px] max-sm:w-full flex flex-col content-center justify-center max-sm:-mt-3">
              <h1 className="text-[#4F7942] text-[40px] max-sm:text-[#ffffff] max-sm:text-[40px] max-sm:text-center font-semibold">
                Welcome
              </h1>
              <p className="text-[#4F7942] max-sm:text-[#ffffff] max-sm:text-[25px] max-sm:font-semibold opacity-70 max-sm:text-center">
                Let's get you started!
              </p>
            </div>
            <div
              id="form"
              className="flex flex-col rounded-md py-3 max-sm:mt-3 w-auto content-center justify-center"
            >
              <form
                action=""
                className="max-sm:mx-auto content-center justify-center flex flex-col"
              >
                <div
                  id="email"
                  className="flex flex-col gap-[4px] mb-3 max-sm:text-[#ffffff] max-sm:text-base"
                >
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    id="email"
                    placeholder="Youremail@gmail.com"
                    className="border-b-[2px] rounded-[4px] p-1 pl-2 focus:border-b-[2px] active:border-[#4F7942] focus:outline-none outline-none w-[250px] text-[10px] border-[#4F7942] max-sm:text-sm max-sm:text-[#000000]"
                  ></input>
                </div>
                <div
                  id="password"
                  className="flex flex-col gap-[4px] max-sm:text-[#ffffff] max-sm:text-base"
                >
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    id="password"
                    placeholder="Password"
                    className="border-b-[2px] rounded-[4px] p-1 pl-2 focus:border-b-[2px] active:border-[#4F7942] focus:outline-none outline-none w-[250px] text-[10px] border-[#4F7942] max-sm:text-sm max-sm:text-[#000000]"
                  ></input>
                </div>
                <p className="mx-auto mt-3  ">
                  <Link
                    to="/forget-password"
                    className="text-[#4F7942] opacity-70 text-md hover:text-[#355E3B] hover:cursor-pointer max-sm:text-[#ffffff]"
                  >
                    Forget Password?
                  </Link>
                </p>
              </form>
            </div>

            <div className="flex flex-col mt-3 mx-auto max-sm:mt-2">
              <button
                className="text-[#ffffff] hover:text-[#355E3B] max-sm:hover:text-[#ffffff] hover:bg-transparent hover:border-[1px] hover:border-[#355E3B] bg-[#355E3B] text-center px-[55px] py-[7px] max-sm:py-[10px] text-[14px] max-sm:text-[17px] rounded-full mx-auto"
                type="button"
                onClick={handleSubmit}
              >
                {isLoading ? (
        <div className="flex items-center">
          <div className="w-4 h-4 border-t-2 border-[#4f7942] border-solid rounded-full animate-spin" />
        </div>
      ) : ( <>Login </>)}
              </button>
              <p className="mx-auto mt-1 text-sm max-sm:text-[#ffffff]">
                don't have an account?
                <span className="text-[#4F7942] opacity-70 text-sm">
                  <Link
                    to="/signup"
                    className="hover:text-[#355E3B] text-xl max-sm:text-[#ffffff] hover:cursor-pointer"
                  >
                    &nbsp;Sign Up
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <ModalContainer
        close={toggleSuccess}
        show={showSuccess}
        width={"max-w-xs"}
      >
        <div>
          <p className="text-xl text-center">Success!</p>
          <p className="text-xl text-center">{data?.message} to your mail</p>
        </div>
      </ModalContainer>
    </div>
  );
};

export default Login;
