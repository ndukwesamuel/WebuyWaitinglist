import background from "../../assets/images/Rectangle 115.png";
import UserNavbar from "../../Component/UserComponent/UserNavbar";
import UserProfile from "../../Component/UserComponent/UserProfile";
import UserSidebar from "../../Component/UserComponent/UserSidebar";
import { Route, Routes } from "react-router-dom";
import Home from "../../Component/UserComponent/Home";
import Wallet from "../../Component/UserComponent/Wallet";

const Dashboard = () => {
  return (
    <div>
      <div className="relative w-full h-screen">
        <img
          className="object-cover w-full h-full "
          src={background}
          alt=""
        ></img>
      </div>
      <div className="absolute inset-0 overflow-scroll">
        <UserNavbar />
        {/* <UserProfile /> */}
        <Home />
        {/* <Wallet /> */}
        <div className="absolute top-[4rem] left-0 w-[10rem] hidden md:flex ">
          <UserSidebar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
