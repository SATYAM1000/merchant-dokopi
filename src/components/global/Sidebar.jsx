"use client";
import React from "react";
import UserAvatar from "./UserAvatar";
import { Menu } from "lucide-react";
import SidebarMenu from "./SidebarMenu";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  if (
    pathname === "/auth/sign-in" ||
    pathname === "/auth/sign-up" ||
    pathname === "/getting-started"
  )
    return null;
  return (
    <div className="hidden md:flex md:w-16 h-[100vh] md:flex-col shrink-0 overflow-hidden sticky left-0 top-0">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
        <div className="flex items-center flex-shrink-0 px-4">
          <Menu />
        </div>
        <div className="px-4 mt-6">
          <hr className="border-gray-200" />
        </div>
        <div className="flex flex-col justify-between flex-1 px-3 mt-6">
          <div className="space-y-4">
            <nav className="flex-1 space-y-2">
              <SidebarMenu />
            </nav>
            <hr className="border-gray-200" />
          </div>
          <div>
            <div className="pb-8 mt-6">
              <UserAvatar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
