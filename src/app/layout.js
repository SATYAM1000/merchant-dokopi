import { Archivo } from "next/font/google";
import "./globals.css";
const archivo = Archivo({ subsets: ["latin"] });

export const metadata = {
  title: "DoKopi",
  description: "Print with ease. Anywhere. Anytime.",
};

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Link from "next/link";
import { Toaster } from "sonner";

import { Menu, Package2, Search } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/global/UserAvatar";
import StoreStatus from "@/components/global/StoreStatus";
import NotificationIcon from "@/components/merchant/notifications/NotificationIcon";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={archivo.className}>
        <SessionProvider session={session}>
          <TooltipProvider>
            <div className="flex min-h-screen w-full flex-col">
              <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background z-10 px-4 md:px-6">
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
                    Settlements
                  </Link>
                  <Link
                    href="/profile"
                    className="text-foreground transition-colors hover:text-foreground"
                  >
                    Settings
                  </Link>
                  <StoreStatus />
                </nav>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 md:hidden"
                    >
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
                <div className="flex items-center j gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
                  <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search orders by order number..."
                        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                      />
                    </div>
                  </form>
                  <NotificationIcon />
                  <UserAvatar />
                </div>
              </header>
              {children}
            </div>
          </TooltipProvider>
          <Toaster richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
