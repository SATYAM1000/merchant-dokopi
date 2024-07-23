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
import GettingStartedComponent from "@/components/merchant/getting-started/GettingStartedComponent";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { WarningBanner } from "@/components/merchant/auth/WarningBanner";

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.dokopi.com" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        <link rel="dns-prefetch" href="https://d28fpa5kkce5uk.cloudfront.net" />

        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://api.dokopi.com" />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
        <link rel="preconnect" href="https://d28fpa5kkce5uk.cloudfront.net" />
      </head>
      <body className={archivo.className}>
        <NextTopLoader color="#4f46e5" showSpinner={false} />
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <TooltipProvider>
              <WarningBanner />

              <div className="flex flex-1 ">
                {session && session?.user?.storeId === null ? null : (
                  <Sidebar />
                )}
                {/* Main Content */}
                <div className="flex flex-col flex-1 min-h-screen">
                  <main className="w-full h-full">
                    <div className="w-full h-full">
                      <div className=" w-full h-full">
                        {session?.user?.storeId === null ? (
                          <GettingStartedComponent />
                        ) : (
                          children
                        )}
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </TooltipProvider>
            <Toaster richColors />
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
