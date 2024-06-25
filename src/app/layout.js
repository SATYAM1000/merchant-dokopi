import { Archivo } from "next/font/google";
import "./globals.css";
const archivo = Archivo({ subsets: ["latin"] });

export const metadata = {
  title: "DoKopi - Merchant",
  description: "Print with ease. Anywhere. Anytime.",
};

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";

import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/global/Navbar";
import NextTopLoader from "nextjs-toploader";

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={archivo.className}>
        <NextTopLoader color="#4f46e5" showSpinner={false} />
        <SessionProvider session={session}>
          <TooltipProvider>
            <div className="flex min-h-screen w-full flex-col">
              <Navbar />
              {children}
            </div>
          </TooltipProvider>
          <Toaster richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
