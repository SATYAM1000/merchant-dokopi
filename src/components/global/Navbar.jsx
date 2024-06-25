import React from "react";
import StoreStatus from "@/components/global/StoreStatus";

const Navbar = () => {
  return (
    <header className="sticky  top-0 flex h-10 items-center justify-between gap-4 border-b bg-gray-100 z-10 p-5  ">
      <div className="flex items-center justify-center  gap-4 md:ml-auto md:gap-2 lg:gap-5 ">
        <StoreStatus />
      </div>
    </header>
  );
};

export default Navbar;
