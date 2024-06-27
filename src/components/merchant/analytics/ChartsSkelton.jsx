import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ChartsSkelton = () => {
  return (
    <div className="w-full lg:w-3/5 min-h-[200px] h-auto px-6 py-6 border bg-white shadow-sm rounded-md flex flex-col gap-4">
      <Skeleton className="w-40 h-6 rounded-md" />
      <Skeleton className="w-full h-full rounded-md" />
    </div>
  );
};
export default ChartsSkelton;
