import React from "react";
import { Menu, Package2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/global/UserAvatar";
import StoreStatus from "@/components/global/StoreStatus";
import NotificationIcon from "@/components/merchant/notifications/NotificationIcon";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky  top-0 flex h-16 items-center justify-between gap-4 border-b bg-background z-10 px-4 md:px-6 ">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Dokopi</span>
        </Link>
        <Link
          href="/orders"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Orders
        </Link>

        <Link
          href="analytics"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Analytics
        </Link>

        <Link
          href="/dashboard"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>

        <Link
          href="/settings"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Settings
        </Link>
        <StoreStatus />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Dokopi</span>
            </Link>
            <Link href="/orders" className="hover:text-foreground">
              Orders
            </Link>

            <Link
              href="/analytics"
              className="text-muted-foreground hover:text-foreground"
            >
              Analytics
            </Link>
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground"
            >
              Settlements
            </Link>
            <Link
              href="/profile"
              className="text-muted-foreground hover:text-foreground"
            >
              Settings
            </Link>
            <StoreStatus />
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center justify-center  gap-4 md:ml-auto md:gap-2 lg:gap-8 ">
        <NotificationIcon />
        <UserAvatar />
      </div>
    </header>
  );
};

export default Navbar;
