import { Route, Routes } from "react-router-dom";
import WaitingList from "./WaitingList";
import SignUp from "./SignUp";
import AdminRoute from "./Admin/AdminRoute";
import Login from "./Login";
import { Private, PrivateRoute } from "./privateroute/Private";
import GroupRoute from "./Group/GroupRoute";

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
    </Routes>
  );
};
export default PageRoutes;
