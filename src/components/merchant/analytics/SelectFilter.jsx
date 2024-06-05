import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

const SelectFilter = ({ title, values, className }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`ml-auto border text-muted-foreground  rounded-none hover:bg-white hover:text-foreground  outline-none ${className}`}
          >
            <span className=" font-normal">{title}</span>{" "}
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-54">
          <DropdownMenuLabel>
            <p>{title}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {values.map((value) => (
              <>
                <DropdownMenuItem
                  className="hover:bg-blue-100 cursor-pointer"
                  key={value}
                >
                  {value}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SelectFilter;
