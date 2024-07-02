"use client";
import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";


const HeaderOptions = [
  {
    index: 1,
    heading: "Paper Size"
  },
  {
    index: 2,
    heading: "  Base Price"
  },
  {
    index: 3,
    heading: "PRINT TYPE"
  },
  {
    index: 4,
    heading: "Print Sides"
  },
  {
    index: 5,
    heading: "Condition Type"
  },
  {
    index: 6,
    heading: "Condition Value"
  },
  {
    index: 7,
    heading: "Condition Price"
  },
  {
    index: 8,
    heading: "Actions"
  },
]

const ConditionsTable = ({ priceList = [] }) => {
  // console.log(priceList)
  const getAmountInINR = (amount) => {
    const calculated_amount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
    return calculated_amount;
  }
  return (
    <div className="mt-6 mb-4 flex flex-col gap-6">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {
              HeaderOptions?.map((heading) => (
                <th className="py-2 px-4 border-b text-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" key={heading.index + heading.heading}>{heading.heading}
                </th>
              ))
            }
          </tr>
        </thead>

        <tbody>
          {
            priceList?.map((price, priceIndex) => {
              const className = `py-2 px-4 border-b text-center capitalize`
              const actualPrice = price?.priceList;
              const conditions = actualPrice?.quantity_types;
              const calculated_amount = getAmountInINR(conditions?.condition_price);
              const base_amount = getAmountInINR(actualPrice?.base_price)
              return (
                <tr key={priceIndex}>
                  <td className={className}>
                    {actualPrice?.paper_size}
                  </td>
                  <td className={className}>
                    {base_amount}
                  </td>
                  <td className={className}>
                    {actualPrice?.printType.split("_").join(" ")}
                  </td>
                  <td className={className}>
                    {actualPrice?.printSided?.split("_").join(" ")}
                  </td>
                  <td className={className}>
                    {conditions?.quantity_type?.split("_").join(" ")}
                  </td>
                  <td className={className}>
                    {conditions?.condition_value}
                  </td>
                  <td className={className}>
                    {calculated_amount}
                  </td>
                  <td className={className}>
                    <Button className="text-red-600" variant="ghost">
                      <Trash2 />
                    </Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default ConditionsTable;
