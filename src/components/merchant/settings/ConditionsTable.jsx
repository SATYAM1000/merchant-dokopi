"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { API_DOMAIN } from "@/lib/constants";
import { toast } from "sonner";
import { fetchAccessToken } from "@/actions/access-token";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ClipLoader } from "react-spinners";

const HeaderOptions = [
  {
    index: 1,
    heading: "Paper Size",
  },

  {
    index: 2,
    heading: "Printing Sides",
  },
  {
    index: 3,
    heading: "Print Type",
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

const ConditionsTable = ({ priceList = [], setpriceList }) => {
  if (priceList === undefined || priceList === null || priceList.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center mt-6">
        <ClipLoader color="black" size={20} />
      </div>
    );
  }
  const user = useCurrentUser();
  const getAmountInINR = (amount) => {
    const calculated_amount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
    return calculated_amount;
  };

  const handleDelete = async (conditionId) => {
    try {
      const response = await axios.delete(
        `${API_DOMAIN}/api/v1/store/pricing/delete/${user.storeId}/${conditionId}`,
        {
          headers: {
            Authorization: `Bearer ${await fetchAccessToken()}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.msg);

        const updatedPriceList = priceList.map((price) => {
          return {
            ...price,
            conditionsList: price.conditionsList.filter(
              (condition) => condition._id !== conditionId
            ),
          };
        });

        setpriceList(updatedPriceList);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error("Error deleting price list:", error);
    }
  };

  return (
    <div className="mt-6 mb-4 flex flex-col gap-6">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {HeaderOptions?.map((heading) => (
              <th
                className="px-2 py-3 border-b text-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                key={heading.index + heading.heading}
              >
                {heading.heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {priceList?.map((price, priceIndex) => {
            const className = `p-2 text-[13px] font-medium text-gray-600 border-b text-center capitalize`;

            return price.conditionsList.map((condition, conditionIndex) => (
              <tr
                className="hover:bg-[#f5f5f5]"
                key={`${priceIndex}-${conditionIndex}`}
              >
                <td className={className}>{price.paperSize}</td>
                <td className={className}>
                  {price.printType.split("_").join(" ") === "black and white"
                    ? "B/W"
                    : price.printType.split("_").join(" ")}
                </td>
                <td className={className}>
                  {price.printingSides.split("_").join(" ")}
                </td>

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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="py-1 px-0.5 border-none bg-transparent"
                        onClick={() => console.log("delete")}
                      >
                        <EllipsisVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(condition._id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
