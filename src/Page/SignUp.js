import React, {
  useEffect,
  useState,
} from 'react';

import {
  CiLock,
  CiUser,
} from 'react-icons/ci';
import { MdOutlineMail } from 'react-icons/md';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { Link } from 'react-router-dom';

import background from '../assets/markus-spiske-ezYZfFnzARM-unsplash.jpg';
import {
  RegisterFun,
  resetSignup,
} from '../Redux/Auth';

// Import your function for sending emails
// import {
  // sendReferralEmail,
// } from './emailService'; // You need to implement this

const SignUp = () => {
  const { data, isLoading } = useSelector((state) => state.reducer?.Auth);
  const dispatch = useDispatch();

  const [loginform, setLoginform] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    referralCode: "",
  });

  const [selectedCountry, setSelectedCountry] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { email, firstName, lastName, password, referralCode } = loginform;

  const handleChange = (e) => {
    setLoginform({
      ...loginform,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let name = `${firstName} ${lastName}`;

    let newData = {
      name: name,
      email: loginform?.email,
      password: loginform?.password,
      country: selectedCountry,
      referralCode: referralCode,
    };

    // Call the register function to sign up the user
    dispatch(RegisterFun(newData));

    // Generate referral link
    const referralLink = generateReferralLink(loginform.referralCode);

    // Send referral link via email
    // await sendReferralEmail(loginform.email, referralLink);
  };

  // Function to generate referral link
  const generateReferralLink = (referralCode) => {
    // You can generate the referral link as per your requirement
    // For example: return `https://example.com/signup?ref=${referralCode}`;
    return `https://yourwebsite.com/signup?ref=${referralCode}`;
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
      className="min-h-screen px-2 py-10 "
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
                Register Here,
              </p>
              <p className="lg:text-[20px]">
                If you already have an account registered
              </p>
              <p className="lg:text-[20px]">
                You can &nbsp;
                <Link
                  to="/login"
                  className="text-[#009B4D] text-[15px] font-medium "
                >
                  Login here !
                </Link>
              </p>
            </div>

            <form className="flex-col justify-center gap-4 ">
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
                  placeholder="youremail@gmail.com"
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

              <div className="my-5">
                <div className="my-5">
                  <label htmlFor="country" className="block font-normal">
                    Location
                  </label>
                  <div className="relative">
                    <select
                      id="country"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      className="appearance-none bg-white border border-[#99999999] text-base p-3 rounded-lg w-full"
                    >
                      <option value="" disabled>
                        Select a Location
                      </option>
                      <option value="Nigeria">Nigeria </option>
                      <option value="Ghana">Ghana </option>
                      <option value="Benin">Benin </option>

                      {/* Add more countries as needed */}
                    </select>
                  </div>
                </div>
              </div>
              <div className="my-5">
                <ReusableInput
                  type="text"
                  name="referralCode"
                  value={referralCode}
                  onChange={handleChange}
                  id="referralCode"
                  placeholder="asawasas"
                  label="Referral Code (optional)"
                />
              </div>

              <button
                className="text-[#ffffff] hover:text-[#355E3B] mt-10  hover:bg-transparent hover:border-[1px] hover:border-[#355E3B] bg-[#009B4D] text-center px-[55px] py-[12px] text-lg rounded-[10px]  w-full"
                type="button"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
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
      <label htmlFor="" className="block font-normal">
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
