"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Search } from "lucide-react";
import React from "react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

const Header = ({ date, setDate, setSelectedOrder }) => {
  const currentUser = useCurrentUser();
  const handleDateClick = (d) => {
    setDate(d);
    setSelectedOrder(null);
  };
  return (
    <section className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold capitalize">
          Hello, 👋 {currentUser?.name.split(" ")[0]}
        </h1>
        <div className="flex items-center text-gray-800 justify-center p-1 hover:bg-gray-100 rounded-sm transition-all cursor-pointer">
          <Popover>
            <PopoverTrigger asChild>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-calendar"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date ? new Date(date) : new Date()}
                onSelect={handleDateClick}
                initialFocus
                disabled={(date) =>
                  date > new Date() || date < new Date("2024-06-01")
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <p className="text-sm font-medium">{formatDateWithOrdinal(date || new Date())}</p>
      <div className="w-full overflow-hidden flex items-center bg-white border border-black/[0.3] rounded-3xl mt-4 gap-2 px-3 py-1.5">
        <Search className="w-4 h-4 text-gray-800" />
        <input
          type="text"
          placeholder="Search by order no..."
          className="w-full h-full rounded-none py-1 placeholder:text-gray-600 text-sm font-normal bg-transparent border-none outline-none border border-gray-200 px-0"
        />
      </div>
    </section>
  );
};

export default Header;

const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// Function to format date
const formatDateWithOrdinal = (date) => {
  const day = format(date, "d");
  const month = format(date, "MMMM");
  const year = format(date, "yyyy");
  const ordinalSuffix = getOrdinalSuffix(parseInt(day));
  return `${day}${ordinalSuffix} ${month} ${year}`;
};
