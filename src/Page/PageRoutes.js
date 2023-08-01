import { Route, Routes } from "react-router-dom";
import WaitingList from "./WaitingList";
import SignUp from "./SignUp";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WaitingList />} />
      <Route path="/signup" element={<SignUp />} />
      {/* <Route path="/employee/*" element={<AdminRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
  
        <Route path="/auth/*" element={<AuthenticationRoute />} /> */}
    </Routes>
  );
};
export default PageRoutes;
