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
import Sidebar from "@/components/global/Sidebar";

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
              <Sidebar />
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
