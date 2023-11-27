import { Route, Routes } from "react-router-dom";
import WaitingList from "./WaitingList";
import SignUp from "./SignUp";
import Login from "./Login";
import { Private, PrivateRoute } from "./privateroute/Private";
import EmailVerification from "./EmailVerification";
import ResetPassword from "./ResetPassword";
import ForgetPassword from "./ForgetPassword";

const PageRoutes = () => {
  return (
    <Routes>
      <Route
        path="/*"
        exact
        element={
          <Private>
            <WaitingList />
          </Private>
        }
      />

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
