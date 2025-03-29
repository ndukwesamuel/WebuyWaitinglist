import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logout_fun } from "@/Redux/AuthenticationSlice";
import {
  Home,
  User,
  MessageSquare,
  Wallet,
  Settings,
  LogOut,
  ShoppingBag,
  Users,
  List,
  Receipt,
  Box,
} from "lucide-react";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data } = useSelector((state) => state.reducer?.AuthenticationSlice);
  const isAdmin = data?.data?.user?.isAdmin || false;

  const userMenuItems = [
    { label: "Home", icon: Home, path: "/dashboard" },
    { label: "Profile", icon: User, path: "/dashboard/profile" },
    { label: "Messages", icon: MessageSquare, path: "#" },
    { label: "Wallet", icon: Wallet, path: "/dashboard/wallet" },
    { label: "Settings", icon: Settings, path: "#" },
  ];

  const adminMenuItems = [
    { label: "Dashboard", icon: Home, path: "/admin" },
    { label: "Orders", icon: ShoppingBag, path: "/admin/group-orders" },
    { label: "Groups", icon: Users, path: "/admin/group" },
    { label: "Products", icon: Box, path: "/admin/products" },
    { label: "Category", icon: List, path: "/admin/category" },
    { label: "Users", icon: Users, path: "/admin/users" },
    { label: "Receipt", icon: Receipt, path: "/admin/receipt" },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  const handleLogout = () => {
    dispatch(Logout_fun());
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex h-screen">
      <Sidebar className="scrollbar:hidde">
        <SidebarContent className="relative bg-gradient-to- bg-[#4A9D44] pt-[5rem] overflow-y-auto scrollbar-hide">
          <SidebarHeader className="absolute top-4 right-0 left-0 bottom-0">
            {/* <h2 className="text-lg font-semibold text-[#919191] p-4">
              Dashboard
            </h2> */}
          </SidebarHeader>
          <SidebarGroup className="mt-[2rem]">
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.path}
                      className="h-14"
                      style={
                        location.pathname === item.path
                          ? { backgroundColor: "#A4CEA1", color: "#FFFF" }
                          : { backgroundColor: "transparent", color: "#FFFF" }
                      }
                    >
                      <Link
                        to={item.path}
                        className="flex items-center h-14 p-4 transition-colors duration-200"
                      >
                        <item.icon size={20} />
                        <span className="font-semibold ml-3">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="h-14"
                    style={{ backgroundColor: "transparent", color: "#FFFF" }}
                    onClick={handleLogout}
                  >
                    <div className="flex items-center h-14 p-4 transition-colors duration-200">
                      <LogOut size={20} />
                      <span className="font-semibold ml-3">Log Out</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

export default AppSidebar;
