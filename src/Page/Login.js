import React, {
  useEffect,
  useState,
} from 'react';

import { CiLock } from 'react-icons/ci';
import { MdOutlineMail } from 'react-icons/md';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import background from '../assets/markus-spiske-ezYZfFnzARM-unsplash.jpg';
import { resetSignup } from '../Redux/Auth';
import { Login_fun } from '../Redux/AuthenticationSlice';

const Login = () => {
  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useSelector(
    (state) => state.reducer?.AuthenticationSlice
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
    console.log({ newData });
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
      className="flex items-center content-center justify-center min-h-screen px-5 py-10 mx-auto "
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white font-['Raleway']  shadow-2xl flex justify-center   rounded-xl p-10">
        <div>
          <div className="text-center">
            <p className="text-[30px] font-medium text-[#009B4D]"> Sign in</p>
            <p>If you don’t have an account register</p>
            <p>
              {" "}
              You can{" "}
              <Link
                to="/signup"
                className="text-[#009B4D] text-[15px] font-medium "
              >
                {" "}
                Register here !{" "}
              </Link>
            </p>
          </div>

          <form className="flex-col justify-center gap-4 ">
            {/* <div className="mb-3 ">
              <label htmlFor="" className="block">
                {console.log({ email })}
                Email
              </label>
              <div className="flex items-center gap-4 bor border-b-[1px] border-[#99999999] ">
                <MdOutlineMail />
                <input
                  className="w-full outline-none out "
                  type="text"
                  placeholder="Enter your email address"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  id="email"
                />
              </div>
            </div> */}

            <div className="my-5">
              <ReusableInput
                label="Email"
                type="text"
                placeholder="Enter your email address"
                name="email"
                value={email}
                onChange={handleChange}
                icon={MdOutlineMail}
              />
            </div>

            <div className="my-5">
              <ReusableInput
                label="Password"
                type="password"
                placeholder="Enter your Password"
                name="password"
                value={password}
                onChange={handleChange}
                icon={CiLock}
              />
            </div>

            {/* <p className="mx-auto mt-3 "> */}
            <Link
              to="/forget-password"
              className="text-[12px] flex justify-end cursor-pointer"
            >
              Forget Password?
            </Link>
            {/* </p> */}

            <button
              className="text-[#ffffff] hover:text-[#355E3B] mt-10  hover:bg-transparent hover:border-[1px] hover:border-[#355E3B] bg-[#009B4D] text-center px-[55px] py-[7px]  text-[14px] rounded-[10px]  w-full"
              type="button"
              onClick={handleSubmit}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-t-2 border-[#4f7942] border-solid rounded-full animate-spin" />
                </div>
              ) : (
                <>Login </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

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
          className="w-full outline-none"
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
