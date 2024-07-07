"use client";
import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeaderOptions = [
  {
    index: 1,
    heading: "Print Type",
  },
  {
    index: 2,
    heading: "Printing Sides",
  },
  {
    index: 3,
    heading: "Paper Size",
  },
  {
    index: 4,
    heading: "Base Price",
  },
  {
    index: 5,
    heading: "Condition Name",
  },
  {
    index: 6,
    heading: "Comparison Operator",
  },
  {
    index: 7,
    heading: "Condition Value",
  },
  {
    index: 8,
    heading: "Condition Price",
  },
  {
    index: 9,
    heading: "Action",
  },
];

const ConditionsTable = ({ priceList = [] }) => {
  console.log("Your store pricing is", priceList);

  const getAmountInINR = (amount) => {
    const calculated_amount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
    return calculated_amount;
  };

  return (
    <div className="mt-6 mb-4 flex flex-col gap-6">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {HeaderOptions?.map((heading) => (
              <th
                className="py-2 px-4 border-b text-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                key={heading.index + heading.heading}
              >
                {heading.heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {priceList?.map((price, priceIndex) => {
            const className = `py-2 px-4 border-b text-center capitalize`;

            return price.conditionsList.map((condition, conditionIndex) => (
              <tr key={`${priceIndex}-${conditionIndex}`}>
                <td className={className}>
                  {price.printType.split("_").join(" ")}
                </td>
                <td className={className}>
                  {price.printingSides.split("_").join(" ")}
                </td>
                <td className={className}>{price.paperSize}</td>
                <td className={className}>{getAmountInINR(price.basePrice)}</td>
                <td className={className}>
                  {condition.conditionName.split("_").join(" ")}
                </td>
                <td className={className}>
                  {condition.comparisonOperator.split("_").join(" ")}
                </td>
                <td className={className}>{condition.conditionValue}</td>
                <td className={className}>
                  {getAmountInINR(condition.conditionPrice)}
                </td>
                <td className={className}>
                  <Button className="text-red-600" variant="ghost">
                    <Trash2 />
                  </Button>
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ConditionsTable;
