import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TableSkeleton = () => {
  return (
    <div className="py-4 flex flex-col gap-5">
      <div className="flex justify-between max-md:flex-col max-md:gap-3">
        <Skeleton className="h-10 w-96 rounded-md" />
        <div className="flex gap-4 ">
          <Skeleton className="h-10 w-40 rounded-md max-md:ml-auto" />
        </div>
      </div>
      <div>
        <Skeleton className="h-screen w-full rounded-md" />
      </div>
    </div>
  );
};

export default TableSkeleton;
