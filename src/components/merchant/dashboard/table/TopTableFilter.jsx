"use client";
import * as React from "react";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";



const TopTableFilter = ({ table, sorting, setSorting }) => {
  return (
    <div className="flex items-center justify-between py-4 max-md:flex-col gap-8">
      <Input
        placeholder="Filter by Order Id..."
        value={table.getColumn("Order_Id")?.getFilterValue() ?? ""}
        onChange={(event) => {
          table.getColumn("Order_Id")?.setFilterValue(event.target.value);
        }}
        className=" max-w-xs font-medium text-[13px] appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none flex items-center  placeholder:text-gray-600"
      />
      <div className="flex gap-4 max-md:justify-between max-md:w-full">
        {sorting.length > 0 && (
          <Button
            variant="ghost"
            className="ml-auto disabled:cursor-not-allowed disabled:pointer-events-auto"
            onClick={() => setSorting([])}
            disabled={!sorting.length}
          >
            Clear Filter
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-[110px] cursor-default font-medium text-[13px] appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 flex items-center  ">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopTableFilter;
