import React from "react";
import ConditionsTable from "./ConditionsTable";

const ConditionsList = () => {
  return (
    <section className="w-full bg-white h-fit px-6 py-6  ">
      <div>
        <h3 className="text-[#1A181E] font-medium">Conditions List</h3>
        <p className="text-[#808080] text-sm">
          Set the conditions for different items in your store.
        </p>
      </div>
      <div className="w-full">
        <ConditionsTable />
      </div>
    </section>
  );
};

export default ConditionsList;
