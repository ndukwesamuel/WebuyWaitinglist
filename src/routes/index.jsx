import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "@/Page/UserDashboard/Dashboard";
const AdminDashboard = lazy(() => import("@/Page/Admin/Main"));
const UserDashboard = lazy(() => import("@/Page/UserDashboard/Dashboard"));
const Profile = lazy(() => import("../pages/common/Profile"));
const Messages = lazy(() => import("../pages/common/Messages"));
const Wallet = lazy(() => import("../pages/common/Wallet"));
const Settings = lazy(() => import("../pages/common/Settings"));

const Orders = lazy(() => import("../pages/admin/Orders"));
const Groups = lazy(() => import("../pages/admin/Groups"));
const Products = lazy(() => import("../pages/admin/Products"));
const Categories = lazy(() => import("../pages/admin/Categories"));
const Users = lazy(() => import("../pages/admin/Users"));
const Receipt = lazy(() => import("../pages/admin/Receipt"));

const RoutesConfig = () => {
  const { data } = useSelector((state) => state.reducer?.AuthenticationSlice);
  const isAdmin = data?.data?.user?.isAdmin; // Check if user is admin

  const routes = isAdmin
    ? [
        // Admin Routes
        { path: "/admin", element: <AdminDashboard /> },
        { path: "/admin/group-orders", element: <Orders /> },
        { path: "/admin/group", element: <Groups /> },
        { path: "/admin/products", element: <Products /> },
        { path: "/admin/category", element: <Categories /> },
        { path: "/admin/users", element: <Users /> },
        { path: "/admin/receipt", element: <Receipt /> },
        { path: "*", element: <Navigate to="/admin" replace /> },
      ]
    : [
        // User Routes
        { path: "/dashboard", element: <UserDashboard /> },
        { path: "/profile", element: <Profile /> },
        { path: "/messages", element: <Messages /> },
        { path: "/wallet", element: <Wallet /> },
        { path: "/settings", element: <Settings /> },
        { path: "*", element: <Navigate to="/dashboard" replace /> },
      ];

  return routes;
};

export default RoutesConfig;
