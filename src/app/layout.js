import { Inter } from "next/font/google";
import "./globals.css";
const archivo = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DoKopi - Merchant",
  description: "Print with ease. Anywhere. Anytime.",
};

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";

import { TooltipProvider } from "@/components/ui/tooltip";
import NextTopLoader from "nextjs-toploader";
import { Menu } from "lucide-react";
import UserAvatar from "@/components/global/UserAvatar";
import Status from "@/components/global/Status";
import SidebarMenu from "@/components/global/SidebarMenu";

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={archivo.className}>
        <NextTopLoader color="#4f46e5" showSpinner={false} />
        <SessionProvider session={session}>
          <TooltipProvider>
            <div className="flex flex-1 ">
              {/* Sidebar */}
              <div className="hidden md:flex md:w-16 h-[100vh] md:flex-col shrink-0 overflow-hidden sticky left-0 top-0">
                <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
                  <div className="flex items-center flex-shrink-0 px-4">
                    <Menu />
                  </div>

                  {/* Navigation Links */}
                  <div className="px-4 mt-6">
                    <hr className="border-gray-200" />
                  </div>

                  <div className="flex flex-col justify-between flex-1 px-3 mt-6">
                    <div className="space-y-4">
                      {/* Nav Links Section */}
                      <nav className="flex-1 space-y-2">
                        <SidebarMenu />
                      </nav>

                      <hr className="border-gray-200" />
                    </div>

                    {/* User Profile Section */}
                    <div>
                      {/* <div className="mt-8 flex items-center justify-center">
                        <Status />
                      </div> */}
                      <div className="pb-8 mt-6">
                        <UserAvatar />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-col flex-1 min-h-[100vh]">
                <main className="w-full h-full">
                  <div className="w-full h-full">
                    <div className=" mx-auto max-w-8xl w-full h-full ">
                      {children}
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </TooltipProvider>
          <Toaster richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
