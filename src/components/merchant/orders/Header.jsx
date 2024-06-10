"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Search } from "lucide-react";
import React from "react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/lib/format-date";

const Header = ({ date, setDate }) => {
  const currentUser = useCurrentUser();
  return (
    <section className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold capitalize">
          Hello, 👋 {currentUser?.name.split(" ")[0]}
        </h1>
        <div className="flex items-center text-gray-500 justify-center p-1 hover:bg-gray-200 rounded-sm transition-all cursor-pointer">
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
                onSelect={setDate}
                initialFocus
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <p className="text-sm">Welcome to Merchant Dashboard</p>
      <div className="w-full overflow-hidden flex items-center rounded-sm bg-white border  border-gray-800/[0.30] mt-4 gap-2 px-3 py-1">
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
