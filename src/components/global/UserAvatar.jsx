"use client";
import React, { useState, startTransition, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { History, Headphones, LogOut, Bell } from "lucide-react";

import { useCurrentUser } from "@/hooks/use-current-user";
import { ClipLoader } from "react-spinners";

const UserAvatar = () => {
  const [showLoader, setShowLoader] = useState(false);
  const currentUser = useCurrentUser();
  if (!currentUser) return null;

  const handleSignOut = () => {
    startTransition(() => {
      setShowLoader(true);
      signOut({
        callbackUrl: "/",
      }).finally(() => {
        setShowLoader(false);
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer border">
          <AvatarImage src={currentUser?.image} />
          <AvatarFallback className="font-medium text-black">
            {currentUser?.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-black" asChild>
          <div className="flex flex-col">
            <h3>{currentUser?.name}</h3>
            <p className="text-gray-500 font-normal">{currentUser?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/support" className="flex items-center">
            <Headphones size={17} />
            <p className="pl-3">Support</p>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="cursor-pointer"
          onClick={handleSignOut}
        >
          <div className="flex items-center">
            {showLoader ? (
              <ClipLoader
                color="black"
                loading={showLoader}
                size={17}
                aria-label="Loading Spinner"
              />
            ) : (
              <LogOut size={17} />
            )}
            <p className="pl-3">Logout</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
