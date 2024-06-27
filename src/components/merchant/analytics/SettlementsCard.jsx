import React from "react";

const SettlementsCard = () => {
  return (
    <div className="w-full lg:w-2/5 h-full p-6 border bg-white shadow-sm rounded-md flex flex-col gap-4">
      <p className="text-lg font-semibold text-black ">Last 10 Settlements</p>
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-center font-medium text-gray-500 text-lg">No settlements yet</p>
      </div>
    </div>
  );
};

export default SettlementsCard;
