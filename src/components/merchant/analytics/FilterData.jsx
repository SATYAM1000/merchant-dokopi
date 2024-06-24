"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FilterData = ({ selectedOption, setSelectedOption }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-black/[0.15] flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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
          <span>{selectedOption?.label || "Select an option"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select an option</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() =>
              setSelectedOption({
                label: "Today",
                value: "today",
              })
            }
            className="hover:bg-muted transition-all cursor-pointer"
          >
            Today
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setSelectedOption({
                label: "Yesterday",
                value: "yesterday",
              })
            }
            className="hover:bg-muted transition-all cursor-pointer"
          >
            Yesterday
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setSelectedOption({
                label: "This Week",
                value: "thisweek",
              })
            }
            className="hover:bg-muted transition-all cursor-pointer"
          >
            This Week
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              setSelectedOption({
                label: "This Month",
                value: "thismonth",
              })
            }
            className="hover:bg-muted transition-all cursor-pointer"
          >
            This Month
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          Custom
          <DropdownMenuShortcut>
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
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterData;
