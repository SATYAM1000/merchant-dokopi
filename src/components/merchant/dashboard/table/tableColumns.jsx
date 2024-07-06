import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ViewDetails from "../view-details/ViewDetails";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    accessorKey: "SNo",
    enableHiding: false,
    header: "SNo.",
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat().format(row.index + 1);
      return (
        <div className="capitalize font-medium">
          {formatted < 10 ? `0${formatted}` : `${formatted}`}
        </div>
      );
    },
  },
  //Order Id
  {
    accessorKey: "Order_Id",
    header: "Order Id",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("Order_Id")}</div>
    ),
  },
  //Transaction Time
  {
    accessorKey: "Transaction_Time",
    enableHiding: false,
    header: "Transaction Time",
    cell: ({ row }) => (
      <div className="font-medium">
        {format(row.getValue("Transaction_Time"), "PP")}
      </div>
    ),
  },
  // Payment Status
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent hover:text-none flex items-center gap-1"
        >
          Payment Status
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const className =
        row.getValue("paymentStatus") === "success"
          ? "bg-green-200 hover:bg-green-200 text-green-600 font-medium border border-green-500"
          : "bg-red-200 hover:bg-red-200 text-red-600 font-medium border border-red-500";
      return (
        <Badge className={` ${className} font-medium`}>
          {row.getValue("paymentStatus")}
        </Badge>
      );
    },
  },
  //Transaction Id
  {
    accessorKey: "TransactionId",
    header: "Transaction ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("TransactionId")}</div>,
  },
  //amount
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div
          className="hover:bg-transparent hover:text-none flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      // Format the amount as a indian amount
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  //FilesRecvd
  {
    accessorKey: "FilesRecvd",
    header: "FilesRecvd",
    cell: ({ row }) => (
      <div className="capitalize font-medium">{row.getValue("FilesRecvd")}</div>
    ),
  },
  //View Details
  {
    accessorKey: "View Details",
    enableHiding: false,
    header: "View Details",
    cell: ({ row }) => (
      <Sheet>
        <SheetTrigger asChild>
          <div className="w-[100px] px-0 text-indigo-600 underline font-medium underline-offset-2  cursor-pointer">
            View Details
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              Order Details for{" "}
              <span className="text-black">{row?.original?.Order_Id}</span>
            </SheetTitle>
            <SheetDescription>
              View customer order details here.
            </SheetDescription>
          </SheetHeader>
          <ViewDetails RecvdDocument={row?.original?.ViewDetail} />
        </SheetContent>
      </Sheet>
    ),
  },
  //Status
  {
    accessorKey: "Status",
    header: ({ column }) => {
      return (
        <div
          className="hover:bg-transparent hover:text-none flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </div>
      );
    },
    // header: "",
    cell: ({ row }) => {
      const className =
        row.getValue("Status") === "success"
          ? "bg-green-200 hover:bg-green-200 text-green-600 font-medium border border-green-500"
          : "bg-red-200 hover:bg-red-200 text-red-600 font-medium border border-red-500";
      return (
        <Badge className={` ${className} font-medium`}>
          {row.getValue("Status")}
        </Badge>
      );
    },
  },
  //Actions
  {
    id: "action",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const Rowdata = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 bg-transparent hover:bg-transparent"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(Rowdata?.Order_Id);
                toast.success("Order Id copied to clipboard.", { duration: 1000 });
              }}
              className="cursor-pointer"
            >
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(Rowdata?.action?.email);
                toast.success("Email copied to clipboard.", { duration: 1000 });
              }}
              className="cursor-pointer"
            >
              Copy Customer Email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
