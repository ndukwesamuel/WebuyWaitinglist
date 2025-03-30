import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../app-sidebar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "../AdminComponent/Navbar";
const DashboardLayout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <SidebarProvider>
          <AppSidebar />

          <main className="flex-1 mx-">
            <Navbar />
            <SidebarTrigger className="mt-10" />
            {children || <Outlet />}
          </main>
        </SidebarProvider>
      </div>
    </>
  );
};

export default DashboardLayout;
