"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { History,LayoutDashboard , Headphones ,  LogOut } from "lucide-react";

import { signOut } from "next-auth/react";

import { useRouter } from "next/navigation";
import Link from "next/link";

const UserAvatar = () => {
  const currentUser = {
    name:"satyam",
    email:"satyam@gmail.com",
    
  }
  const router = useRouter();
  if (!currentUser) {
    return null;
  }

  const handleClick = () => {
    router.push("/dashboard");
  };

  const handleHistoryClick = () => {
    router.push("/history");
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
        {currentUser?.role === "USER" && (
          <DropdownMenuItem asChild className="cursor-pointer">
            <div onClick={handleHistoryClick} className="flex items-center">
              <History size={17} />
              <p className="pl-3">History</p>
            </div>
          </DropdownMenuItem>
        )}
        {currentUser?.role === "USER" && (
          <DropdownMenuItem asChild className="cursor-pointer">
            <div onClick={handleClick} className="flex items-center">
              <LayoutDashboard size={17} />
              <p className="pl-3">Dashbaord</p>
            </div>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/contact" className="flex items-center">
            <Headphones size={17} />
            <p className="pl-3">Support</p>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="cursor-pointer"
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <div className="flex items-center">
            <LogOut size={17} />
            <p className="pl-3">Logout</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
