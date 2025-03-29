import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../../components/ui//sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logout_fun } from "../../Redux/AuthenticationSlice";
import {
  Home,
  User,
  MessageSquare,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";

const UserSidebar = () => {
  const dispatch = useDispatch();

  const menuItems = [
    { label: "Home", icon: <Home size={20} />, path: "/dashboard" },
    { label: "Profile", icon: <User size={20} />, path: "/dashboard/profile" },
    { label: "Messages", icon: <MessageSquare size={20} />, path: "#" },
    { label: "Wallet", icon: <Wallet size={20} />, path: "/dashboard/wallet" },
    { label: "Settings", icon: <Settings size={20} />, path: "#" },
  ];

  return (
    <Sidebar className="w-72 bg-white shadow-md h-screen">
      <SidebarHeader>
        <h2 className="text-lg font-semibold text-gray-800 p-4">Dashboard</h2>
        <Separator />
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition"
            >
              {item.icon}
              <span className="text-base font-medium text-gray-800">
                {item.label}
              </span>
            </Link>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button
          variant="destructive"
          className="w-full flex items-center gap-3"
          onClick={() => {
            dispatch(Logout_fun());
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
          }}
        >
          <LogOut size={20} />
          Log Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default UserSidebar;
