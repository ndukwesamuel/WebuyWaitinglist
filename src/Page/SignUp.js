import React, {
  useEffect,
  useState,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { Link } from 'react-router-dom';

import image from '../assets/istockphoto-1320029684-612x612__1_-removebg.png';
import background from '../assets/markus-spiske-ezYZfFnzARM-unsplash.jpg';
import ModalContainer from '../Component/modal-container/modal-container';
import {
  RegisterFun,
  resetSignup,
} from '../Redux/Auth';

const SignUp = () => {
  const { data, isLoading } = useSelector(
    (state) => state.reducer?.Auth
  );
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
      className="relative flex content-center justify-center w-full h-screen md:px-6"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
              </p>
            </div>
            <div
              id="form"
              className="flex flex-col content-center w-full rounded-md"
            >
              <form
                action=""
                className="flex flex-col content-center justify-center py-6 max-sm:mx-auto"
              >
                <div
                  id="fullName"
                  className="flex flex-col gap-[4px] mb-3 max-sm:text-[#ffffff] max-sm:text-base"
                >
                  <div id="firstName" className=" flex flex-col gap-[4px]">
                    <label htmlFor="fname" className="">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={handleChange}
                      id="fname"
                      placeholder="Enter your first name here"
                      className=" border-b-[2px] rounded-[4px] focus:border-b-[2px] active:border-[#4F7942] focus:outline-none outline-none w-[250px] text-[10px] max-sm:text-sm max-sm:text-[#000000] p-1 pl-2 border-[#4F7942]"
                    ></input>
                  </div>
                  <div id="lastName" className=" flex flex-col gap-[4px] ">
                    <label htmlFor="lname" className="">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={handleChange}
                      id="lname"
                      placeholder="Enter your last name here"
                      className="border-b-[2px] rounded-[4px] focus:border-b-[2px] active:border-[#4F7942] focus:outline-none outline-none w-[250px] text-[10px] p-1 pl-2 max-sm:text-sm border-[#4F7942] max-sm:text-[#000000]"
                    ></input>
                  </div>
                </div>
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
              </form>
            </div>

            <div className="flex flex-col mx-auto max-sm:mt-2">
              <button
                className="text-[#ffffff] hover:text-[#355E3B] max-sm:hover:text-[#ffffff] hover:bg-transparent hover:border-[1px] hover:border-[#355E3B] bg-[#355E3B] text-center px-[55px] py-[7px] max-sm:py-[10px] text-[14px] max-sm:text-[17px] rounded-full mx-auto"
                type="button"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <div className="flex items-center px-[40px] py-[2px]  ">
                    <div className="w-4 h-4 border-t-2 border-[#4f7942] border-solid rounded-full animate-spin" />
                    {/* <span className="ml-2">Loading...</span> */}
                  </div>
                ) : (
                  <> Create Account </>
                )}
              </button>
              <p className="mx-auto mt-1 text-sm max-sm:text-[#ffffff]">
                Already have an account?
                <span className="text-[#4F7942] opacity-70 text-sm">
                  <Link
                    to="/login"
                    className="hover:text-[#355E3B] text-xl max-sm:text-[#ffffff] hover:cursor-pointer"
                  >
                    &nbsp; Sign In
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

export default SignUp;
