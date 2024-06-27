import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SettlementsCardSkelton = () => {
  return (
    <div className="w-full lg:w-2/5 h-full p-6 border bg-white shadow-sm rounded-md flex flex-col gap-4">
      <Skeleton className="w-40 h-6 rounded-md" />

      <div className="w-full h-full flex flex-col gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-12 rounded-md" />
        ))}
      </div>
    </div>
  );
};

export default SettlementsCardSkelton;
