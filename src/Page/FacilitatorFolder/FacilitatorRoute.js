import background from "../../assets/images/Rectangle 115.png";
import { Route, Routes } from "react-router-dom";
import Allprodcut from "./Allprodcut";
import UserNavbar from "./Header";
import Cart from "./Cart";
const FacilitatorRoute = () => {
  return (
    <div className="">
      <div className="relative w-full h-screen">
        <img
          className="object-cover w-full h-full "
          src={background}
          alt=""
        ></img>
      </div>
      <div className="absolute inset-0 flex overflow-scroll">
        <div className=" w-full">
          <UserNavbar />
          <Routes>
            <Route path="/" element={<Allprodcut />} />
            <Route path="/cart" element={<Cart />} />

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
