"use client";
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
  const handleDateClick = (d) => {
    setDate(d);
    setSelectedOrder(null);
  };
  return (
    <section className="w-full px-2 h-20 flex items-center justify-center">
      <div className="w-full flex items-center justify-between gap-6">
        <div className="w-full overflow-hidden flex items-center border rounded-2xl gap-2 px-3 py-1">
          <Search className="w-4 h-4 text-gray-800" />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full rounded-none py-1 placeholder:text-gray-600 text-sm font-normal bg-transparent border-none outline-none border border-gray-200 px-0"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center text-gray-800 justify-center w-11 h-9 hover:bg-gray-100 rounded-sm transition-all cursor-pointer">
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
            </div>
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
    </section>
  );
};

export default Header;

