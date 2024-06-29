"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCondition } from "@/redux/store/pricingSlice";

const ConditionsTable = () => {
  const dispatch = useDispatch();
  const { pricing } = useSelector((state) => state.pricing);

  return (
    <div className="mt-6 mb-4 flex flex-col gap-6">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Service Type
            </th>
            <th className="py-2 px-4 border-b text-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Paper Size
            </th>
            <th className="py-2 px-4 border-b text-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Base Price
            </th>
            <th className="py-2 px-4 border-b text-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Condition Type
            </th>
            <th className="py-2 px-4 border-b text-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Condition Value
            </th>
            <th className="py-2 px-4 border-b text-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Condition Price
            </th>
            <th className="py-2 px-4 border-b text-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {pricing.map((entry, pricingIndex) => (
            <React.Fragment key={pricingIndex}>
              {entry.conditions.map((condition, conditionIndex) => (
                <tr key={conditionIndex}>
                  <td className="py-2 px-4 border-b text-center">
                    {entry.serviceType}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {entry.paperSize}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {entry.basePrice}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {condition.conditionType}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {condition.conditionValue}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {condition.conditionPrice}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      className="text-red-600"
                      onClick={() =>
                        dispatch(
                          removeCondition({ pricingIndex, conditionIndex })
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-trash-2"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConditionsTable;
