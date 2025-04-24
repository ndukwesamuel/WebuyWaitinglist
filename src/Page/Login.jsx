import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { resetSignup } from "../Redux/Auth";
import { Login_fun } from "../Redux/AuthenticationSlice";
import background from "../assets/markus-spiske-ezYZfFnzARM-unsplash.jpg";
import loginImage from "../assets/signup-image.png";

// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useSelector(
    (state) => state.reducer?.AuthenticationSlice
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleSuccess = () => {
    setShowSuccess(!showSuccess);
    dispatch(resetSignup());
  };

  useEffect(() => {
    if (data && isSuccess) {
      if (data?.data?.user?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/onboarding");
      }
    }
  }, [data, isSuccess, navigate]);

  const handleSubmit = (values) => {
    const newData = {
      email: values.email,
      password: values.password,
    };

    dispatch(Login_fun(newData));
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
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left side - Image (visible on large screens) */}

          <div className="py-8 px-6 md:px-12 flex flex-col justify-center">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-medium text-[#009B4D]">Login</h1>
              <p className="mt-2 text-gray-600">
                Welcome back! Please login to continue.
              </p>
            </div>

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, values, handleChange }) => (
                <Form className="space-y-5">
                  <div>
                    <Label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
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
                      className="block text-sm font-medium mb-1"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your Password"
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
                    className="w-full bg-[#009B4D] hover:bg-[#00843f] text-white font-medium py-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin mr-2" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <p className="text-gray-600 flex justify-center">
                    Don't have an account? &nbsp;
                    <Link to="/signup" className="text-[#009B4D] font-medium">
                      Register
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
          {/* Right side - Form */}

          <div className="hidden lg:block">
            <div className="h-full flex items-center justify-center bg-gray-100">
              <img
                src={loginImage}
                alt="Login"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
