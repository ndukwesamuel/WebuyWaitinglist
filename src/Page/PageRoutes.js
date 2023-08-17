import { Route, Routes } from "react-router-dom";
import WaitingList from "./WaitingList";
import SignUp from "./SignUp";
import AdminRoute from "./Admin/AdminRoute";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WaitingList />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin/*" element={<AdminRoute />} />
    </Routes>
  );
};
export default PageRoutes;
