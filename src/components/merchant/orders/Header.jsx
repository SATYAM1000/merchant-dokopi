"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Search } from "lucide-react";
import React from "react";

const Header = () => {
  const currentUser = useCurrentUser();
  return (
    <section className="w-full">
      <h1 className="text-xl font-bold capitalize">
        Hello, {currentUser?.name.split(" ")[0]}
      </h1>
      <p className="text-sm">Welcome to Merchant Dashboard</p>
      <div className="w-full overflow-hidden flex items-center rounded-sm bg-white border border-gray-800/[0.30] mt-4 gap-2 px-3 py-1">
        <Search className="w-4 h-4 text-gray-800" />
        <input
          type="text"
          placeholder="Search by order no..."
          className="w-full h-full rounded-none py-1 placeholder:text-gray-800 text-sm font-normal bg-transparent border-none outline-none border border-gray-200 px-0"
        />
      </div>
    </section>
  );
};

export default Header;
