import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RegisterFun, resetSignup } from "../Redux/Auth";
import background from "../assets/markus-spiske-ezYZfFnzARM-unsplash.jpg";
import signupImage from "../assets/signup-image.png";

// Validation schema using Yup
const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  country: Yup.string().required("Location is required"),
  referralCode: Yup.string(), // Optional
});

const SignUp = () => {
  const { data, isLoading } = useSelector((state) => state.reducer?.Auth);
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleSuccess = () => {
    setShowSuccess(!showSuccess);
    dispatch(resetSignup());
  };

  useEffect(() => {
    if (data) {
      setShowSuccess(true);
    }
  }, [data]);

  const handleSubmit = (values) => {
    const newData = {
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      password: values.password,
      country: values.country,
      referralCode: values.referralCode,
    };

    dispatch(RegisterFun(newData));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left side - Image (visible on large screens) */}
          <div className="hidden lg:block bg-gray-100">
            <img
              src={signupImage}
              alt="Sign Up"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right side - Form */}
          <div className="py-8 px-6 md:px-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-medium text-[#009B4D]">
                Register Here
              </h1>
              <p className="mt-2 text-gray-600">
                Join us and enjoy seamless shopping experience.
              </p>
            </div>

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                country: "",
                referralCode: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, values, handleChange, setFieldValue }) => (
                <Form className="space-y-6">
                  <div>
                    <Label
                      htmlFor="firstName"
                      className="block text-sm font-medium mb-2"
                    >
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name here"
                        value={values.firstName}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                    {errors.firstName && touched.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="lastName"
                      className="block text-sm font-medium mb-2"
                    >
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name here"
                        value={values.lastName}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                    {errors.lastName && touched.lastName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="youremail@gmail.com"
                        value={values.email}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="password"
                      className="block text-sm font-medium mb-2"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-3"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                    {errors.password && touched.password && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="country"
                      className="block text-sm font-medium mb-2"
                    >
                      Location
                    </Label>
                    <Select
                      name="country"
                      value={values.country}
                      onValueChange={(value) => setFieldValue("country", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Location" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Nigeria" className="cursor-pointer">
                          Nigeria
                        </SelectItem>
                        <SelectItem value="Ghana" className="cursor-pointer">
                          Ghana
                        </SelectItem>
                        <SelectItem value="Benin" className="cursor-pointer">
                          Benin
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.country && touched.country && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.country}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="referralCode"
                      className="block text-sm font-medium mb-2"
                    >
                      Referral Code (optional)
                    </Label>
                    <Input
                      id="referralCode"
                      name="referralCode"
                      placeholder="Enter referral code"
                      value={values.referralCode}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Link
                      to="/forget-password"
                      className="text-sm text-gray-600 hover:text-[#009B4D]"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#009B4D] hover:bg-[#00843f] text-white font-medium py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin mr-2" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                  <p className="mt-2 text-gray-600 flex justify-center">
                    Already have an account? &nbsp;
                    <Link to="/login" className="text-[#009B4D] font-medium">
                      Login here!
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-[#009B4D] mb-4">
              Registration Successful!
            </h2>
            <p className="mb-6">
              Your account has been created successfully. You can now login with
              your credentials.
            </p>
            <div className="flex justify-end">
              <Button
                onClick={toggleSuccess}
                className="bg-[#009B4D] hover:bg-[#00843f] text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
