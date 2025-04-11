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
import sidebarBg from "../assets/images/sidebarBg.png";
import { selectCartItemCount } from "../Redux/cartApi";
import { useGetCartQuery } from "../Redux/cartApi";
const AppSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data } = useSelector((state) => state.reducer?.AuthenticationSlice);
  const isAdmin = data?.data?.user?.isAdmin || false;
  // const cartItemCount = useSelector(selectCartItemCount);
  const { data: cartData } = useGetCartQuery();

  // Calculate cart count from the latest data
  const cartItemCount = cartData?.userCart?.items?.length || 0;
  const userMenuItems = [
    { label: "Wallet", icon: Home, path: "/dashboard" },
    { label: "Shop", icon: ShoppingBag, path: "/dashboard/shop" },
    { label: "Cart", icon: ShoppingBag, path: "/dashboard/cart" },
    { label: "Group", icon: ShoppingBag, path: "/dashboard/group" },

    { label: "Messages", icon: MessageSquare, path: "#" },
    { label: "Wallet", icon: Wallet, path: "/dashboard/wallet" },
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
      <Sidebar className="">
        {/* bg-[#4A9D44] */}
        <SidebarContent
          className="relative pt-[5rem] overflow-y-auto "
          style={{
            backgroundImage: `url(${sidebarBg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <SidebarHeader className="absolute top-4 right-0 left-0 bottom-0"></SidebarHeader>
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
                          ? { backgroundColor: "#A4CEA1", color: "#4A9D44" }
                          : { backgroundColor: "transparent", color: "#919191" }
                      }
                    >
                      <Link
                        to={item.path}
                        className="flex items-center h-14 p-4 transition-colors duration-200"
                      >
                        <item.icon size={20} />
                        <span className="font-semibold ml-3 flex items-center gap-2">
                          {item.label}

                          {item.label === "Cart" && cartItemCount > 0 && (
                            <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                              {cartItemCount}
                            </span>
                          )}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                {/* <SidebarMenuItem>
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
                </SidebarMenuItem> */}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

export default AppSidebar;
