import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UserSidebar from "./UserSidebar";
const UserLayout = () => {
  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <UserSidebar />

        <main className="flex-1 mx-">
          <SidebarTrigger className="mt-10" />
          {children || <Outlet />}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default UserLayout;
