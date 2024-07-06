"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, CircleX } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";

const OrderFilter = ({ setFilterData, originalData }) => {
  const currentUser = useCurrentUser();

  const [date, setDate] = useState({ from: undefined, to: undefined });
  const [showClearFilterIcon, setShowClearFilterIcon] = useState(false);

  const getPreviousMonthDate = () => {
    const TodayDate = new Date();
    return new Date(TodayDate.getFullYear(), TodayDate.getMonth() - 1);
  };

  const filterDatesInRange = (dataSet) => {
    if (!date.from || !date.to) return dataSet;
    return dataSet.filter((dateString) => {
      const dateFromData = new Date(dateString.Transaction_Time);
      const startDate = date.from;
      const endDate = new Date(
        date.to.getFullYear(),
        date.to.getMonth(),
        date.to.getDate(),
        23,
        59,
        59
      );
      return dateFromData >= startDate && dateFromData <= endDate;
    });
  };

  const showFilterData = () => {
    const filteredData = filterDatesInRange(originalData);
    setFilterData(filteredData);
    setShowClearFilterIcon(true);
  };

  const clearDateFilter = () => {
    setDate({ from: undefined, to: undefined });
    setFilterData(originalData);
    setShowClearFilterIcon(false);
  };

  return (
    <div className="w-full  h-auto flex flex-col md:flex-row gap-4 md:gap-0 md:items-center md:justify-between px-6 py-4">
      <div className="w-full bg-gradient-to-r from-black to-indigo-600 flex items-center justify-between p-6 rounded-md">
        <div>
          <p className="font-medium text-white">Welcome back 👋,</p>
          <h1 className="text-xl text-white capitalize font-bold text-foreground max-md:text-center">
            {currentUser?.name}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center justify-center gap-8 relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "rounded-md bg-white text-black justify-start text-left font-normal max-md:w-full",
                    !date?.from && "text-white"
                  )}
                >
                  <CalendarIcon className="mr-1 h-4 w-5 text-black" size={20} />
                  {date.from ? (
                    <>{format(date.from, "PP")} </>
                  ) : (
                    <span className="text-black">From a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 " align="start">
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={1}
                  disabled={{ after: new Date() }}
                  defaultMonth={getPreviousMonthDate()}
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "rounded-md bg-transparent bg-white justify-start text-left font-normal max-md:w-full",
                    !date.to && "text-white"
                  )}
                >
                  <CalendarIcon className="text-black mr-1 h-4 w-5" size={20} />
                  {date.to ? (
                    <>{format(date.to, "PP")} </>
                  ) : (
                    <span className="text-black">To a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 " align="start">
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={1}
                  disabled={{ after: new Date() }}
                  defaultMonth={getPreviousMonthDate()}
                />
              </PopoverContent>
            </Popover>
            {showClearFilterIcon && (
              <div className="absolute -top-1 -right-1 cursor-pointer w-5 h-5 text-gray-700 bg-white rounded-full overflow-hidden flex items-center justify-center">
                <CircleX size={20} onClick={clearDateFilter} />
              </div>
            )}
          </div>

          <Button
            onClick={showFilterData}
            variant="outline"
            className="bg-white text-black font-medium"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderFilter;
