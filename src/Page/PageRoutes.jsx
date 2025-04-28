import { Route, Routes } from "react-router-dom";

import EmailVerification from "./EmailVerification";
import ForgetPassword from "./ForgetPassword";
import Login from "./Login";
import { Private } from "./privateroute/Private";
import ResetPassword from "./ResetPassword";
import SignUp from "./SignUp";
import Home from "./Home";
const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/*" exact element={<Home />} />

      <Route
        path="/signup"
        element={
          <Private>
            <SignUp />
          </Private>
        }
      />
      <Route
        path="/login"
        element={
          <Private>
            <Login />
          </Private>
        }
      />
      <Route path="/forget-password" element={<ForgetPassword />} />

      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<EmailVerification />} />
    </Routes>
  );
};
export default PageRoutes;
