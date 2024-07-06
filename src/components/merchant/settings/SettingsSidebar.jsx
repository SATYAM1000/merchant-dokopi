"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { FaStore, FaImages, FaClock, FaUserCircle } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { BiSolidBank, BiSupport } from "react-icons/bi";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { MdStore } from "react-icons/md";
import { FaRegImages } from "react-icons/fa";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import { RiBankFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";

import { PiHeadphonesDuotone } from "react-icons/pi";
import { PiHeadphonesFill } from "react-icons/pi";


const SettingsSidebar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="bg-white h-fit sticky top-6">
      <div
        id="docs-sidebar"
        className={`hs-overlay [--auto-close:lg] ${
          isSidebarOpen ? "hs-overlay-open:translate-x-0" : "-translate-x-full"
        } transition-all duration-300 transform hidden  w-64 bg-white border-e border-gray-200  pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300`}
      >
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            {sidebarMenuItems.map((item, index) => (
              <li
                key={index}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  className={`flex items-center gap-x-3.5 py-2 text-sm text-gray-600 font-medium  hover:text-indigo-600 ${
                    pathname === item.path
                      ? "text-indigo-600 border-b border-[#E5E5E5]"
                      : "border-b border-[#E5E5E5]"
                  }`}
                  href={item.path}
                >
                  <span className="flex items-center">
                    {pathname === item.path || hoveredItem === index
                      ? item.selectedIcon
                      : item.icon}
                  </span>
                  <span className="font-medium text-[14px]">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* End Sidebar */}
    </div>
  );
};

export default SettingsSidebar;

const sidebarMenuItems = [
  {
    title: "Store details",
    path: "/settings/store-details",
    selectedIcon: <MdStore className="h-6 w-6" aria-hidden="true" />,
    icon: (
      <MdOutlineStoreMallDirectory className="h-6 w-6" aria-hidden="true" />
    ),
  },
  {
    title: "Store Images",
    path: "/settings/store-images",
    selectedIcon: <FaImages className="h-5 w-5" aria-hidden="true" />,
    icon: <FaRegImages className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: "Store timing",
    path: "/settings/store-timing",
    selectedIcon: (
      <MdOutlineAccessTimeFilled className="h-5 w-5" aria-hidden="true" />
    ),
    icon: <MdOutlineAccessTime className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: "Pricing",
    path: "/settings/pricing",
    selectedIcon: (
      <RiMoneyRupeeCircleFill className="h-5 w-5" aria-hidden="true" />
    ),
    icon: <RiMoneyRupeeCircleLine className="h-5 w-5" aria-hidden="true" />,
  },
  {
    title: "Bank details",
    path: "/settings/bank-details",
    selectedIcon: <RiBankFill className="h-5 w-5" aria-hidden="true" />,
    icon: <RiBankLine className="h-5 w-5" />,
  },
  {
    title: "Staff accounts",
    path: "/",
    selectedIcon: <FaUser className="h-4 w-4" aria-hidden="true" />,
    icon: <FaRegUser className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: "Support",
    path: "/settings/support",
    selectedIcon: <PiHeadphonesFill className="h-5 w-5" aria-hidden="true" />,
    icon: <PiHeadphonesDuotone className="h-5 w-5" aria-hidden="true" />,
  },
];
