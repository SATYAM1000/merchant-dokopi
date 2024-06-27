import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const AnalyticsCardSkelton = () => {
  return (
    <div className={`w-full h-24 border rounded-lg p-4 bg-white`}>
      <div className="flex items-center justify-items-start gap-4">
        <Skeleton className={`w-9 h-9 p-1 rounded-md `} />
        <div>
          <Skeleton className={`text-sm w-[120px] h-6 font-medium `} />

          <div className="w-full flex items-center gap-5 justify-between text-2xl font-medium">
            <Skeleton className={`text-sm w-24 h-6 font-medium mt-2 `} />

            <div className={` flex items-center justify-center gap-2 `}>
              <Skeleton className={`text-sm w-16 h-6 font-medium mt-2 `} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCardSkelton;
