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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarIcon, CircleX } from "lucide-react";
const OrderFilter = ({ setFilterData, originalData }) => {
  const [date, setDate] = useState();
  // const [duration, setDuration] = React.useState()

  //for showing the 2month calendar from previous month and current month
  const getPreviousMonthDate = () => {
    var TodayDate = new Date();
    return new Date(TodayDate.getFullYear(), TodayDate.getMonth() - 1);
  }

  //filting the data according to the date
  const filterDatesInRange = (dataSet) => {
    return dataSet.filter(dateString => {
      const dateFromDate = new Date(dateString.Transaction_Time);
      const StartDate = date.from
      const EndDate = new Date(date.to.getFullYear(), date.to.getMonth(), date.to.getDate(), 23, 59, 59)
      return dateFromDate >= StartDate && dateFromDate <= EndDate;
    });
  };
  //manupation of showing clear icon for data filter
  const [showClearFilterIcon, setShowClearFilterIcon] = useState(false)
  // func for filter data 
  const showFilterData = () => {
    const filterdataFromDateFilter = filterDatesInRange(originalData)
    setFilterData(filterdataFromDateFilter)
    setShowClearFilterIcon(true)
  }

  //clear the data to original state
  const ClearDateFilter = () => {
    setDate(undefined)
    setFilterData(originalData);
    setShowClearFilterIcon(false)
  }
  return (
    <div className={`w-full flex flex-col md:flex-row gap-4 md:gap-0 md:items-center md:justify-between bg-gray-100 px-6 py-4 border-b`}>
      <h1 className="text-[22px] font-medium md:font-semibold text-foreground max-md:text-center">
        Today's Orders
      </h1>
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex items-center justify-center gap-3 relative">
          <Popover >
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[140px] hover:bg-white md:w-[280px] rounded-none justify-start text-left font-normal max-md:w-full",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-1 h-4 w-5" size={20} />
                {date && date.from && date.to ? <>{format(date.from, "PP")} - {format(date.to, "PP")} </> : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 " align="start">
              <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={{ after: new Date() }}
                defaultMonth={getPreviousMonthDate()}
              />
            </PopoverContent>
          </Popover>
          {
            showClearFilterIcon && <CircleX color="red" size={20} className="absolute -top-1 -right-1 cursor-pointer" onClick={ClearDateFilter} />
          }
        </div>
        {/* To be done on Updation  */}
        {/* <Select onValueChange={value => setDuration(value)}>
          <SelectTrigger className="w-[150px]" >
            <SelectValue placeholder="Choose Filter" />
          </SelectTrigger>
          <SelectContent >
            <SelectGroup>
              <SelectItem value="2">Past 2 hours</SelectItem>
              <SelectItem value="8">Past 8 hours</SelectItem>
              <SelectItem value="24">Past 24 hours</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}
        <Button onClick={showFilterData} disabled={!date || !date.from || !date.to}>Apply</Button>

      </div>
    </div>
  );
};

export default OrderFilter;
