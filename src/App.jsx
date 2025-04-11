import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AdminRoute from "./Page/Admin/AdminRoute";
import FacilitatorRoute from "./Page/FacilitatorFolder/FacilitatorRoute";
import OnboardingRoute from "./Page/Onboarding/OnboardingRoute";
import PageRoutes from "./Page/PageRoutes";
import {
  AdminPrivateRoute,
  UserPrivateRoute,
} from "./Page/privateroute/Private";
import Dashboard from "./Page/UserDashboard/Dashboard";
import Main from "./Page/Admin/Main";
import GroupOrders from "./Page/Admin/GroupOrders";
import ProductsList from "./Page/Admin/Products/ProductsList";
import AddProducts from "./Page/Admin/Products/AddProducts";
import AddCategory from "./Page/Admin/Category";
import GroupsPage from "./Page/Admin/GroupsPage";
import Receipt from "./Page/Admin/Receipt";
import ViewReceipt from "./Page/Admin/ViewReceipt";
import UpdateReceipt from "./Page/Admin/UpdateReceipt";
import Users from "./Page/Admin/Users";
import DashboardLayout from "./Component/layouts/DashboardLayout";

import Home from "./Component/UserComponent/Home";
import UserProfile from "./Component/UserComponent/UserProfile";
import Wallet from "./Component/UserComponent/Wallet";
import ProductPage from "./Page/ProductPage";
import Cart from "./Page/UserDashboard/Cart";
import ProductDetail from "./Page/ProductDetails";
import GroupPage from "./Page/UserDashboard/GroupPage";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/*" exact element={<PageRoutes />} />

        <Route
          path="/onboarding/*"
          exact
          element={
            <UserPrivateRoute>
              <Dashboard />
            </UserPrivateRoute>
          }
        />

        <Route
          path="/facilitator/*"
          exact
          element={
            <UserPrivateRoute>
              <FacilitatorRoute />
            </UserPrivateRoute>
          }
        />

        <Route
          path="/dashboard/*"
          exact
          element={
            <UserPrivateRoute>
              <DashboardLayout />
            </UserPrivateRoute>
          }
        >
          <Route index element={<Wallet />} />
          <Route path="shop" element={<ProductPage />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="group" element={<GroupPage />} />
        </Route>

        <Route
          path="/admin/*"
          exact
          element={
            <AdminPrivateRoute>
              <DashboardLayout />
            </AdminPrivateRoute>
          }
        >
          <Route index element={<Main />} />
          <Route path="group-orders" element={<GroupOrders />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="Addproduct" element={<AddProducts />} />
          <Route path="category" element={<AddCategory />} />
          {/* <Route path="/category" element={<Category />} />
                    // <Route path="/Addcategory" element={<Category />} /> */}
          <Route path="group" element={<GroupsPage />} />
          <Route path="receipt" element={<Receipt />} />
          <Route path="view-receipt" element={<ViewReceipt />} />
          <Route path="users" element={<Users />} />

          <Route path="update-receipt" element={<UpdateReceipt />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
