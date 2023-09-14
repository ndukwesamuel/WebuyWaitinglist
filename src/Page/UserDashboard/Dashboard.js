import background from "../../assets/images/Rectangle 115.png";
import UserNavbar from "../../Component/UserComponent/UserNavbar";
import UserProfile from "../../Component/UserComponent/UserProfile";
import UserSidebar from "../../Component/UserComponent/UserSidebar";
import { Route, Routes } from "react-router-dom";

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
      <div className="absolute inset-0  overflow-scroll">
        <UserNavbar />
        <UserProfile />
        <div className="absolute top-[4rem] left-0 w-[10rem] hidden md:flex h-full ">
          <UserSidebar />
        </div>
      </div>

      {/* <div className="absolute inset-0 flex overflow-scroll">
        <div className=" basis-[12%] h-full">
        </div>
        <div className=" basis-[88%] h-full">
          <UserNavbar />
          <div className="">
            <UserProfile />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
