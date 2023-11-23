import background from "../../assets/images/Rectangle 115.png";
import UserNavbar from "../../Component/UserComponent/UserNavbar";
import UserProfile from "../../Component/UserComponent/UserProfile";
import UserSidebar from "../../Component/UserComponent/UserSidebar";
import { Route, Routes } from "react-router-dom";
import Home from "../../Component/UserComponent/Home";
import Wallet from "../../Component/UserComponent/Wallet";
import Allprodcut from "./Allprodcut";

const FacilitatorRoute = () => {
  return (
    // <div>
    //   <div className="relative w-full h-screen">
    //     <img
    //       className="object-cover w-full h-full "
    //       src={background}
    //       alt="backgroundImage"
    //     ></img>
    //   </div>
    //   <div className="absolute inset-0 overflow-scroll">
    //     <UserNavbar />
    //     <Routes>
    //       <Route path="/" element={<Allprodcut />} />
    //       <Route path="/profile" element={<UserProfile />} />
    //       <Route path="/wallet" element={<Wallet />} />
    //     </Routes>
    //     <div className="absolute top-[4rem] left-0 w-[10rem] hidden md:flex ">
    //       <UserSidebar />
    //     </div>
    //   </div>
    // </div>

    <div className="">
      <div className="relative w-full h-screen">
        <img
          className="object-cover w-full h-full "
          src={background}
          alt=""
        ></img>
      </div>
      <div className="absolute inset-0 flex overflow-scroll">
        <div className=" basis-[12%] h-full">
          <UserSidebar />
        </div>
        <div className=" basis-[88%]">
          <UserNavbar />
          <Routes>
            <Route path="/" element={<Allprodcut />} />

            {/* <Route path="/" element={<Main />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/Addproduct" element={<AddProducts />} />

          <Route path="/group" element={<GroupPage />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default FacilitatorRoute;
