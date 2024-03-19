import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AdminRoute from './Page/Admin/AdminRoute';
import FacilitatorRoute from './Page/FacilitatorFolder/FacilitatorRoute';
import OnboardingRoute from './Page/Onboarding/OnboardingRoute';
import PageRoutes from './Page/PageRoutes';
import {
  AdminPrivateRoute,
  UserPrivateRoute,
} from './Page/privateroute/Private';
import Dashboard from './Page/UserDashboard/Dashboard';

// import './main.scss';

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
              <OnboardingRoute />
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
