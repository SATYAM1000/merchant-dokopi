import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NotificationContainer from "./NotificationContainer";
import { FaBell } from "react-icons/fa";

const NotificationIcon = () => {
  return (
    <div className="p-1 cursor-pointer relative transition-all flex items-center justify-center">
      <Sheet>
        <SheetTrigger>
          <>
            <FaBell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
            <SheetDescription>
              All notifications will appear here.
            </SheetDescription>
          </SheetHeader>
          <NotificationContainer />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NotificationIcon;
