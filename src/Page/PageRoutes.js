import { Route, Routes } from "react-router-dom";
import WaitingList from "./WaitingList";
import SignUp from "./SignUp";
import AdminRoute from "./Admin/AdminRoute";
import Login from "./Login";
import { Private } from "./privateroute/Private";
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
      <Route path="/admin/*" element={<AdminRoute />} />
      <Route path="/group/*" element={<GroupRoute />} />
    </Routes>
  );
};
export default PageRoutes;
