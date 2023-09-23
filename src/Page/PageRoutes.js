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

      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/group/*"
        element={
          <PrivateRoute>
            <GroupRoute />
          </PrivateRoute>
        }
      />

      {/* <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <AdminRoute />
          </PrivateRoute>
        }
      /> */}
    </Routes>
  );
};
export default PageRoutes;
