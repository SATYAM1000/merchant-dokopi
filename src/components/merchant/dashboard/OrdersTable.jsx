"use client";
import React from "react";

import ViewDetails from "./view-details/ViewDetails";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Checkbox } from "@/components/ui/checkbox";
import { EllipsisVertical } from "lucide-react";

const OrdersTable = () => {
  return (
    <div className="w-full min-h-[calc(100vh-150px)] relative overflow-hidden mb-4">
      <Table className="w-full overflow-y-scroll rounded-md ">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Checkbox />
            </TableHead>
            <TableHead className="w-[100px]">SNo.</TableHead>
            <TableHead className="w-[150px]">Order No.</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="w-[150px]">Status</TableHead>
            <TableHead className="w-[230px]">Transaction ID</TableHead>
            <TableHead className="w-[150px]">Amount</TableHead>
            <TableHead className="w-[150px]">FilesRecvd</TableHead>
            <TableHead>
              <Button
                variant="link"
                size="sm"
                className="w-[100px] px-0 text-muted-foreground hover:no-underline "
              >
                View Details
              </Button>
            </TableHead>
            <TableHead>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 50 }).map((_, i) => (
            <TableRow key={i} className="font-medium ">
              <TableCell>
                <Checkbox
                  checked
                  onCheckedChange={() => {}}
                  className="w-[17px] h-[17px] "
                />
              </TableCell>
              <TableCell>
                <p>{i + 1}</p>
              </TableCell>
              <TableCell>
                <p>#order_00001</p>
              </TableCell>
              <TableCell>
                <p>11:20 AM</p>
                <span className="text-muted-foreground text-sm">Today</span>
              </TableCell>

              <TableCell>
                <div
                  className={
                    "bg-indigo-500/[0.3] w-fit px-3 text-indigo-600 text-sm py-0.5 rounded-xl hover:bg-indigo-200  "
                  }
                >
                  {"paid"}
                </div>
              </TableCell>

              <TableCell>pay_82736HSGD8ga88</TableCell>
              <TableCell>
                <p>₹&nbsp;200</p>
              </TableCell>

              <TableCell>5</TableCell>
              <TableCell className="">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="link"
                      size="sm"
                      className="w-[100px] px-0 text-indigo-600 underline "
                    >
                      View Details
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>
                        Order Details&nbsp;&nbsp;&nbsp;
                        {}
                      </SheetTitle>
                      <SheetDescription>
                        View customer order details here.
                      </SheetDescription>
                    </SheetHeader>
                    <ViewDetails />
                  </SheetContent>
                </Sheet>
              </TableCell>

              <TableCell className="text-center flex items-center justify-center ">
                <EllipsisVertical className="w-5 h-5 cursor-pointer" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
