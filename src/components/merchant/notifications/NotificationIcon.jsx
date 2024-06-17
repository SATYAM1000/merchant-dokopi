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
import { SlBell } from "react-icons/sl";

const NotificationIcon = () => {
  return (
    <div className="p-1 cursor-pointer relative transition-all flex items-center justify-center">
      <Sheet>
        <SheetTrigger>
          <>
            <div className="flex items-center justify-center p-1.5 border rounded-md hover:bg-gray-100">
            <SlBell className="h-5 w-5 text-gray-700" />
            </div>
            
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
