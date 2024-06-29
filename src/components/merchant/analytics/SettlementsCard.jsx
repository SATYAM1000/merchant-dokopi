import Image from "next/image";
import React from "react";

const SettlementsCard = () => {
  return (
    <div className="w-full lg:w-2/5 h-full p-6 border bg-white shadow-sm rounded-md flex flex-col gap-4">
      <p className=" font-medium text-black ">Last 10 Settlements</p>
      <div className="w-full h-full flex items-center justify-center flex-col gap-6 ">
        <Image
          src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
          alt="settlements"
          width={200}
          height={200}
        />
        <p className="text-center text-[#4D4D4D]">No settlements yet</p>
      </div>
    </div>
  );
};

export default SettlementsCard;
