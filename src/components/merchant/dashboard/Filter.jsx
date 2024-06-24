"use client";
import React from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

const OrderFilter = () => {
  const [date, setDate] = React.useState();
  return (
    <div
      className={`w-full flex flex-col md:flex-row gap-4 md:gap-0 md:items-center md:justify-between bg-gray-100 p-6 border-b`}
    >
      <h1 className="text-[22px] font-medium md:font-semibold text-foreground max-md:text-center">
        Today's Orders
      </h1>
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex items-center justify-center gap-3 ">
          <Popover>
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
              />
            </PopoverContent>
          </Popover>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto hover:bg-white rounded-none max-md:w-full"
            >
              <span className="text-muted-foreground font-normal">
                Past 2 hours
              </span>{" "}
              <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filters by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Past 2 hours
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Past 8 hours
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Past 24 hours
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default OrderFilter;
