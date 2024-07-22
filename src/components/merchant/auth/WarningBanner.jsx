import React from "react";
import { AlertCircle, X } from "lucide-react";
import { ClipLoader } from "react-spinners";

export function WarningBanner() {
  return (
    <>
      <div className="rounded-md border-l-4 border-yellow-500 bg-yellow-100 p-4 md:hidden">
        <div className="flex items-center justify-between space-x-4">
          <div>
            <AlertCircle className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-yellow-600">
              Merchant dashboard is optimized for viewing on medium to large
              screens for the best user experience.
            </p>
          </div>
          <div>
            <ClipLoader size={20} color="#ca8a04" />
          </div>
        </div>
      </div>
    </>
  );
}
