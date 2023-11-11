import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PageRoutes from "./Page/PageRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AdminPrivateRoute,
  Private,
  UserPrivateRoute,
} from "./Page/privateroute/Private";
import OrdersPage from "./Page/Admin/OrdersPage";
import AdminRoute from "./Page/Admin/AdminRoute";
import Dashboard from "./Page/UserDashboard/Dashboard";
import UserProfile from "./Component/UserComponent/UserProfile";
import Home from "./Component/UserComponent/Home";
import Fake from "./fake/Fake";
// import './main.scss';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/*" exact element={<PageRoutes />} />
        <Route
          path="/dashboard/*"
          exact
          element={
            <UserPrivateRoute>
              <Dashboard />
            </UserPrivateRoute>
          }
        />

        <Route
          path="/admin/*"
          exact
          element={
            <AdminPrivateRoute>
              <AdminRoute />
            </AdminPrivateRoute>
          }
        />
        <Route path="/Fake" exact element={<Fake />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
