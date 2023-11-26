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
import AdminRoute from "./Page/Admin/AdminRoute";
import Dashboard from "./Page/UserDashboard/Dashboard";
import FacilitatorRoute from "./Page/FacilitatorFolder/FacilitatorRoute";

// import './main.scss';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/*" exact element={<PageRoutes />} />

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
